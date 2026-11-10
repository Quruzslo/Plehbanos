import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ProductSinglePage from "./ProductSinglePageComp";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProductBySlug(slug: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return product || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Termék nem található",
    };
  }

  return {
    title: `${product.name} – József Zoltán bádogosmester`,
    description: product.description,
    keywords: "Kézműves bádogos dísz és termék, " + product.name,
  };
}

async function ProductLoader({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductSinglePage product={product} />;
}

export default function ProductSingleWrapper({ params }: Props) {
  return (
    <section data-header="light">
      <Suspense
        fallback={
          <div className="h-[60vh] flex items-center justify-center">
            Betöltés...
          </div>
        }
      >
        <ProductLoader params={params} />
      </Suspense>
    </section>
  );
}
