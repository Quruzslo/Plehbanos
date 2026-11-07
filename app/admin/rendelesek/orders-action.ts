"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { db } from "@/lib/db";
import {
  orders,
  orderItems,
  orderStatusEnum,
  type Order,
} from "@/lib/db/schema";
import { sendShippedEmail } from "@/lib/email/emailActions";

const ORDERS_PATH = "/admin/rendelesek";

type Status = Order["status"];
type OrderUpdate = Pick<
  Order,
  "name" | "email" | "phone" | "zip" | "city" | "address" | "note" | "status"
>;

// Nincs exportálva, így kívülről nem hívható server actionként.
async function notifyShipped(orderId: number) {
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId));
  if (!order) return;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  await sendShippedEmail({
    id: order.id,
    name: order.name,
    email: order.email,
    address: `${order.zip} ${order.city}, ${order.address}`,
    items,
    total: order.total,
  });
}

// Csak akkor küld, ha a rendelés most kerül "elkuldve" állapotba,
// egy már feladott rendelés újramentésekor nem.
function sendIfShipped(id: number, prev: Status | undefined, next: Status) {
  if (prev === undefined || prev === "elkuldve" || next !== "elkuldve") return;
  after(() =>
    notifyShipped(id).catch((err) =>
      console.error(`Shipped email failed (#${id})`, err),
    ),
  );
}

async function getStatus(id: number) {
  const [row] = await db
    .select({ status: orders.status })
    .from(orders)
    .where(eq(orders.id, id));
  return row?.status;
}

export async function updateOrder(id: number, data: OrderUpdate) {
  const { name, email, phone, zip, city, address, note, status } = data;
  if (!orderStatusEnum.enumValues.includes(status))
    throw new Error("Érvénytelen állapot");

  const prev = await getStatus(id);

  await db
    .update(orders)
    .set({ name, email, phone, zip, city, address, note, status })
    .where(eq(orders.id, id));

  sendIfShipped(id, prev, status);
  revalidatePath(ORDERS_PATH);
}

export async function setOrderStatus(id: number, status: Status) {
  if (!orderStatusEnum.enumValues.includes(status))
    throw new Error("Érvénytelen állapot");

  const prev = await getStatus(id);

  await db.update(orders).set({ status }).where(eq(orders.id, id));

  sendIfShipped(id, prev, status);
  revalidatePath(ORDERS_PATH);
}

export async function deleteOrder(id: number) {
  // az order_items sorok a cascade miatt maguktól törlődnek
  await db.delete(orders).where(eq(orders.id, id));
  revalidatePath(ORDERS_PATH);
}
