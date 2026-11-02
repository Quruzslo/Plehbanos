import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session || session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/belepes", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
