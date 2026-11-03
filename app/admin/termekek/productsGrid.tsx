// app/admin/termekek/components/ProductsGrid.tsx
"use client";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import {
  MagnifyingGlassPlusIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import type { Category, Product } from "@/lib/db/schema";
import EditProductModal from "./modifyModal";
import UploadProductForm from "./uploadModal";
import CategoryManager from "./categoryManager";
import { deleteProduct } from "./actions/productActions";

const formatHuf = (value: number) => `${value.toLocaleString("hu-HU")} Ft`;

// Törlés modal ----------------------
const CONFIRM_TEXT = "TÖRLÖM";

function DeleteModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();
  const confirmed = value === CONFIRM_TEXT;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteProduct(product.id);
      if (res?.success) onClose();
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="flex w-full max-w-[440px] flex-col gap-5 rounded-[10px] bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <h2 id="delete-title" className="text-[20px] font-bold text-text">
            Termék törlése
          </h2>
          <p className="text-[14px] text-text/70">
            A(z) <span className="font-semibold text-text">{product.name}</span>{" "}
            és a képe véglegesen törlődik. Ez nem vonható vissza.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="delete-confirm"
            className="text-[13px] font-semibold text-text/70"
          >
            A megerősítéshez írd be:{" "}
            <span className="text-red-500">{CONFIRM_TEXT}</span>
          </label>
          <input
            id="delete-confirm"
            autoFocus
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-[8px] border border-text/20 bg-white px-3 py-2.5 text-text outline-none transition-colors focus:border-red-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full px-5 py-2.5 font-semibold text-text/70 transition-colors hover:bg-text/5 hover:text-text"
          >
            Mégse
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!confirmed || pending}
            className="cursor-pointer rounded-full bg-red-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "Törlés..." : "Végleges törlés"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Termékkártyák rész-----------------------

export default function ProductsGrid({
  items,
  categories,
}: {
  items: Product[];
  categories: Category[];
}) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  return (
    <section className="flex flex-col gap-[50px] w-full py-[50px]">
      <div className="flex flex-col lg:flex-row gap-[10px]">
        <UploadProductForm categories={categories}></UploadProductForm>
        <CategoryManager categories={categories} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] w-full">
        {items.map((item) => (
          <div
            key={item.id}
            className="shrink-0 h-full w-full relative flex flex-col transition duration-400 hover:shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-[10px] border-1 border-text/20"
          >
            <div className="relative w-full max-w-[200px] aspect-square mx-auto mt-[10px] overflow-hidden">
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

              {item.stock >= 1 ? (
                <p className="bg-green-600 text-green-100 w-fit px-[5px] rounded-[7px]">
                  Raktáron {item.stock} db
                </p>
              ) : (
                <p className="bg-stone-400 text-red-100 w-fit px-[5px] rounded-[7px]">
                  Elfogyott
                </p>
              )}

              <div className="text-text/50 font-bold">
                {item.salePrice ? (
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-red-500">
                      {formatHuf(item.salePrice)}
                    </span>
                    <s className="opacity-50 text-[12px]">
                      {formatHuf(item.price)}
                    </s>
                  </div>
                ) : (
                  formatHuf(item.price)
                )}
              </div>

              <div className="flex flex-row gap-[5px] items-center mt-auto pt-[10px]">
                <button
                  type="button"
                  title="Módosítás"
                  onClick={() => setEditing(item)}
                  className="cursor-pointer flex items-center gap-[6px] rounded-full bg-text text-white text-[14px] px-[14px] py-[8px] hover:bg-accent"
                >
                  <PencilSimpleIcon size={16} />
                  Módosítás
                </button>

                <button
                  type="button"
                  title="Gyors nézet"
                  aria-label="Gyors nézet"
                  className="cursor-pointer ml-auto rounded-full text-text border-1 border-text/20 p-[10px] hover:bg-accent hover:text-white"
                >
                  <MagnifyingGlassPlusIcon size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => setDeleting(item)}
                  title="Törlés"
                  aria-label="Törlés"
                  className="cursor-pointer rounded-full text-text border-1 border-text/20 p-[10px] hover:bg-red-500 hover:border-red-500 hover:text-white"
                >
                  <TrashIcon size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <EditProductModal
          key={editing.id}
          product={editing}
          categories={categories}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <DeleteModal
          key={deleting.id}
          product={deleting}
          onClose={() => setDeleting(null)}
        />
      )}
    </section>
  );
}
