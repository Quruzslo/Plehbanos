"use server";

import { auth } from "@/lib/auth/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await auth.api.signInEmail({ body: { email, password } });
  } catch (e) {
    if (e instanceof APIError) return { error: "Hibás email vagy jelszó" };
    throw e;
  }

  redirect("/admin/fiokom");
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/belepes");
}
