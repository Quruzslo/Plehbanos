import { motion } from "motion/react";
import { CheckFatIcon } from "@phosphor-icons/react";
import {
  getCategories,
  CATEGORIES,
  type Category,
  getCategoriesCount,
} from "./products";

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
          animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 1 }}
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
  category: Category | null;
  setCategory: (c: Category | null) => void;
};

export default function Categories({ category, setCategory }: Props) {
  const categories = getCategories();

  return (
    <div className="w-fit lg:p-[10px] flex flex-col items-start gap-1 bg-white text-[15px] font-bold">
      <div className="flex flex-row gap-3">
        <Option
          label="Összes"
          active={category === null}
          onSelect={() => setCategory(null)}
        />
        <span className="text-accent ">
          {"("}
          {getCategoriesCount("")}
          {")"}
        </span>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="flex flex-row gap-3">
          <Option
            label={CATEGORIES[cat]}
            active={category === cat}
            onSelect={() => setCategory(cat)}
          />
          <span className="text-accent ">
            {"("}
            {getCategoriesCount(cat)}
            {")"}
          </span>
        </div>
      ))}
    </div>
  );
}
