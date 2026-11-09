"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { contactForm } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/permission-check";

export async function deleteContact(id: number) {
  await requireAdmin();
  try {
    await db.delete(contactForm).where(eq(contactForm.id, id));

    revalidatePath("/admin/levelezes");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Hiba történt az üzenet törlése során.",
    };
  }
}
