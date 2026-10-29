import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import Image from "next/image";
import {
  ArrowsLeftRightIcon,
  XIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import type { Product } from "@/src/db/schema";

type Props = {
  activeCompare: Product[];
  setActiveCompare: Dispatch<SetStateAction<Product[]>>;
  onClose: () => void;
};

export default function Compare({
  activeCompare,
  setActiveCompare,
  onClose,
}: Props) {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (activeCompare.length === 0) return null;

  const remove = (id: number) =>
    setActiveCompare((prev) => prev.filter((p) => p.id !== id));

  const label =
    "sticky left-0 bg-white z-10 p-[10px] w-[150px] font-bold border-r border-text/20";
  const cell = "p-[10px] border border-text/20";
  const row = "border border-text/20";

  return (
    <section className="fixed inset-0 w-full h-full bg-black/70 z-[200] pt-[100px] lg:pt-[150px] pb-[35px] overflow-y-auto">
      <div className="w-[90%] max-w-[2560px] mx-auto bg-white rounded-md">
        <div className="flex items-center justify-between p-[10px] border-b border-text/20">
          <h2 className="text-[20px] font-black flex flex-row gap-5 items-center">
            Összehasonlítás{" "}
            <ArrowsLeftRightIcon className="w-[25px] h-[25px] bg-accent text-white rounded-xs" />
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Összehasonlítás bezárása"
            className="rounded-full p-[8px] hover:bg-text/10 cursor-pointer"
          >
            <XIcon size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full table-fixed border-collapse text-left"
            style={{ minWidth: 150 + activeCompare.length * 250 }}
          >
            <thead>
              <tr>
                <th scope="col" className={label}>
                  Termék
                </th>
                {activeCompare.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className="relative p-[10px] align-top"
                  >
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      aria-label={`${p.name} eltávolítása`}
                      className="rounded-full p-[5px] text-white hover:bg-red-600 bg-red-300 cursor-pointer"
                    >
                      <XIcon size={15} />
                    </button>
                    <div className="relative mx-auto aspect-square w-[120px]">
                      <Image
                        fill
                        src={p.img}
                        alt=""
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-[5px]">{p.name}</p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className={row}>
                <th scope="row" className={label}>
                  Magasság
                </th>
                {activeCompare.map((p) => (
                  <td key={p.id} className={cell}>
                    {p.heightCm} cm
                  </td>
                ))}
              </tr>

              <tr className={row}>
                <th scope="row" className={label}>
                  Szélesség
                </th>
                {activeCompare.map((p) => (
                  <td key={p.id} className={cell}>
                    {p.widthCm} cm
                  </td>
                ))}
              </tr>

              <tr className={row}>
                <th scope="row" className={label}>
                  Súly
                </th>
                {activeCompare.map((p) => (
                  <td key={p.id} className={cell}>
                    {p.weightKg.toLocaleString("hu-HU")} kg
                  </td>
                ))}
              </tr>

              <tr className={row}>
                <th scope="row" className={label}>
                  Ár
                </th>
                {activeCompare.map((p) => (
                  <td key={p.id} className={cell}>
                    {p.salePrice ? (
                      <>
                        <span className="text-red-600 font-bold">
                          {p.salePrice.toLocaleString("hu-HU")} Ft
                        </span>{" "}
                        <s className="text-text/50">
                          {p.price.toLocaleString("hu-HU")} Ft
                        </s>
                      </>
                    ) : (
                      <span>{p.price.toLocaleString("hu-HU")} Ft</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr className={row}>
                <td className="sticky left-0 bg-white" />
                {activeCompare.map((p) => (
                  <td key={p.id} className={cell}>
                    <button
                      type="button"
                      disabled={p.stock < 1}
                      className="flex items-center gap-[5px] rounded-full bg-text px-[15px] py-[10px] text-white hover:bg-accent disabled:opacity-40"
                    >
                      <ShoppingCartIcon size={18} />
                      {p.stock < 1 ? "Elfogyott" : "Rendelés"}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
