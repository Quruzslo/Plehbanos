"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products, type Product } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/permission-check";
import { uploadImage, deleteImage } from "@/lib/storage/storage";

const emptyToNull = (v: unknown) => (v === "" || v === "0" ? null : v);
const num = { error: "Adj meg egy számot" };
const isUniqueViolation = (e: any) => (e?.code ?? e?.cause?.code) === "23505";
const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Add meg a termék nevét")
    .max(255, "Legfeljebb 255 karakter"),
  slug: z.string().trim().max(255, "Legfeljebb 255 karakter"),
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

const imageSchema = z
  .file({ error: "Válassz egy képet" })
  .mime(
    ["image/jpeg", "image/png", "image/webp"],
    "Csak JPG, PNG vagy WebP lehet",
  )
  .max(2 * 1024 * 1024, "Legfeljebb 2 MB lehet");

// Termék feltöltése------------------
const createProductSchema = productSchema.extend({ image: imageSchema });

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const parsed = createProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return { errors: z.flattenError(parsed.error).fieldErrors };

  const { image, ...data } = parsed.data;
  const slug = slugify(data.slug || data.name);
  if (!slug) return { errors: { slug: ["Érvénytelen slug"] } };

  const img = await uploadImage(image);

  try {
    await db.insert(products).values({ ...data, slug, img });
  } catch (e) {
    await deleteImage(img);
    if (isUniqueViolation(e))
      return { errors: { slug: ["Ez a slug már foglalt"] } };
    throw e;
  }

  revalidatePath("/admin/termekek");
  return { success: true };
}

// Termék módosítása -----------------
export async function modifyProduct(id: Product["id"], formData: FormData) {
  await requireAdmin();

  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return { errors: z.flattenError(parsed.error).fieldErrors };

  const slug = slugify(parsed.data.slug || parsed.data.name);
  if (!slug) return { errors: { slug: ["Érvénytelen slug"] } };

  const image = formData.get("image");
  const hasNewImage = image instanceof File && image.size > 0;

  if (hasNewImage) {
    const check = imageSchema.safeParse(image);
    if (!check.success)
      return { errors: { image: check.error.issues.map((i) => i.message) } };
  }

  const [old] = await db
    .select({ img: products.img })
    .from(products)
    .where(eq(products.id, id));

  const img = hasNewImage ? await uploadImage(image) : undefined;

  try {
    await db
      .update(products)
      .set({ ...parsed.data, slug, ...(img && { img }) })
      .where(eq(products.id, id));
  } catch (e) {
    if (img) await deleteImage(img);
    if (isUniqueViolation(e))
      return { errors: { slug: ["Ez a slug már foglalt"] } };
    throw e;
  }

  if (img && old?.img) await deleteImage(old.img);

  revalidatePath("/admin/termekek");
  revalidatePath("/termekek");
  return { success: true };
}

// Termék törlése ----------------

export async function deleteProduct(id: Product["id"]) {
  await requireAdmin();

  const [deleted] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning({ img: products.img });

  if (deleted) await deleteImage(deleted.img);

  revalidatePath("/admin/termekek");
  return { success: true };
}
