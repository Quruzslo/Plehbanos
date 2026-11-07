"use server";
import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { db } from "@/lib/db";
import { orders, orderItems, products } from "@/lib/db/schema";
import { sendCancelNotice } from "@/lib/email/emailActions";
import { CANCELLABLE } from "./status";

export async function cancelOrder(token: string) {
  if (typeof token !== "string" || token.length !== 36) {
    return { error: "Érvénytelen lemondó link." };
  }

  const cancelled = await db.transaction(async (tx) => {
    // Feltételes update: csak akkor sikerül, ha a rendelés még lemondható.
    // Ha az admin közben feladta, 0 sort ad vissza.
    const [order] = await tx
      .update(orders)
      .set({ status: "lemondva" })
      .where(
        and(eq(orders.cancelToken, token), inArray(orders.status, CANCELLABLE)),
      )
      .returning({ id: orders.id, name: orders.name });

    if (!order) return null;

    const items = await tx
      .select({
        productId: orderItems.productId,
        quantity: orderItems.quantity,
      })
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    for (const i of items) {
      if (i.productId === null) continue;
      await tx
        .update(products)
        .set({ stock: sql`${products.stock} + ${i.quantity}` })
        .where(eq(products.id, i.productId));
    }

    return order;
  });

  if (!cancelled) {
    return { error: "Ez a rendelés már nem mondható le." };
  }

  after(() =>
    sendCancelNotice(cancelled).catch((err) =>
      console.error(`Cancel email failed (#${cancelled.id})`, err),
    ),
  );

  revalidatePath("/termekek", "layout");
  revalidatePath(`/rendeles-lemondas/${token}`);

  return { success: true };
}
