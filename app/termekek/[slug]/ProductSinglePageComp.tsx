"use client";

import Image from "next/image";
import { useRef, useContext } from "react";
import Link from "next/link";
import {
  CartActionsContext,
  CartStateContext,
} from "@/lib/context/cartContext";
import {
  ShoppingCartIcon,
  CheckIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react";
import type { Product } from "@/lib/db/schema";
import BreadCrumbs from "@/lib/ui/BreadCrumbs";

export default function ProductSinglePage({ product }: { product: Product }) {
  const cartActions = useContext(CartActionsContext);
  const cartItems = useContext(CartStateContext) ?? [];

  const inCart = cartItems.some((i) => i.id === product.id);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  return (
    <div className="w-[90%] max-w-[2560px] mx-auto pt-[120px] lg:pt-[160px] pb-[80px]">
      <div className="flex flex-col lg:flex-row overflow-hidden w-full">
        <div className="flex flex-col w-full lg:w-1/2">
          <div
            onMouseMove={handleZoom}
            className="relative w-full min-h-[450px] lg:min-h-[450px] h-[450px] cursor-zoom-in overflow-hidden flex items-center justify-center p-8"
          >
            <Image
              ref={imgRef}
              fill
              alt={product.name}
              src={product.img}
              className="object-contain hover:scale-200 transition-transform duration-100"
            />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2  lg:p-10 justify-between mt-[25px] lg:mt-[0px]">
          <div className="flex flex-col flex-1 gap-[15px]">
            <BreadCrumbs
              items={[
                { label: "Termékek", href: "/termekek" },
                { label: product.name },
              ]}
            />
            <h1 className="text-text text-[32px] lg:text-[40px] font-bold leading-tight">
              {product.name}
            </h1>

            <div className="w-fit">
              {product.stock >= 1 ? (
                <span className="bg-emerald-500/15 text-emerald-700 font-medium text-sm px-2.5 py-1 rounded-md">
                  Raktáron ({product.stock} db)
                </span>
              ) : (
                <span className="bg-red-500/15 text-red-700 font-medium text-sm px-2.5 py-1 rounded-md">
                  Elfogyott
                </span>
              )}
            </div>

            <div className="text-text text-2xl font-bold my-2">
              {product.salePrice ? (
                <div className="flex flex-row gap-3 items-center">
                  <span className="text-red-600">
                    {product.salePrice.toLocaleString("hu-HU")} Ft
                  </span>
                  <s className="opacity-40 text-sm font-normal">
                    {product.price.toLocaleString("hu-HU")} Ft
                  </s>
                </div>
              ) : (
                <span>{product.price.toLocaleString("hu-HU")} Ft</span>
              )}
            </div>

            <div className="flex flex-col gap-2.5 my-2">
              <h3 className="text-[18px] font-semibold border-b border-text/20 pb-1 w-fit mb-1">
                Termék paraméterei:
              </h3>
              <div className="flex flex-row gap-3 items-center text-sm text-text/80">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                Magasság: {product.heightCm} cm
              </div>
              <div className="flex flex-row gap-3 items-center text-sm text-text/80">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                Szélesség: {product.widthCm} cm
              </div>
              <div className="flex flex-row gap-3 items-center text-sm text-text/80">
                {/* Itt volt a szintaktikai hiba a lezárásnál */}
                <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                Súly: {product.weightKg} kg
              </div>
              <div className="flex flex-row gap-3 items-center text-sm text-text/80">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                Szín: {product.color}
              </div>
            </div>

            <p className="text-text/75 leading-relaxed text-sm lg:text-base mt-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-text/10">
            <button
              onClick={() => cartActions?.addItem(product)}
              type="button"
              disabled={product.stock < 1}
              className="cursor-pointer flex items-center justify-center gap-2.5 rounded-full bg-text px-6 py-3.5 text-white font-medium hover:bg-accent disabled:opacity-40 disabled:hover:bg-text transition-colors shadow-md"
            >
              <ShoppingCartIcon size={20} />
              <span>{product.stock < 1 ? "Elfogyott" : "Kosárba"}</span>
            </button>

            {inCart && (
              <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm">
                <CheckIcon size={20} weight="bold" />
                <span>A kosárban van</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
