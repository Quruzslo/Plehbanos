import { Suspense } from "react";
import type { Metadata } from "next";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/datas/services";
import ServiceDetails from "./ServiceDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  "use cache";
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seo.metaTitle,
    description: service.seo.metaDescription,
    keywords: service.seo.keywords,
  };
}

export default function ServiceSinglePage({ params }: Props) {
  return (
    <section>
      <Suspense fallback={<div className="h-[60vh]" />}>
        <ServiceDetails params={params} />
      </Suspense>
    </section>
  );
}
