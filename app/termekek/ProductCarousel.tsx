"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Product } from "./products";
import ProductCard from "./ProductCard";
import { ArrowFatRightIcon, ArrowFatLeftIcon } from "@phosphor-icons/react";

type Props = {
  products: Product[];
  activeCompare: Product[];
  setActiveCompare: Dispatch<SetStateAction<Product[]>>;
  setCompareOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProductCarousel({
  products,
  activeCompare,
  setActiveCompare,
  setCompareOpen,
}: Props) {
  const [active, setActive] = useState(0);
  const latest = products.slice(-3).reverse();
  const isFirst = active === 0;
  const isLast = active === latest.length - 1;

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
          {latest.map((item, idx) => (
            <div
              key={item.id}
              className={`shrink-0 w-(--item) transition duration-400 ${
                active === idx ? "scale-100" : "scale-60 opacity-60"
              }`}
            >
              <ProductCard
                item={item}
                activeCompare={activeCompare}
                setActiveCompare={setActiveCompare}
                setCompareOpen={setCompareOpen}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-[15px] mt-[25px] w-fit p-[5px] rounded-full bg-gray-300">
        <button
          type="button"
          onClick={() => setActive((prev) => prev - 1)}
          disabled={isFirst}
          aria-label="Előző termék"
          className="cursor-pointer w-[35px] h-[35px] rounded-full bg-accent text-white disabled:opacity-40 disabled:cursor-default"
        >
          <ArrowFatLeftIcon size={20} className="mx-auto my-auto" />
        </button>
        <button
          type="button"
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
