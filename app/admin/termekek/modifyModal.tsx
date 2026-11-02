"use client";
import { useEffect, useState, useTransition } from "react";
import { XIcon } from "@phosphor-icons/react";
import type { Category, Product } from "@/lib/db/schema";
import { modifyProduct } from "./actions/productActions";

type Errors = Partial<Record<string, string[]>>;

const inputClass =
  "w-full rounded-[8px] border border-text/20 bg-white px-3 py-2.5 text-text outline-none transition-colors focus:border-accent";

const pillClass =
  "cursor-pointer rounded-full border border-text/20 px-4 py-2 text-[14px] text-text transition-colors hover:border-text/40 has-[:checked]:border-text has-[:checked]:bg-text has-[:checked]:text-white";

function Field({
  label,
  name,
  suffix,
  error,
  children,
}: {
  label: string;
  name: string;
  suffix?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[13px] font-semibold text-text/70">
        {label}
      </label>
      <div className="relative">
        {children}
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-text/40">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-[13px] text-red-500">{error}</p>}
    </div>
  );
}

export default function EditProductModal({
  product,
  categories,
  onClose,
}: {
  product: Product;
  categories: Category[];
  onClose: () => void;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await modifyProduct(product.id, formData);
      if (res?.success) onClose();
      else setErrors(res?.errors ?? {});
    });
  }

  const err = (name: string) => errors[name]?.[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-product-title"
        className="flex max-h-[90dvh] w-full max-w-[720px] flex-col overflow-hidden rounded-[10px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-text/10 px-6 py-4">
          <div>
            <p className="text-[12px] uppercase tracking-wider text-text/50">
              Termék módosítása
            </p>
            <h2
              id="edit-product-title"
              className="text-[20px] font-bold text-text"
            >
              {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Bezárás"
            className="cursor-pointer rounded-full p-2 text-text/60 transition-colors hover:bg-text/5 hover:text-text"
          >
            <XIcon size={20} />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-col gap-8 overflow-y-auto px-6 py-6">
            <section className="flex flex-col gap-4">
              <h3 className="text-[14px] font-bold text-text">Alapadatok</h3>

              <Field label="Név" name="name" error={err("name")}>
                <input
                  id="name"
                  name="name"
                  defaultValue={product.name}
                  className={inputClass}
                />
              </Field>

              <Field label="Slug (URL)" name="slug" error={err("slug")}>
                <input
                  id="slug"
                  name="slug"
                  defaultValue={product.slug}
                  className={inputClass}
                />
              </Field>

              <fieldset className="flex flex-col gap-1.5">
                <legend className="mb-1.5 text-[13px] font-semibold text-text/70">
                  Kategória
                </legend>
                <div className="flex flex-wrap gap-2">
                  {/* <label className={pillClass}>
                    <input
                      type="radio"
                      name="categoryId"
                      value=""
                      defaultChecked={product.categoryId === null}
                      className="sr-only"
                    />
                    Nincs
                  </label> */}
                  {categories.map((c) => (
                    <label key={c.id} className={pillClass}>
                      <input
                        type="radio"
                        name="categoryId"
                        value={c.id}
                        defaultChecked={product.categoryId === c.id}
                        className="sr-only"
                      />
                      {c.name}
                    </label>
                  ))}
                </div>
                {err("categoryId") && (
                  <p className="text-[13px] text-red-500">
                    {err("categoryId")}
                  </p>
                )}
              </fieldset>

              <Field
                label="Leírás"
                name="description"
                error={err("description")}
              >
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={product.description}
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </section>

            <section className="flex flex-col gap-4">
              <h3 className="text-[14px] font-bold text-text">Ár és készlet</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Ár" name="price" suffix="Ft" error={err("price")}>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={product.price}
                    className={`${inputClass} pr-10`}
                  />
                </Field>
                <Field
                  label="Akciós ár"
                  name="salePrice"
                  suffix="Ft"
                  error={err("salePrice")}
                >
                  <input
                    id="salePrice"
                    name="salePrice"
                    type="number"
                    placeholder="Nincs"
                    defaultValue={product.salePrice ?? ""}
                    className={`${inputClass} pr-10`}
                  />
                </Field>
                <Field
                  label="Készlet"
                  name="stock"
                  suffix="db"
                  error={err("stock")}
                >
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    defaultValue={product.stock}
                    className={`${inputClass} pr-10`}
                  />
                </Field>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h3 className="text-[14px] font-bold text-text">
                Méretek és megjelenés
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Magasság"
                  name="heightCm"
                  suffix="cm"
                  error={err("heightCm")}
                >
                  <input
                    id="heightCm"
                    name="heightCm"
                    type="number"
                    defaultValue={product.heightCm}
                    className={`${inputClass} pr-10`}
                  />
                </Field>
                <Field
                  label="Szélesség"
                  name="widthCm"
                  suffix="cm"
                  error={err("widthCm")}
                >
                  <input
                    id="widthCm"
                    name="widthCm"
                    type="number"
                    defaultValue={product.widthCm}
                    className={`${inputClass} pr-10`}
                  />
                </Field>
                <Field
                  label="Súly"
                  name="weightKg"
                  suffix="kg"
                  error={err("weightKg")}
                >
                  <input
                    id="weightKg"
                    name="weightKg"
                    type="number"
                    step="0.01"
                    defaultValue={product.weightKg}
                    className={`${inputClass} pr-10`}
                  />
                </Field>
                <Field label="Szín" name="color" error={err("color")}>
                  <input
                    id="color"
                    name="color"
                    defaultValue={product.color}
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>
          </div>

          <footer className="flex items-center justify-end gap-3 border-t border-text/10 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full px-5 py-2.5 font-semibold text-text/70 transition-colors hover:bg-text/5 hover:text-text"
            >
              Mégse
            </button>
            <button
              type="submit"
              disabled={pending}
              className="cursor-pointer rounded-full bg-text px-6 py-2.5 font-semibold text-white transition-colors hover:bg-accent disabled:opacity-50"
            >
              {pending ? "Mentés..." : "Mentés"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
