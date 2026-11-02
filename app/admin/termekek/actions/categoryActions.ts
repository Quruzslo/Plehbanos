"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { categories, type Category } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/permission-check";

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Add meg a kategória nevét")
    .max(255, "Legfeljebb 255 karakter"),
  slug: z.string().trim().max(255, "Legfeljebb 255 karakter"),
});

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function parseCategory(formData: FormData) {
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return { errors: z.flattenError(parsed.error).fieldErrors };

  const slug = slugify(parsed.data.slug || parsed.data.name);
  if (!slug) return { errors: { slug: ["Érvénytelen slug"] } };

  return { data: { name: parsed.data.name, slug } };
}

const isUniqueViolation = (e: any) => (e?.code ?? e?.cause?.code) === "23505";

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const result = parseCategory(formData);
  if (!result.data) return { errors: result.errors };

  try {
    await db.insert(categories).values(result.data);
  } catch (e) {
    if (isUniqueViolation(e))
      return { errors: { slug: ["Ez a slug már foglalt"] } };
    throw e;
  }

  revalidatePath("/admin/termekek");
  return { success: true };
}

export async function updateCategory(id: Category["id"], formData: FormData) {
  await requireAdmin();
  const result = parseCategory(formData);
  if (!result.data) return { errors: result.errors };

  try {
    await db.update(categories).set(result.data).where(eq(categories.id, id));
  } catch (e) {
    if (isUniqueViolation(e))
      return { errors: { slug: ["Ez a slug már foglalt"] } };
    throw e;
  }

  revalidatePath("/admin/termekek");
  return { success: true };
}
