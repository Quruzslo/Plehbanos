"use client";
import { useContext, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/db/schema";
import {
  CartStateContext,
  CartActionsContext,
} from "@/lib/context/cartContext";
import { createOrder } from "./orderActions";

export type CartItem = Product & { quantity: number };

type Errors = Partial<Record<string, string[]>>;

const inputClass =
  "w-full rounded-[8px] border border-text/20 bg-white px-3 py-2.5 text-text outline-none transition-colors focus:border-accent";

const labelClass = "mb-1 block text-[13px] font-semibold text-text/70";

const unitPrice = (p: Product) => p.salePrice ?? p.price;

const huf = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 0,
});

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="mt-1 text-[13px] text-red-500">{message}</p>
  ) : null;
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className={inputClass}
      />
      <FieldError message={error} />
    </div>
  );
}

export default function Checkout() {
  const items = useContext(CartStateContext) ?? [];
  const { clearCart } = useContext(CartActionsContext);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const total = items.reduce(
    (sum, item) => sum + unitPrice(item) * item.quantity,
    0,
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cart = items.map((i) => ({ id: i.id, quantity: i.quantity }));

    setFormError(null);
    startTransition(async () => {
      const res = await createOrder(formData, cart);
      if (res?.success) {
        setErrors({});
        setDone(true);
        clearCart();
      } else {
        setErrors(res?.errors ?? {});
        setFormError(res?.error ?? null);
      }
    });
  }

  if (done) {
    return (
      <section
        data-header="light"
        className="flex w-full flex-col pt-[120px] lg:pt-[150px] min-h-[100vh]"
      >
        <div className="mx-auto flex w-[90%] max-w-[560px] flex-col gap-3 py-16 text-center">
          <h1 className="text-[28px] font-bold text-text">
            Köszönjük a rendelést!
          </h1>
          <p className="text-text/70">
            Hamarosan felvesszük veled a kapcsolatot. A csomagot futár hozza, a
            végösszeget átvételkor kell kifizetni.
          </p>
          <Link href="/" className="mt-4 font-semibold text-accent underline">
            Vissza a főoldalra
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section
        data-header="light"
        className="flex w-full flex-col pt-[120px] lg:pt-[150px]"
      >
        <div className="mx-auto flex w-[90%] flex-col gap-3 py-16 text-center">
          <h1 className="text-[24px] font-bold text-text">Üres a kosarad</h1>
          <Link href="/" className="font-semibold text-accent underline">
            Vissza a termékekhez
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      data-header="light"
      className="flex w-full flex-col pt-[120px] lg:pt-[150px]"
    >
      <div className="mx-auto flex w-[90%] flex-col gap-10 pb-16 lg:flex-row">
        {/* Adatok */}
        <div className="w-full lg:w-1/2">
          <h1 className="mb-6 text-[30px] font-bold text-text">Pénztár</h1>

          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-8"
          >
            <fieldset className="flex flex-col gap-4">
              <legend className="mb-3 text-[12px] uppercase tracking-wider text-text/50">
                Kapcsolat
              </legend>
              <Field
                name="name"
                label="Név"
                autoComplete="name"
                error={errors.name?.[0]}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="email"
                  label="E-mail"
                  type="email"
                  autoComplete="email"
                  error={errors.email?.[0]}
                />
                <Field
                  name="phone"
                  label="Telefonszám"
                  type="tel"
                  autoComplete="tel"
                  error={errors.phone?.[0]}
                />
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-3 text-[12px] uppercase tracking-wider text-text/50">
                Szállítási cím
              </legend>
              <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                <Field
                  name="zip"
                  label="Irányítószám"
                  autoComplete="postal-code"
                  error={errors.zip?.[0]}
                />
                <Field
                  name="city"
                  label="Település"
                  autoComplete="address-level2"
                  error={errors.city?.[0]}
                />
              </div>
              <Field
                name="address"
                label="Utca, házszám"
                autoComplete="street-address"
                error={errors.address?.[0]}
              />
              <div>
                <label htmlFor="note" className={labelClass}>
                  Megjegyzés (nem kötelező)
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  className={inputClass}
                />
                <FieldError message={errors.note?.[0]} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-[12px] uppercase tracking-wider text-text/50">
                Fizetés
              </legend>
              <div className="rounded-[8px] border border-text/20 px-4 py-3">
                <p className="font-semibold text-text">Utánvét</p>
                <p className="text-[14px] text-text/60">
                  A végösszeget a futárnak kell kifizetni átvételkor.
                </p>
              </div>
            </fieldset>
          </form>
        </div>

        {/* Összesítő */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-[10px] border border-text/20 bg-white lg:sticky lg:top-[120px]">
            <header className="border-b border-text/10 px-6 py-4">
              <p className="text-[30px] font-bold text-text">
                Rendelés összesítő
              </p>
            </header>

            <ul className="divide-y divide-text/10">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-6 py-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-[8px] bg-text/5">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-text">{item.name}</span>
                    <span className="text-[13px] text-text/50">
                      {item.quantity} × {huf.format(unitPrice(item))}
                    </span>
                  </div>
                  <span className="ml-auto font-semibold text-text">
                    {huf.format(unitPrice(item) * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-text/10 px-6 py-4">
              <span className="font-semibold text-text">Összesen</span>
              <span className="text-[20px] font-bold text-text">
                {huf.format(total)}
              </span>
            </div>

            <div className="px-6 pb-6">
              <FieldError message={formError ?? undefined} />
              <button
                type="submit"
                form="checkout-form"
                disabled={pending}
                className="mt-2 w-full cursor-pointer rounded-full bg-text px-5 py-3 font-semibold text-white transition-colors hover:bg-accent disabled:opacity-50"
              >
                {pending ? "Rendelés küldése..." : "Megrendelés utánvéttel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
