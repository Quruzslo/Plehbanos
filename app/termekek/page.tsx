import type { Metadata } from "next";
import { cacheTag, cacheLife, revalidatePath } from "next/cache";
import { desc } from "drizzle-orm";
import ProductPage from "./ProductsPage";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Kézműves bádogos dekorációs termékek Somogyból",
  description:
    "Rendelhető, egyedi, kézzel készített bádog dekorációs elemek, házakra, kertekbe. József Zoltán bádogosmester kezeiből",
};

export default async function ProductsPageWrapper() {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  const [items, newItems, allCategories] = await Promise.all([
    db.select().from(products),
    db.select().from(products).orderBy(desc(products.id)).limit(3),
    db.select().from(categories),
  ]);

  return (
    <ProductPage items={items} newItems={newItems} categories={allCategories} />
  );
}
