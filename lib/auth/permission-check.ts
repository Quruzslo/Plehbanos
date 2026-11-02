import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    throw new Error("Nincs jogosultság");
  }

  return session;
}
