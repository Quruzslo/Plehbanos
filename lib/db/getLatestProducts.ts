"use server";

import { cacheTag, cacheLife } from "next/cache";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, type Product } from "@/lib/db/schema";

export async function getLatestProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  return await db.select().from(products).orderBy(desc(products.id)).limit(3);
}
