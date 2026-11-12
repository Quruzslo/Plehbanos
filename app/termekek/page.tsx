import type { Metadata } from "next";
import { cacheTag, cacheLife } from "next/cache";
import { desc } from "drizzle-orm";
import ProductPage from "./ProductsPage";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Kézműves bádog dekorációk Somogyból – József Zoltán bádogosmester",
  description:
    "Kézzel készített, egyedi bádog díszek házra és kertbe, József Zoltán bádogosmester műhelyéből. Rendelés utánvéttel, országos szállítással.",
};

export default async function ProductsPageWrapper() {
  "use cache";
  cacheTag("products");

  let items: (typeof products.$inferSelect)[] = [];
  let allCategories: (typeof categories.$inferSelect)[] = [];

  try {
    [items, allCategories] = await Promise.all([
      db.select().from(products).orderBy(desc(products.id)),
      db.select().from(categories),
    ]);
    cacheLife("hours");
  } catch {
    cacheLife({ revalidate: 1, expire: 1 });
  }

  const newItems = items.slice(0, 3);

  return (
    <ProductPage items={items} newItems={newItems} categories={allCategories} />
  );
}
