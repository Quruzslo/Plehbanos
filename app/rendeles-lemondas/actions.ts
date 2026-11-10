"use server";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { sendCancelNotice } from "@/lib/email/emailActions";
import { CANCELLABLE } from "./status";
import { restoreItems } from "../admin/rendelesek/orders-action";

export async function cancelOrder(token: string) {
  if (typeof token !== "string" || token.length !== 36) {
    return { error: "Érvénytelen lemondó link." };
  }

  const cancelled = await db.transaction(async (tx) => {
    const [order] = await tx
      .update(orders)
      .set({ status: "lemondva" })
      .where(
        and(eq(orders.cancelToken, token), inArray(orders.status, CANCELLABLE)),
      )
      .returning({ id: orders.id, name: orders.name });

    if (!order) return null;

    await restoreItems(order.id);

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
