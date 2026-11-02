// app/admin/layout.tsx
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import AdminNav from "./components/adminNav";

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") redirect("/belepes");

  return (
    <section className="w-full min-h-[100svh] flex flex-col lg:flex-row ">
      {/* Navigációs panel-------------- */}
      <div className="flex flex-col w-[90%] lg:w-[250px] lg:min-h-full mx-auto bg-text text-white shadow-[0px_0px_15px_0px_rgba(0,0,0,0.6)]">
        <AdminNav userName={session.user.name} />
      </div>

      {/* Tartalom panel---------------- */}
      <div className="w-[90%] lg:w-full mx-auto flex flex-col gap-[20px] p-[10px] lg:px-[35px] ">
        <div className="w-full max-w-[1800px] mx-auto">{children}</div>
      </div>
    </section>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<p className="p-[20px]">Betöltés...</p>}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
