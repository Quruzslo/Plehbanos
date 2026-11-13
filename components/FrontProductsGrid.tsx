"use client";

import { useState } from "react";
import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import type { Product, ProductWithCategory } from "@/lib/db/schema";
import ProductCard from "@/app/termekek/ProductCard";
import Compare from "@/app/termekek/Compare";
import QuickView from "@/app/termekek/QuickView";
// import CartModal from "@/lib/ui/CartModal";

export default function FrontProductsGrid({
  items,
}: {
  items: ProductWithCategory[];
}) {
  const [activeCompare, setActiveCompare] = useState<ProductWithCategory[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quickView, setQuickView] = useState<ProductWithCategory | null>(null);

  return (
    <>
      {!compareOpen && activeCompare.length > 0 && !quickView && (
        <button
          type="button"
          onClick={() => setCompareOpen(true)}
          className="fixed bottom-[20px] right-[50%] translate-x-[50%] z-[150] flex items-center gap-[10px] rounded-full bg-text py-[8px] pl-[8px] pr-[15px] text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 cursor-pointer"
        >
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-accent">
            <ArrowsLeftRightIcon size={15} />
          </span>
          <span className="font-bold text-[15px]">
            {activeCompare.length} összehasonlítva
          </span>
        </button>
      )}

      {compareOpen && activeCompare.length > 0 && (
        <Compare
          activeCompare={activeCompare}
          setActiveCompare={setActiveCompare}
          onClose={() => setCompareOpen(false)}
        />
      )}

      {quickView && <QuickView setQuickView={setQuickView} item={quickView} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            activeCompare={activeCompare}
            setActiveCompare={setActiveCompare}
            setCompareOpen={setCompareOpen}
            setQuickView={setQuickView}
          />
        ))}
      </div>
    </>
  );
}
