import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { CANCELLABLE } from "../status";
import CancelButton from "./CancelButton";

export const metadata: Metadata = {
  title: "Rendelés lemondása",
  robots: { index: false, follow: false },
};

const huf = (n: number) => `${new Intl.NumberFormat("hu-HU").format(n)} Ft`;

type Props = { params: Promise<{ token: string }> };

export default function CancelPage({ params }: Props) {
  return (
    <section
      data-header="light"
      className="flex flex-col w-full min-h-screen pt-[120px] lg:pt-[150px] bg-white"
    >
      <div className="w-[90%] max-w-[720px] mx-auto pb-[60px]">
        <Suspense fallback={<p>Betöltés…</p>}>
          <OrderDetails params={params} />
        </Suspense>
      </div>
    </section>
  );
}

async function OrderDetails({ params }: Props) {
  const { token } = await params;

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.cancelToken, token));

  if (!order) notFound();

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  const date = new Intl.DateTimeFormat("hu-HU", {
    dateStyle: "long",
    timeZone: "Europe/Budapest",
  }).format(order.createdAt);

  return (
    <>
      <h1 className="text-[35px] font-black">Rendelés lemondása</h1>
      <p className="text-[18px] text-text/70">
        Rendelés #{order.id} · {date}
      </p>

      <ul className="flex flex-col mt-[30px] border-t border-text/10">
        {items.map((i) => (
          <li
            key={i.id}
            className="flex items-center gap-[15px] py-[15px] border-b border-text/10"
          >
            {i.img ? (
              <Image
                src={i.img}
                alt={i.name}
                width={72}
                height={72}
                className="w-[72px] h-[72px] rounded-md object-cover"
              />
            ) : (
              <div className="w-[72px] h-[72px] rounded-md bg-text/5" />
            )}
            <div className="flex flex-col flex-1">
              <p className="font-bold">{i.name}</p>
              <p className="text-[14px] text-text/60">
                {i.quantity} db × {huf(i.unitPrice)}
              </p>
            </div>
            <p className="font-bold whitespace-nowrap">
              {huf(i.unitPrice * i.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-[20px] text-[20px] font-black">
        <span>Összesen</span>
        <span>{huf(order.total)}</span>
      </div>

      <div className="mt-[40px]">
        {order.status === "lemondva" ? (
          <p className="text-[18px] font-bold">Ezt a rendelést lemondtad.</p>
        ) : CANCELLABLE.includes(order.status) ? (
          <>
            <p className="mb-[20px]">
              A csomagot még nem adtuk fel, így a rendelésed lemondhatod. A
              lemondás nem vonható vissza.
            </p>
            <CancelButton token={token} />
          </>
        ) : (
          <p>
            A csomagot már feladtuk, ezért a rendelés itt nem mondható le. Ha el
            szeretnél állni a vásárlástól,{" "}
            <Link href="/kapcsolat" className="font-bold text-accent underline">
              írj nekünk
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}
