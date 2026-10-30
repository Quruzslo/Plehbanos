"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import {
  CartStateContext,
  CartActionsContext,
} from "@/src/context/cartContext";

export default function CartModal() {
  const cartItems = useContext(CartStateContext)!;
  const { addItem, decreaseItem, removeItem } = useContext(CartActionsContext)!;
  const [open, setOpen] = useState(false);

  // ha kiürül a kosár, záródjon be, hogy a következő hozzáadáskor ne nyíljon ki magától
  if (cartItems.length === 0 && open) setOpen(false);

  if (cartItems.length === 0) return null;

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const total = cartItems.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0,
  );

  return (
    <div
      className={`fixed top-1/2 right-[15px] -translate-y-1/2 z-[11] flex flex-row items-center gap-[15px] transition-transform duration-300 ease-out ${
        open ? "translate-x-0" : "translate-x-[calc(100%_-_54px)]"
      }`}
    >
      <button
        type="button"
        title="Kosár"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative shrink-0 cursor-pointer rounded-full bg-text text-white p-[15px] shadow-md hover:bg-accent"
      >
        <ShoppingCartIcon size={24} />
        <span className="absolute -top-[5px] -right-[5px] bg-amber-400 text-text text-[12px] font-bold rounded-full w-[22px] h-[22px] flex items-center justify-center">
          {totalQuantity}
        </span>
      </button>

      <div
        inert={!open}
        className={`w-[min(350px,calc(100vw_-_100px))] max-h-[80vh] overflow-y-auto flex flex-col gap-[10px] p-[10px] bg-white rounded-md shadow-md transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {cartItems.map((i) => (
          <div key={i.id} className="flex flex-row items-center gap-[10px]">
            <Image width={50} height={50} src={i.img} alt={i.name} />

            <div className="flex flex-col">
              <h3 className="text-[14px] font-bold">{i.name}</h3>
              <span className="text-[13px] text-text/50">
                {((i.salePrice ?? i.price) * i.quantity).toLocaleString(
                  "hu-HU",
                )}{" "}
                Ft
              </span>
            </div>

            <div className="flex flex-row items-center gap-[5px] ml-auto">
              <button
                type="button"
                title="Csökkentés"
                onClick={() => decreaseItem(i.id)}
                className="cursor-pointer p-[5px] rounded-full border-1 border-text/20 hover:bg-accent hover:text-white"
              >
                <MinusIcon size={12} />
              </button>

              <span className="w-[20px] text-center">{i.quantity}</span>

              <button
                type="button"
                title="Növelés"
                onClick={() => addItem(i)}
                disabled={i.quantity >= i.stock}
                className="cursor-pointer p-[5px] rounded-full border-1 border-text/20 enabled:hover:bg-accent enabled:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <PlusIcon size={12} />
              </button>

              <button
                type="button"
                title="Törlés"
                onClick={() => removeItem(i.id)}
                className="cursor-pointer p-[5px] text-red-500 hover:text-red-700"
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-row justify-between pt-[10px] border-t-1 border-text/20 font-bold">
          <span>Összesen</span>
          <span>{total.toLocaleString("hu-HU")} Ft</span>
        </div>
      </div>
    </div>
  );
}
