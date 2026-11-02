"use client";
import { useState, useTransition } from "react";
import { PencilSimpleIcon } from "@phosphor-icons/react";
import type { Category } from "@/lib/db/schema";
import { createCategory, updateCategory } from "./actions/categoryActions";

type Errors = Partial<Record<string, string[]>>;

const inputClass =
  "w-full rounded-[8px] border border-text/20 bg-white px-3 py-2.5 text-text outline-none transition-colors focus:border-accent";

const primaryBtn =
  "cursor-pointer rounded-full bg-text px-5 py-2.5 font-semibold text-white transition-colors hover:bg-accent disabled:opacity-50";

const ghostBtn =
  "cursor-pointer rounded-full px-4 py-2.5 font-semibold text-text/70 transition-colors hover:bg-text/5 hover:text-text";

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="mt-1 text-[13px] text-red-500">{message}</p>
  ) : null;
}

function CreateCategoryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createCategory(formData);
      if (res?.success) {
        form.reset();
        setErrors({});
      } else {
        setErrors(res?.errors ?? {});
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <input
          name="name"
          placeholder="Új kategória neve"
          aria-label="Név"
          className={inputClass}
        />
        <FieldError message={errors.name?.[0]} />
      </div>
      <div className="flex-1">
        <input
          name="slug"
          placeholder="Slug (üresen hagyva a névből készül)"
          aria-label="Slug"
          className={inputClass}
        />
        <FieldError message={errors.slug?.[0]} />
      </div>
      <button type="submit" disabled={pending} className={primaryBtn}>
        {pending ? "Hozzáadás..." : "Hozzáadás"}
      </button>
    </form>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateCategory(category.id, formData);
      if (res?.success) {
        setEditing(false);
        setErrors({});
      } else {
        setErrors(res?.errors ?? {});
      }
    });
  }

  if (!editing) {
    return (
      <li className="flex items-center gap-4 px-6 py-3">
        <div className="flex flex-col">
          <span className="font-semibold text-text">{category.name}</span>
          <span className="text-[13px] text-text/50">/{category.slug}</span>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="ml-auto flex cursor-pointer items-center gap-[6px] rounded-full border border-text/20 px-4 py-2 text-[14px] text-text transition-colors hover:bg-accent hover:text-white"
        >
          <PencilSimpleIcon size={16} />
          Módosítás
        </button>
      </li>
    );
  }

  return (
    <li className="px-6 py-3">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
      >
        <div className="flex-1">
          <input
            name="name"
            defaultValue={category.name}
            aria-label="Név"
            className={inputClass}
          />
          <FieldError message={errors.name?.[0]} />
        </div>
        <div className="flex-1">
          <input
            name="slug"
            defaultValue={category.slug}
            aria-label="Slug"
            className={inputClass}
          />
          <FieldError message={errors.slug?.[0]} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setErrors({});
            }}
            className={ghostBtn}
          >
            Mégse
          </button>
          <button type="submit" disabled={pending} className={primaryBtn}>
            {pending ? "Mentés..." : "Mentés"}
          </button>
        </div>
      </form>
    </li>
  );
}

export default function CategoryManager({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="w-full rounded-[10px] border border-text/20 bg-white">
      <header className="flex items-end justify-between border-b border-text/10 px-6 py-4">
        <div>
          <p className="text-[12px] uppercase tracking-wider text-text/50">
            Kategóriák kezelése
          </p>
          <h2 className="text-[20px] font-bold text-text">Kategóriák</h2>
        </div>
        <span className="text-[13px] text-text/50">{categories.length} db</span>
      </header>

      <CreateCategoryForm />

      <ul className="divide-y divide-text/10 border-t border-text/10">
        {categories.length === 0 ? (
          <li className="px-6 py-6 text-text/50">Még nincs kategória.</li>
        ) : (
          categories.map((c) => <CategoryRow key={c.id} category={c} />)
        )}
      </ul>
    </section>
  );
}
