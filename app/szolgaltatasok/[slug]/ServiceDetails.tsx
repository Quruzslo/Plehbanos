import { notFound } from "next/navigation";
import { getServiceBySlug, services, MATERIALS } from "@/lib/datas/services";
import Image from "next/image";
import Link from "next/link";

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <section data-header="light" className="w-full flex flex-col pt-[120px] ">
        <div className="flex flex-col lg:flex-row w-[90%] max-w-[2560px] mx-auto my-auto text-text rounded-[10px] ">
          <div className="w-full lg:w-1/2 my-auto order-2 lg:order-1">
            <h1 className="text-[20px] lg:text-[35px] text-accent font-bold mb-[25px]">
              {service.title}
            </h1>
            <p>{service.desc}</p>
            <div className="flex flex-col md:flex-row gap-[10px] items-center mt-[25px]">
              <div className="relative aspect-square w-[100px] rounded-full bg-text shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)]">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 size-full "
                >
                  <defs>
                    <path
                      id="exp-circle"
                      d="M 10,50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    />
                  </defs>
                  <text className="fill-white text-[9px] uppercase tracking-[0.25em]">
                    <textPath
                      href="#exp-circle"
                      startOffset="25%"
                      textAnchor="middle"
                    >
                      Tapasztalat
                    </textPath>
                  </text>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-accent text-[25px] font-black">
                    30+ év
                  </span>
                </div>
              </div>
              <Link
                href="/kapcsolat"
                className="flex flex-col text-[25px] bg-accent text-white items-center justify-center rounded-[5px] py-[5px] px-[15px] transition duration-300 hover:shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)] "
              >
                Kapcsolat
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative h-full aspect-[4/3] order-1 lg:order-2">
            <Image
              fill
              alt={`${service.title} - bádogos munkák Kaposváron és környékén, Somogy megye bádogos`}
              src={service.img.src}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            ></Image>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col my-[100px]">
        <div className="flex flex-col lg:flex-row w-[90%] max-w-[2560px] mx-auto my-auto text-text rounded-[10px] ">
          <div className="flex flex-col w-full lg:w-1/2 p-[10px] ">
            <h2 className="text-[20px] lg:text-[35px] font-bold mb-[20px]">
              Folyamat, ahogyan dolgozunk
            </h2>
            <div className="flex flex-col gap-[15px] bg-accent p-[10px] rounded-[10px] shadow-md z-10">
              {service.process.map((item, idx) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-[15px] text-white relative"
                >
                  <div className="absolute top-[50%] translate-y-[-50%] left-[-25px] w-[25px] h-[25px] bg-transparent border-4 border-accent rounded-[5px]  !z-[-1]" />
                  <div className="flex flex-row gap-3 items-center w-fit text-[20px] font-bold ">
                    <span className="text-transparent [-webkit-text-stroke:1px_#ffffff] p-[5px] rounded-md bg-text">
                      {idx + 1}/{service.process.length}
                    </span>
                    <p>{item.title}</p>
                  </div>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/2 p-[10px]">
            <h2 className="text-[20px] lg:text-[35px] font-bold mb-[20px]">
              Tervezett anyaghasználat
            </h2>
            <div className="grid grid-cols-2 gap-[15px]">
              {service.materials.map((material, idx) => (
                <div
                  key={material.name}
                  className="flex flex-col relative gap-[10px]"
                >
                  <span>{material.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
