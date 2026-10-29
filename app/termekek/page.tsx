import type { Metadata } from "next";
import ProductPage from "./ProductsPage";
import { db } from "@/src/db";
import { categories, products } from "@/src/db/schema";
import { desc, asc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Kézműves bádogos dekorációs termékek Somogyból",
  description:
    "Rendelhető, egyedi, kézzel készített bádog dekorációs elemek, házakra, kertekbe. József Zoltán bádogosmester kezeiből",
};

const items = await db.select().from(products);

const newItems = await db
  .select()
  .from(products)
  .orderBy(desc(products.id))
  .limit(3);

const allCategories = await db.select().from(categories);

export default function ProductsPageWrapper() {
  return (
    <ProductPage
      items={items}
      newItems={newItems}
      categories={allCategories}
    ></ProductPage>
  );
}
