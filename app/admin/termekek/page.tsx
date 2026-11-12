import { Suspense } from "react";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import ProductsGrid from "./productsGrid";

async function ProductsContent() {
  await connection();

  const [items, cats] = await Promise.all([
    db.select().from(products),
    db.select().from(categories),
  ]);

  return <ProductsGrid items={items} categories={cats} />;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<p>Termékek betöltése...</p>}>
      <ProductsContent />
    </Suspense>
  );
}
