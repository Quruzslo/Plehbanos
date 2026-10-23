"use client";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "./products";
import {
  ShoppingCartIcon,
  MagnifyingGlassPlusIcon,
  HeartIcon,
  ArrowsLeftRightIcon,
  ArrowFatRightIcon,
  ArrowFatLeftIcon,
} from "@phosphor-icons/react";

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const isFirst = active === 0;
  const isLast = active === products.length - 1;

  return (
    <div className="flex flex-col items-center [--item:200px] md:[--item:250px] [--gap:15px]">
      <div className="w-full overflow-hidden">
        <div
          className="flex w-max gap-(--gap) transition-transform duration-500 ease-out motion-reduce:transition-none p-[10px]"
          style={{
            marginLeft: "calc(50% - var(--item) / 2)",
            transform: `translateX(calc(${active} * (var(--item) + var(--gap)) * -1))`,
          }}
        >
          {products.map((item, idx) => (
            <div
              key={item.slug}
              className={`shrink-0 w-(--item) relative transition duration-400 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-[10px] ${
                active === idx ? "scale-100" : "scale-60 opacity-60"
              }`}
            >
              <div className="relative w-full max-w-[200px] aspect-square mx-auto mt-[10px]">
                <Image
                  fill
                  alt={item.name}
                  src={item.img}
                  sizes="200px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-[5px] p-[10px]">
                <p className="text-text text-[15px] font-black">{item.name}</p>

                <div className=" absolute top-[5px] left-[5px] w-fit z-10">
                  {item.stock >= 1 ? (
                    <p className="bg-green-600 text-green-100 w-fit px-[5px] rounded-[5px]">
                      {" "}
                      Raktáron
                    </p>
                  ) : (
                    <p className="bg-stone-400 text-red-100 w-fit px-[5px] rounded-full">
                      Elfogyott
                    </p>
                  )}
                </div>

                <p className="text-text font-bold ">{item.price} Ft.</p>
                <div className="flex flex-row gap-[5px] items-center">
                  <button
                    title="Kosárba"
                    className="cursor-pointer w-fit rounded-full bg-text text-white text-[15px] p-[10px] hover:bg-accent"
                  >
                    <ShoppingCartIcon size={20} />
                  </button>
                  <button
                    title="Gyors nézet"
                    className="cursor-pointer  w-fit h-fit  ml-auto rounded-full bg-transparent text-text border-1 border-text/20 text-[15px] p-[10px] hover:bg-accent hover:text-white"
                  >
                    <MagnifyingGlassPlusIcon size={15} />
                  </button>
                  <button
                    title="Kívánságlistára"
                    className="cursor-pointer w-fit h-fit  rounded-full bg-transparent text-text border-1 border-text/20 text-[15px] p-[10px] hover:bg-accent hover:text-white"
                  >
                    <HeartIcon size={15} />
                  </button>
                  <button
                    title="Összehasonlítás"
                    className="cursor-pointer  w-fit h-fit  rounded-full bg-transparent text-text border-1 border-text/20 text-[15px] p-[10px] hover:bg-accent hover:text-white"
                  >
                    <ArrowsLeftRightIcon size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-[15px] mt-[25px] w-fit p-[5px] rounded-full bg-gray-300">
        <button
          onClick={() => setActive((prev) => prev - 1)}
          disabled={isFirst}
          aria-label="Előző termék"
          className="cursor-pointer w-[35px] h-[35px] rounded-full bg-accent text-white disabled:opacity-40 disabled:cursor-default "
        >
          <ArrowFatLeftIcon size={20} className="mx-auto my-auto" />
        </button>
        <button
          onClick={() => setActive((prev) => prev + 1)}
          disabled={isLast}
          aria-label="Következő termék"
          className="cursor-pointer w-[35px] h-[35px] rounded-full bg-accent text-white disabled:opacity-40 disabled:cursor-default"
        >
          <ArrowFatRightIcon size={20} className="mx-auto my-auto" />
        </button>
      </div>
    </div>
  );
}
