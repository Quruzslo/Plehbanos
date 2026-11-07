import { cacheLife, cacheTag } from "next/cache";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import FrontProductsGrid from "./FrontProductsGrid";

export default async function FrontProducts() {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  const items = await db
    .select()
    .from(products)
    .orderBy(desc(products.id))
    .limit(3);

  if (items.length === 0) return null;

  return (
    <section className="w-full flex flex-col my-[50px]">
      <div className="flex flex-col w-[90%] max-w-[2560px] mx-auto">
        <div className="flex flex-row items-end justify-between gap-[15px] mb-[25px]">
          <h2 className="text-[35px] font-black">Legújabb termékek</h2>
          <Link
            href="/termekek"
            className="font-bold text-accent underline-offset-4 hover:underline whitespace-nowrap"
          >
            Összes termék
          </Link>
        </div>

        <FrontProductsGrid items={items} />
      </div>
    </section>
  );
}
