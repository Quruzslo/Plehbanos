"use server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, orders, orderItems } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { sendOrderEmails } from "@/lib/email/emailActions";

const orderSchema = z.object({
  name: z.string().trim().min(2, "Add meg a neved."),
  email: z.string().trim().email("Érvénytelen e-mail cím."),
  phone: z.string().trim().min(6, "Add meg a telefonszámod."),
  zip: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "4 jegyű irányítószámot adj meg."),
  city: z.string().trim().min(2, "Add meg a települést."),
  address: z.string().trim().min(3, "Add meg az utcát és a házszámot."),
  note: z.string().trim().max(500, "Legfeljebb 500 karakter.").optional(),
});

const cartSchema = z
  .array(
    z.object({
      id: z.number().int().positive(),
      quantity: z.number().int().min(1).max(99),
    }),
  )
  .min(1);

class OutOfStockError extends Error {
  constructor(public productName: string) {
    super("OUT_OF_STOCK");
  }
}

export async function createOrder(
  formData: FormData,
  cart: { id: number; quantity: number }[],
) {
  const parsed = orderSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const parsedCart = cartSchema.safeParse(cart);
  if (!parsedCart.success) {
    return { error: "Hibás kosár tartalom." };
  }

  const ids = parsedCart.data.map((i) => i.id);
  const dbProducts = await db
    .select()
    .from(products)
    .where(inArray(products.id, ids));

  if (dbProducts.length !== ids.length) {
    return { error: "Valamelyik termék már nem elérhető." };
  }

  const lines = parsedCart.data.map((item) => {
    const product = dbProducts.find((p) => p.id === item.id)!;
    return {
      productId: product.id,
      name: product.name,
      unitPrice: product.salePrice ?? product.price,
      quantity: item.quantity,
      img: product.img,
    };
  });

  const total = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);

  // Lemondó link titka – kriptográfiailag véletlen, nem kitalálható
  const cancelToken = randomUUID();

  try {
    const orderId = await db.transaction(async (tx) => {
      for (const line of lines) {
        const updated = await tx
          .update(products)
          .set({ stock: sql`${products.stock} - ${line.quantity}` })
          .where(
            and(
              eq(products.id, line.productId),
              gte(products.stock, line.quantity),
            ),
          )
          .returning({ id: products.id });

        if (updated.length === 0) throw new OutOfStockError(line.name);
      }

      const [order] = await tx
        .insert(orders)
        .values({ ...parsed.data, total, cancelToken })
        .returning({ id: orders.id });

      await tx
        .insert(orderItems)
        .values(lines.map((l) => ({ ...l, orderId: order.id })));

      return order.id;
    });

    const { name, email, phone, zip, city, address, note } = parsed.data;

    after(() =>
      sendOrderEmails({
        id: orderId,
        name,
        email,
        phone,
        address: `${zip} ${city}, ${address}`,
        note,
        items: lines,
        total,
        cancelToken,
      }).catch((err) => console.error(`Order email failed (#${orderId})`, err)),
    );

    revalidatePath("/termekek", "layout");
    revalidatePath("/", "layout");
  } catch (e) {
    if (e instanceof OutOfStockError) {
      return { error: `Nincs elég a készleten: ${e.productName}` };
    }
    throw e;
  }

  return { success: true };
}
