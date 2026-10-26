import type { Dispatch, SetStateAction } from "react";
import type { Product } from "./products";
import Image from "next/image";
import {
  ShoppingCartIcon,
  MagnifyingGlassPlusIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react";

const MAX_COMPARE = 3;

export default function ProductCard({
  item,
  setActiveCompare,
  setCompareOpen,
  activeCompare,
  isNew,
  setQuickView,
}: {
  item: Product;
  setActiveCompare: Dispatch<SetStateAction<Product[]>>;
  setCompareOpen: Dispatch<SetStateAction<boolean>>;
  activeCompare: Product[];
  isNew?: boolean;
  setQuickView: any;
}) {
  const active = activeCompare.some((i) => i.id === item.id);
  const disabled = !active && activeCompare.length >= MAX_COMPARE;

  return (
    <div className="shrink-0 h-full w-full relative flex flex-col transition duration-400 hover:shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-[10px] border-1 border-text/20">
      {isNew ? (
        <span className="absolute top-[5px] right-[5px] bg-amber-400 text-text p-[2px] rounded-full w-[25px] h-[25px] z-10 flex flex-row items-center justify-center">
          Új
        </span>
      ) : null}
      <div className="relative w-full max-w-[200px] aspect-square mx-auto mt-[10px]">
        <Image
          fill
          alt={item.name}
          src={item.img}
          sizes="200px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col flex-1 gap-[5px] p-[10px]">
        <p className="text-text text-[15px] font-bold">{item.name}</p>
        <div className=" w-fit z-10">
          {item.stock >= 1 ? (
            <p className="bg-green-600 text-green-100 w-fit px-[5px] rounded-[7px]">
              Raktáron
            </p>
          ) : (
            <p className="bg-stone-400 text-red-100 w-fit px-[5px] rounded-[7px]">
              Elfogyott
            </p>
          )}
        </div>

        <div className="text-text/50 font-bold">
          {item.salePrice ? (
            <div className="flex flex-row gap-2 items-center">
              <span className="text-red-500">
                {item.salePrice.toLocaleString("hu-HU")} Ft.
              </span>
              <s className="opacity-50 text-[12px]">
                {item.price.toLocaleString("hu-HU")} Ft.
              </s>
            </div>
          ) : (
            <>{item.price.toLocaleString("hu-HU")} Ft.</>
          )}
        </div>

        <div className="flex flex-row gap-[5px] items-center mt-auto">
          <button
            type="button"
            title="Megrendelem"
            className="cursor-pointer w-fit rounded-full bg-text text-white text-[15px] p-[10px] hover:bg-accent"
          >
            <ShoppingCartIcon size={20} />
          </button>
          <button
            onClick={() => setQuickView(item)}
            type="button"
            title="Gyors nézet"
            className="cursor-pointer w-fit h-fit ml-auto rounded-full bg-transparent text-text border-1 border-text/20 text-[15px] p-[10px] hover:bg-accent hover:text-white"
          >
            <MagnifyingGlassPlusIcon size={15} />
          </button>

          <button
            type="button"
            title="Összehasonlítás"
            disabled={disabled}
            onClick={() => {
              if (!active) setActiveCompare((prev) => [...prev, item]);
              setCompareOpen(true);
            }}
            className={`w-fit h-fit rounded-full border-1 bg-transparent text-text text-[15px] p-[10px] cursor-pointer enabled:hover:bg-accent enabled:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed ${
              active ? "border-accent" : "border-text/20"
            }`}
          >
            <ArrowsLeftRightIcon size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
