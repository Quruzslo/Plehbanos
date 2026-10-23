import type { Product } from "./products";
import Image from "next/image";
import {
  ShoppingCartIcon,
  MagnifyingGlassPlusIcon,
  HeartIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react";

export default function ProductCard({ item }: { item: Product }) {
  return (
    <div
      key={item.slug}
      className={`shrink-0 w-full relative  transition duration-400 hover:shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-[10px] border-1 border-text/20`}
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

        <div className=" absolute top-[3px] left-[3px] w-fit z-10">
          {item.stock >= 1 ? (
            <p className="bg-green-600 text-green-100 w-fit px-[5px] rounded-[7px]">
              {" "}
              Raktáron
            </p>
          ) : (
            <p className="bg-stone-400 text-red-100 w-fit px-[5px] rounded-[7px]">
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
  );
}
