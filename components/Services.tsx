"use client";
import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { services } from "@/lib/datas/services";
import MainButton from "@/lib/ui/MainButton";
import ServicesModal from "./ServicesModal";
import type { Service } from "@/lib/datas/services";
import { EyeIcon } from "@phosphor-icons/react";

import { useState } from "react";

export default function Services() {
  const [activeModal, setActiveModal] = useState<Service | null>(null);

  return (
    <section id="szolgaltatasok" className="flex w-full flex-col py-[50px]">
      <div className="mx-auto flex w-[90%] max-w-[1800px] flex-col gap-8">
        <h2
          id="szolgaltatasok-cim"
          className="text-3xl font-semibold md:text-4xl"
        >
          Bádogos szolgáltatásaink
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="service-card transition-all duration-300 hover:shadow-[5px_5px_15px_0px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden rounded-[10px] bg-white text-text relative h-[450px] group "
            >
              <button
                onClick={() => setActiveModal(service)}
                className="z-10 absolute card-preview cursor-pointer "
              >
                <EyeIcon size={32} className="text-accent" />
                <span className="pointer-events-none absolute top-full right-0 text-white bg-accent py-[3px] px-[10px]  opacity-0 translate-y-[35px] transition-all duration-300  [.card-preview:hover_&]:translate-y-0 [.card-preview:hover_&]:opacity-100">
                  Előnézet
                </span>
              </button>

              <div className="absolute aspect-[4/3]  inset-0 ">
                {service.img.src && (
                  <Image
                    src={service.img.src}
                    alt={service.img.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain text-white !h-[250px]"
                  />
                )}
              </div>

              <div className="flex flex-col p-[5px] z-10 mt-auto">
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>

              <div className="flex flex-col gap-3 p-[5px] z-10 ">
                <p className="flex-1 text-sm ">{service.shortDesc}</p>
                <MainButton
                  link={`/szolgaltatasok/${service.slug}`}
                  text="Tovább"
                  icon={ArrowRightIcon}
                  iconSize={20}
                  className="self-start service-button !text-accent translate-y-[110%] group-hover:translate-y-0 transition-all duration-500"
                />
              </div>
            </article>
          ))}
        </div>
        <ServicesModal
          active={activeModal}
          setActiveModal={setActiveModal}
        ></ServicesModal>
      </div>
    </section>
  );
}
