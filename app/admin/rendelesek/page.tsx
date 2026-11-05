import Link from "next/link";
import { redirect } from "next/navigation";
import { count, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import OrdersComp from "./OrdersComp";

const PAGE_SIZE = 20;

async function getOrders(page: number) {
  const [rows, [{ total }], [{ newCount }]] = await Promise.all([
    db
      .select()
      .from(orders)
      // az id a holtversenyt dönti el, így két oldal között nem csúszik el semmi
      .orderBy(desc(orders.createdAt), desc(orders.id))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(orders),
    db
      .select({ newCount: count() })
      .from(orders)
      .where(eq(orders.status, "uj")),
  ]);

  // csak az aktuális oldal rendeléseinek tételei
  const items = rows.length
    ? await db
        .select()
        .from(orderItems)
        .where(
          inArray(
            orderItems.orderId,
            rows.map((r) => r.id),
          ),
        )
    : [];

  return {
    orders: rows.map((order) => ({
      ...order,
      items: items.filter((item) => item.orderId === order.id),
    })),
    total,
    newCount,
  };
}

export default async function Orders({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Math.floor(Number(pageParam)) || 1);

  const { orders, total, newCount } = await getOrders(page);

  if (total === 0) return <p>Nincs még rendelés.</p>;

  const pages = Math.ceil(total / PAGE_SIZE);
  if (page > pages) redirect(`?page=${pages}`);

  return (
    <div className="w-full rounded-md border-1 border-text/50">
      <OrdersComp orders={orders} total={total} newCount={newCount} />
      <Pagination page={page} pages={pages} />
    </div>
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
