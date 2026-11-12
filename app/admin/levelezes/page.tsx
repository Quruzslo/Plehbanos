import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { count, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { contactForm } from "@/lib/db/schema";
import ContactsComp from "./ContactComp";

const PAGE_SIZE = 20;

async function getContacts(page: number) {
  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(contactForm)
      .orderBy(desc(contactForm.createdAt), desc(contactForm.id))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(contactForm),
  ]);

  return {
    contacts: rows,
    total,
  };
}

async function ContactsContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await connection(); // Build időben itt megáll, nem próbálja elérni az adatbázist

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Math.floor(Number(pageParam)) || 1);

  const { contacts, total } = await getContacts(page);

  if (total === 0)
    return (
      <p className="p-4 text-sm text-text/55">Nincs még beérkezett üzenet.</p>
    );

  const pages = Math.ceil(total / PAGE_SIZE);
  if (page > pages) redirect(`?page=${pages}`);

  return (
    <div className="w-full rounded-md border border-text/50">
      <ContactsComp contacts={contacts} total={total} />
      <Pagination page={page} pages={pages} />
    </div>
  );
}

export default function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <p className="p-4 text-sm text-text/55">Üzenetek betöltése...</p>
      }
    >
      <ContactsContent searchParams={searchParams} />
    </Suspense>
  );
}

function Pagination({ page, pages }: { page: number; pages: number }) {
  if (pages <= 1) return null;

  const link =
    "text-sm text-text/60 underline-offset-4 hover:text-text hover:underline";

  return (
    <nav
      aria-label="Oldalak"
      className="flex items-center justify-between gap-4 border-t border-text/15 px-4 py-3 text-sm"
    >
      {page > 1 ? (
        <Link href={`?page=${page - 1}`} className={link}>
          ← Előző
        </Link>
      ) : (
        <span />
      )}

      <span className="tabular-nums text-text/55">
        {page} / {pages}. oldal
      </span>

      {page < pages ? (
        <Link href={`?page=${page + 1}`} className={link}>
          Következő →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
