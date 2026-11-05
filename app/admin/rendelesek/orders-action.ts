"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { orders, orderStatusEnum, type Order } from "@/lib/db/schema";

// Írd át az admin rendelések oldal útvonalára
const ORDERS_PATH = "/admin/rendelesek";

type Status = Order["status"];
type OrderUpdate = Pick<
  Order,
  "name" | "email" | "phone" | "zip" | "city" | "address" | "note" | "status"
>;

// FONTOS: a server action publikus endpoint – mindhárom függvény elejére
// kell az admin jogosultság ellenőrzése a saját auth megoldásoddal.

export async function updateOrder(id: number, data: OrderUpdate) {
  const { name, email, phone, zip, city, address, note, status } = data;
  if (!orderStatusEnum.enumValues.includes(status))
    throw new Error("Érvénytelen állapot");

  await db
    .update(orders)
    .set({ name, email, phone, zip, city, address, note, status })
    .where(eq(orders.id, id));

  revalidatePath(ORDERS_PATH);
}

export async function setOrderStatus(id: number, status: Status) {
  if (!orderStatusEnum.enumValues.includes(status))
    throw new Error("Érvénytelen állapot");

  await db.update(orders).set({ status }).where(eq(orders.id, id));
  revalidatePath(ORDERS_PATH);
}

export async function deleteOrder(id: number) {
  // az order_items sorok a cascade miatt maguktól törlődnek
  await db.delete(orders).where(eq(orders.id, id));
  revalidatePath(ORDERS_PATH);
}
