"use client";
import { useState, useTransition } from "react";
import type { Category } from "@/lib/db/schema";
import { createProduct } from "./actions/productActions";

type Errors = Partial<Record<string, string[]>>;

const inputClass =
  "w-full rounded-[8px] border border-text/20 bg-white px-3 py-2.5 text-text outline-none transition-colors focus:border-accent";

const fileClass =
  "w-full cursor-pointer rounded-[8px] border border-text/20 bg-white text-[14px] text-text/70 transition-colors focus:border-accent file:mr-3 file:cursor-pointer file:border-0 file:bg-text file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-accent";

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

export default function UploadProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSuccess(false);

    startTransition(async () => {
      const res = await createProduct(formData);
      if (res?.success) {
        form.reset();
        setErrors({});
        setSuccess(true);
      } else {
        setErrors(res?.errors ?? {});
      }
    });
  }

  const err = (name: string) => errors[name]?.[0];

  return (
    <section className="w-full rounded-[10px] border border-text/20 bg-white">
      <header className="border-b border-text/10 px-6 py-4">
        <p className="text-[12px] uppercase tracking-wider text-text/50">
          Termék feltöltése
        </p>
        <h2 className="text-[20px] font-bold text-text">Új termék</h2>
      </header>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col">
        <div className="flex flex-col gap-8 px-6 py-6">
          <section className="flex flex-col gap-4">
            <h3 className="text-[14px] font-bold text-text">Alapadatok</h3>

            <Field label="Név" name="name" error={err("name")}>
              <input id="name" name="name" className={inputClass} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug (URL)" name="slug" error={err("slug")}>
                <input
                  id="slug"
                  name="slug"
                  placeholder="pl. ereszcsatorna-szogletes"
                  className={inputClass}
                />
              </Field>
              <Field
                label="Kép (JPG, PNG, WebP, max. 2 MB)"
                name="image"
                error={err("image")}
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={fileClass}
                />
              </Field>
            </div>

            <fieldset className="flex flex-col gap-1.5">
              <legend className="mb-1.5 text-[13px] font-semibold text-text/70">
                Kategória
              </legend>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <label key={c.id} className={pillClass}>
                    <input
                      type="radio"
                      name="categoryId"
                      value={c.id}
                      className="sr-only"
                    />
                    {c.name}
                  </label>
                ))}
              </div>
              {err("categoryId") && (
                <p className="text-[13px] text-red-500">{err("categoryId")}</p>
              )}
            </fieldset>

            <Field label="Leírás" name="description" error={err("description")}>
              <textarea
                id="description"
                name="description"
                rows={4}
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
                  defaultValue={0}
                  className={`${inputClass} pr-10`}
                />
              </Field>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-[14px] font-bold text-text">
              Méretek és megjelenés
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  className={`${inputClass} pr-10`}
                />
              </Field>
              <Field label="Szín" name="color" error={err("color")}>
                <input id="color" name="color" className={inputClass} />
              </Field>
            </div>
          </section>
        </div>

        <footer className="flex items-center justify-end gap-4 border-t border-text/10 px-6 py-4">
          {success && (
            <p className="text-[14px] font-semibold text-green-600">
              A termék feltöltve.
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-full bg-text px-6 py-2.5 font-semibold text-white transition-colors hover:bg-accent disabled:opacity-50"
          >
            {pending ? "Feltöltés..." : "Feltöltés"}
          </button>
        </footer>
      </form>
    </section>
  );
}
