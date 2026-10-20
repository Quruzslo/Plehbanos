import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/datas/services";
import Image from "next/image";

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <section
      data-header="light"
      className="w-full flex flex-col pt-[120px]  h-[100svh]"
    >
      <div className="flex flex-col lg:flex-row w-[90%] max-w-[2560px] mx-auto my-auto text-text rounded-[10px] ">
        <div className="w-full lg:w-1/2 my-auto">
          <h1 className="text-[20px] lg:text-[35px] text-accent">
            {service.title}
          </h1>
          <p>{service.desc}</p>
        </div>
        <div className="w-full lg:w-1/2 relative h-full aspect-[4/3]">
          <Image
            fill
            alt={`${service.title} - bádogos munkák Kaposváron és környékén, Somogy megye bádogos`}
            src={service.img.src}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          ></Image>
        </div>
      </div>
    </section>
  );
}
