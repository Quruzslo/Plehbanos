"use client";
import { CheckFatIcon } from "@phosphor-icons/react";
import BreadCrumbs from "@/lib/ui/BreadCrumbs";
const benefits = [
  "Nem tucat termék",
  "Minőségi anyagokból",
  "Időtálló és egyedi",
];

export default function ProductPage() {
  return (
    <section
      data-header="light"
      className="flex flex-col w-full pt-[120px] lg:pt-[150px] bg-white"
    >
      <div className="flex flex-col lg:flex-row w-[90%] max-w-[2560px] mx-auto">
        <div className="flex flex-col w-full lg:w-1/2">
          <BreadCrumbs items={[{ label: "Termékek" }]}></BreadCrumbs>
          <h1 className="text-[35px] font-black">
            Kézműves dekorációs termékek
          </h1>

          <p className="text-[20px]">
            Kézműves bádogos termékek, családiházakra és kertekbe
          </p>

          <ul className="flex flex-col  justify-center gap-[5px] w-fit mr-auto mt-[20px]">
            {benefits.map((elem) => (
              <li key={elem} className="flex flex-row nowrap gap-3">
                <div className="flex flex-row items-center justify-center relative  overflow-hidden rounded-full w-[30px] h-[30px]">
                  <CheckFatIcon size={20} className="fill-accent" />
                </div>
                <p>{elem}</p>
              </li>
            ))}

            <li className="flex flex-row nowrap gap-3 relative w-fit items-center justify-center ">
              <div className="flex flex-row items-center justify-center relative  overflow-hidden rounded-full w-[30px] h-[30px]">
                <span className="absolute top-0 left-0 w-full h-1/3 bg-red-400" />
                <span className="absolute top-2/3 left-0 w-full h-1/3 bg-white" />
                <span className="absolute bottom-0 left-0 w-full h-1/3 bg-green-400" />
              </div>

              <p className="z-10 font-bold">Made in Hungary</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-full lg:w-1/2"></div>
      </div>
      <div className="flex flex-row my-[20px] bg-accent text-white p-[15px] rounded-[10px] w-[90%] max-w-[2560px] mx-auto">
        <p>Szeretnél egy kifejezetten neked készített dísz elemet?</p>
        <p>Írd meg az elképzeléseidet nekünk</p>
      </div>
    </section>
  );
}
