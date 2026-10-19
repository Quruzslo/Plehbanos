"use client";
import Image from "next/image";
import type { Service } from "@/lib/datas/services";

interface ServicesModalProps {
  active: Service | null;
  setActiveModal: (service: Service | null) => void;
}

export default function ServicesModal({
  active,
  setActiveModal,
}: ServicesModalProps) {
  return (
    <>
      {active && (
        <section
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
          aria-labelledby="service-modal-title"
          className=" w-full h-full pt-[120px] pb-[35px] overflow-y-auto flex flex-col fixed inset-0 z-[100] bg-black/80"
        >
          <div className="relative flex flex-col lg:flex-row bg-white w-[80%] mx-auto my-auto rounded-[10px]">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Bezárás"
              title="Bezárás"
              className="absolute top-3 right-3 z-10 cursor-pointer p-2 text-xl text-accent"
            >
              ✕
            </button>

            <div className="flex w-full flex-col gap-4 p-6 lg:w-1/2">
              <h3 id="service-modal-title" className="text-2xl font-semibold">
                {active.title}
              </h3>

              {active.desc.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <ul className="grid gap-4 sm:grid-cols-2">
                {active.benefits.map(({ title, desc, icon: BenefitIcon }) => (
                  <li key={title} className="flex gap-3">
                    <BenefitIcon
                      weight="light"
                      aria-hidden
                      size={28}
                      className="shrink-0 text-accent"
                    />
                    <div>
                      <h4 className="font-semibold">{title}</h4>
                      <p className="text-sm">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {active.img.src && (
              <div className="relative aspect-[4/3] w-full lg:w-1/2">
                <Image
                  src={active.img.src}
                  alt={active.img.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
