"use client";

import { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

export default function Faq({ data }: { data: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="flex w-full flex-col items-center my-[100px]">
      <div className="w-[90%] max-w-[2560px]  mx-auto ">
        {data.map((item, idx) => {
          const isOpen = openIdx === idx;
          const panelId = `${baseId}-${idx}`;

          return (
            <div key={item.question} className="border-b border-text/15 w-full">
              <h3 className="">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full text-[20px] items-center justify-between gap-4 py-5 text-left text-lg font-semibold cursor-pointer"
                >
                  {item.question}
                  <span aria-hidden className="relative size-[25px] shrink-0">
                    <span
                      className={`absolute inset-0 m-auto h-1 w-[25px] rounded-full bg-accent transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-90"}`}
                    />
                    <span className="absolute inset-0 m-auto h-1 w-[25px] rounded-full bg-accent" />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                inert={!isOpen}
                className={`grid transition-all bg-accent duration-300 ease-out ${isOpen ? "grid-rows-[1fr] p-[10px] rounded-[10px]" : "grid-rows-[0fr] p-[0px] rounded-[0px]"}`}
              >
                <div className="overflow-hidden ">
                  <p className=" py-[10px] leading-relaxed text-white">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
