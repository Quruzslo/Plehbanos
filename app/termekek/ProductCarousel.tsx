"use client";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "./products";

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const isFirst = active === 0;
  const isLast = active === products.length - 1;

  return (
    <div className="flex flex-col items-center [--item:200px] md:[--item:250px] [--gap:15px]">
      <div className="w-full overflow-hidden">
        <div
          className="flex w-max gap-(--gap) transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{
            marginLeft: "calc(50% - var(--item) / 2)",
            transform: `translateX(calc(${active} * (var(--item) + var(--gap)) * -1))`,
          }}
        >
          {products.map((item, idx) => (
            <div
              key={item.slug}
              className={`relative shrink-0 w-(--item) aspect-square transition duration-300 ${
                active === idx ? "scale-100" : "scale-60 opacity-60"
              }`}
            >
              <Image
                fill
                alt={item.name}
                src={item.img}
                sizes="(min-width: 768px) 250px, 200px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-[15px] mt-[25px] w-fit p-[5px] rounded-full bg-gray-300">
        <button
          onClick={() => setActive((prev) => prev - 1)}
          disabled={isFirst}
          aria-label="Előző termék"
          className="cursor-pointer w-[35px] h-[35px] rounded-full bg-accent text-white disabled:opacity-40 disabled:cursor-default"
        >
          -
        </button>
        <button
          onClick={() => setActive((prev) => prev + 1)}
          disabled={isLast}
          aria-label="Következő termék"
          className="cursor-pointer w-[35px] h-[35px] rounded-full bg-accent text-white disabled:opacity-40 disabled:cursor-default"
        >
          +
        </button>
      </div>
    </div>
  );
}
