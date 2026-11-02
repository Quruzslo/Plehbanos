import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import ProductsGrid from "./productsGrid";

export default async function ProductsPage() {
  const [items, cats] = await Promise.all([
    db.select().from(products),
    db.select().from(categories),
  ]);

  return <ProductsGrid items={items} categories={cats} />;
}
