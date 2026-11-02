"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products, type Product } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/permission-check";

const emptyToNull = (v: unknown) => (v === "" || v === "0" ? null : v);
const num = { error: "Adj meg egy számot" };

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Add meg a termék nevét")
    .max(255, "Legfeljebb 255 karakter"),
  slug: z
    .string()
    .trim()
    .min(1, "Add meg a slugot")
    .max(255, "Legfeljebb 255 karakter"),
  description: z.string().trim().min(1, "Adj meg leírást"),
  categoryId: z.preprocess(
    emptyToNull,
    z.coerce
      .number(num)
      .int("Érvénytelen kategória")
      .positive("Érvénytelen kategória")
      .nullable(),
  ),
  price: z.coerce
    .number(num)
    .int("Csak egész szám lehet")
    .positive("Az ár legyen nagyobb 0-nál"),
  salePrice: z.preprocess(
    emptyToNull,
    z.coerce
      .number(num)
      .int("Csak egész szám lehet")
      .positive("Az akciós ár legyen nagyobb 0-nál")
      .nullable(),
  ),
  stock: z.coerce
    .number(num)
    .int("Csak egész szám lehet")
    .min(0, "A készlet nem lehet negatív"),
  heightCm: z.coerce
    .number(num)
    .int("Csak egész szám lehet")
    .positive("A magasság legyen nagyobb 0-nál"),
  widthCm: z.coerce
    .number(num)
    .int("Csak egész szám lehet")
    .positive("A szélesség legyen nagyobb 0-nál"),
  weightKg: z.coerce.number(num).positive("A súly legyen nagyobb 0-nál"),
  color: z
    .string()
    .trim()
    .min(1, "Add meg a színt")
    .max(50, "Legfeljebb 50 karakter"),
});

// Termék módosítása -----------------
export async function modifyProduct(id: Product["id"], formData: FormData) {
  await requireAdmin();

  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return { errors: z.flattenError(parsed.error).fieldErrors };

  await db.update(products).set(parsed.data).where(eq(products.id, id));

  revalidatePath("/admin/termekek");
  return { success: true };
}

// Termék feltöltése------------------
const createProductSchema = productSchema.extend({
  img: z
    .string()
    .trim()
    .min(1, "Adj meg egy képet")
    .max(255, "Legfeljebb 255 karakter"),
});

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const parsed = createProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return { errors: z.flattenError(parsed.error).fieldErrors };

  try {
    await db.insert(products).values(parsed.data);
  } catch (e: any) {
    const code = e?.code ?? e?.cause?.code;
    if (code === "23505")
      return { errors: { slug: ["Ez a slug már foglalt"] } };
    throw e;
  }

  revalidatePath("/admin/termekek");
  return { success: true };
}
