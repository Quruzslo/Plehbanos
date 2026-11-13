import { Suspense } from "react";
import type { Metadata } from "next";
import { cacheTag, cacheLife } from "next/cache";
import { desc, eq, getTableColumns } from "drizzle-orm";
import ProductPage from "./ProductsPage";
import { db } from "@/lib/db";
import {
  categories,
  products,
  type ProductWithCategory,
} from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Kézműves bádog dekorációk Somogyból – József Zoltán bádogosmester",
  description:
    "Kézzel készített, egyedi bádog díszek házra és kertbe, József Zoltán bádogosmester műhelyéből. Rendelés utánvéttel, országos szállítással.",
};

async function ProductsContent() {
  "use cache";
  cacheTag("products");

  let items: ProductWithCategory[] = [];
  let allCategories: (typeof categories.$inferSelect)[] = [];

  try {
    [items, allCategories] = await Promise.all([
      db
        .select({
          ...getTableColumns(products),
          categoryName: categories.name,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .orderBy(desc(products.id)),
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

export default function ProductsPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="h-[60vh] flex items-center justify-center">
          Termékek betöltése...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
