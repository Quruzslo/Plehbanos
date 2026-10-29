"use client";

import { motion } from "motion/react";
import { CheckFatIcon } from "@phosphor-icons/react";
import type { Category, Product } from "@/src/db/schema";

type OptionProps = {
  label: string;
  active: boolean;
  onSelect: () => void;
};

function Option({ label, active, onSelect }: OptionProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="category"
        checked={active}
        onChange={onSelect}
        className="sr-only peer"
      />
      <span
        className={`flex items-center justify-center w-5 h-5 rounded-md border-2 transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50 ${
          active ? "bg-accent border-accent" : "border-text/40"
        }`}
      >
        <motion.span
          initial={false}
          animate={{ scale: active ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <CheckFatIcon size={12} weight="fill" className="fill-white" />
        </motion.span>
      </span>
      {label}
    </label>
  );
}

type Props = {
  categories: Category[];
  products: Product[];
  active: number | null;
  onChange: (id: number | null) => void;
};

export default function Categories({
  categories,
  products,
  active,
  onChange,
}: Props) {
  return (
    <div className="w-fit lg:p-[10px] flex flex-col items-start gap-1 bg-white text-[15px] font-bold">
      <div className="flex flex-row gap-3">
        <Option
          label="Összes"
          active={active === null}
          onSelect={() => onChange(null)}
        />
        <span className="text-accent">({products.length})</span>
      </div>

      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-row gap-3">
          <Option
            label={cat.name}
            active={active === cat.id}
            onSelect={() => onChange(cat.id)}
          />
          <span className="text-accent">
            ({products.filter((p) => p.categoryId === cat.id).length})
          </span>
        </div>
      ))}
    </div>
  );
}
