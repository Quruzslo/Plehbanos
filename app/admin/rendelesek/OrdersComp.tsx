"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import type { Order, OrderItem } from "@/lib/db/schema";
import {
  deleteOrder,
  setOrderStatus,
  updateOrder,
  restoreItems,
} from "./orders-action";

type OrderWithItems = Order & { items: OrderItem[] };

const STATUS: Record<Order["status"], { label: string; className: string }> = {
  uj: { label: "Új", className: "bg-amber-400/25 font-semibold text-text" },
  feldolgozas: { label: "Feldolgozás", className: "bg-sky-400/20 text-text" },
  elkuldve: {
    label: "Kiszállítás alatt",
    className: "bg-violet-400/20 text-text",
  },
  teljesitve: {
    label: "Teljesítve",
    className: "bg-emerald-400/20 text-text/70",
  },
  lemondva: {
    label: "Lemondva",
    className: "bg-red-400/15 text-text/50 line-through",
  },
};

const CLOSED: Order["status"][] = ["teljesitve", "lemondva"];

const huf = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 0,
});

const tz = "Europe/Budapest";
const dayFmt = new Intl.DateTimeFormat("hu-HU", {
  month: "short",
  day: "numeric",
  timeZone: tz,
});
const timeFmt = new Intl.DateTimeFormat("hu-HU", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: tz,
});

// Tábla classok -------------------

const th = "px-4 pb-3 pt-5 font-normal whitespace-nowrap";

const td = "block min-w-0 xl:table-cell xl:px-4 xl:py-4 xl:align-top";
const muted = "text-text/55";

const link =
  "text-sm text-text/60 underline-offset-4 hover:text-text hover:underline disabled:opacity-40";
const linkDanger =
  "text-sm text-red-700/70 underline-offset-4 hover:text-red-700 hover:underline disabled:opacity-40";
const btn =
  "rounded-sm border border-text/25 px-3 py-1.5 text-sm whitespace-nowrap hover:border-text/70 disabled:opacity-40";
const btnPrimary =
  "rounded-sm bg-text px-3 py-1.5 text-sm font-medium text-background hover:bg-text/85 disabled:opacity-40";
const input =
  "w-full rounded-sm border border-text/20 bg-text/[0.03] px-3 py-2 text-sm outline-none focus:border-text/70 focus:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed";
const label = "text-sm text-text/65";

export default function OrdersComp({
  orders,
  total,
  newCount,
}: {
  orders: OrderWithItems[];
  total: number;
  newCount: number;
}) {
  const [editing, setEditing] = useState<OrderWithItems | null>(null);
  const [deleting, setDeleting] = useState<OrderWithItems | null>(null);

  return (
    <>
      <div className="flex items-baseline justify-between gap-4 border-b border-text/15 px-4 pb-4 pt-2">
        <h2 className="text-2xl font-semibold tracking-tight">Rendelések</h2>
        <p className={`text-sm tabular-nums ${muted}`}>
          {newCount > 0 && (
            <span className="font-medium text-text">{newCount} új · </span>
          )}
          {orders.length} összesen
        </p>
      </div>

      {orders.length === 0 ? (
        <p className={`px-4 py-12 text-sm ${muted}`}>Még nincs rendelés.</p>
      ) : (
        <div className="xl:overflow-x-auto">
          <table className="block w-full text-sm xl:table">
            <thead
              className={`hidden text-left text-xs xl:table-header-group ${muted}`}
            >
              <tr className="border-b border-text/15">
                <th className={th}>Rendelés</th>
                <th className={th}>Vevő</th>
                <th className={th}>Szállítás</th>
                <th className={th}>Tételek</th>
                <th className={th}>Állapot</th>
                <th className={`${th} text-right`}>Összeg</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody className="block xl:table-row-group">
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onEdit={() => setEditing(order)}
                  onDelete={() => setDeleting(order)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <EditModal order={editing} onClose={() => setEditing(null)} />
      )}
      {deleting && (
        <DeleteModal order={deleting} onClose={() => setDeleting(null)} />
      )}
    </>
  );
}

function OrderRow({
  order,
  onEdit,
  onDelete,
}: {
  order: OrderWithItems;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [pending, startTransition] = useTransition();

  const quick =
    order.status === "uj" || order.status === "feldolgozas"
      ? { label: "Kiszállítás alá", next: "elkuldve" as const }
      : order.status === "elkuldve"
        ? { label: "Visszaállítás", next: "feldolgozas" as const }
        : null;

  const closed = CLOSED.includes(order.status);
  const isCancelled = order.status === "lemondva";

  return (
    <tr
      className={`grid grid-cols-2 gap-x-6 gap-y-4 border-b border-text/10 px-4 py-5 transition-opacity last:border-0 xl:table-row xl:p-0 ${closed ? "text-text/55" : ""} ${pending ? "opacity-40" : ""}`}
    >
      <td className={`${td} order-1 whitespace-nowrap tabular-nums`}>
        <div className="font-medium">#{order.id}</div>
        <div className={muted}>
          {dayFmt.format(order.createdAt)}, {timeFmt.format(order.createdAt)}
        </div>
      </td>

      <td className={`${td} order-3 col-span-2 break-words sm:col-span-1`}>
        <div className="font-medium">{order.name}</div>
        <a
          href={`tel:${order.phone}`}
          className={`block ${muted} hover:text-text`}
        >
          {order.phone}
        </a>
        <a
          href={`mailto:${order.email}`}
          className={`block [overflow-wrap:anywhere] ${muted} hover:text-text`}
        >
          {order.email}
        </a>
      </td>

      <td className={`${td} order-4 col-span-2 sm:col-span-1`}>
        <div>
          {order.zip} {order.city}
        </div>
        <div className={muted}>{order.address}</div>
        {order.note && (
          <p className="mt-2 max-w-60 text-text/75">
            <span className={muted}>Megj.: </span>
            {order.note}
          </p>
        )}
      </td>

      <td className={`${td} order-5 col-span-2`}>
        <ul className="space-y-1">
          {order.items.map((item) => (
            <li key={item.id}>
              <span className="tabular-nums">{item.quantity} ×</span>{" "}
              {item.name}
              <span className={`ml-1.5 tabular-nums ${muted}`}>
                {huf.format(item.unitPrice)}
              </span>
            </li>
          ))}
        </ul>
      </td>

      <td className={`${td} order-6 self-center whitespace-nowrap`}>
        <span
          className={`rounded-sm px-2 py-0.5 ${STATUS[order.status].className}`}
        >
          {STATUS[order.status].label}
        </span>
      </td>

      <td
        className={`${td} order-2 whitespace-nowrap text-right font-medium tabular-nums`}
      >
        {huf.format(order.total)}
      </td>

      <td className={`${td} order-7`}>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 xl:flex-col xl:items-end xl:gap-y-1.5">
          {quick && (
            <button
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  await setOrderStatus(order.id, quick.next);
                })
              }
              className={quick.next === "elkuldve" ? btn : link}
            >
              {quick.label}
            </button>
          )}
          {!isCancelled && (
            <button onClick={onEdit} className={link}>
              Módosítás
            </button>
          )}
          <button onClick={onDelete} className={linkDanger}>
            Törlés
          </button>
        </div>
      </td>
    </tr>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current && !ref.current.open) ref.current.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-full max-w-lg rounded-sm bg-background p-0 text-text shadow-2xl backdrop:bg-black/50"
    >
      <div className="flex items-baseline justify-between gap-4 px-6 pb-2 pt-6">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <button onClick={onClose} className={link}>
          Bezárás
        </button>
      </div>
      <div className="px-6 pb-6 pt-4">{children}</div>
    </dialog>
  );
}

function Field({
  label: text,
  className = "",
  ...props
}: { label: string } & ComponentProps<"input">) {
  return (
    <label className={`grid gap-1.5 ${className}`}>
      <span className={label}>{text}</span>
      <input {...props} className={input} />
    </label>
  );
}

function EditModal({
  order,
  onClose,
}: {
  order: OrderWithItems;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const isCancelled = order.status === "lemondva";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Ha már lemondott a rendelés, egyáltalán nem engedjük módosítani
    if (isCancelled) return;

    const fd = new FormData(e.currentTarget);
    const get = (key: string) => String(fd.get(key) ?? "").trim();
    const newStatus = get("status") as Order["status"];

    startTransition(async () => {
      await updateOrder(order.id, {
        name: get("name"),
        email: get("email"),
        phone: get("phone"),
        zip: get("zip"),
        city: get("city"),
        address: get("address"),
        note: get("note") || null,
        status: newStatus,
      });

      // Csak akkor állítjuk vissza a készletet, ha most váltott "lemondva" státuszra
      if (order.status !== "lemondva" && newStatus === "lemondva") {
        await restoreItems(order.id);
      }

      onClose();
    });
  }

  return (
    <Modal title={`#${order.id} módosítása`} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-4 gap-y-4"
      >
        <Field
          label="Név"
          name="name"
          defaultValue={order.name}
          required
          disabled={isCancelled}
          className="col-span-2"
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          defaultValue={order.email}
          required
          disabled={isCancelled}
        />
        <Field
          label="Telefon"
          name="phone"
          defaultValue={order.phone}
          required
          disabled={isCancelled}
        />

        <div className="col-span-2 mt-2 border-t border-text/10" />

        <Field
          label="Irányítószám"
          name="zip"
          defaultValue={order.zip}
          required
          pattern="\d{4}"
          maxLength={4}
          disabled={isCancelled}
        />
        <Field
          label="Város"
          name="city"
          defaultValue={order.city}
          required
          disabled={isCancelled}
        />
        <Field
          label="Cím"
          name="address"
          defaultValue={order.address}
          required
          disabled={isCancelled}
          className="col-span-2"
        />

        <label className="col-span-2 grid gap-1.5">
          <span className={label}>Megjegyzés</span>
          <textarea
            name="note"
            defaultValue={order.note ?? ""}
            rows={3}
            disabled={isCancelled}
            className={input}
          />
        </label>

        <label className="col-span-2 grid gap-1.5">
          <span className={label}>Állapot</span>
          <select
            name="status"
            defaultValue={order.status}
            disabled={isCancelled}
            className={input}
          >
            {Object.entries(STATUS).map(([value, s]) => (
              <option key={value} value={value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <div className="col-span-2 mt-2 flex items-center justify-end gap-5">
          <button type="button" onClick={onClose} className={link}>
            Mégse
          </button>
          <button disabled={pending || isCancelled} className={btnPrimary}>
            {pending ? "Mentés…" : "Mentés"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function DeleteModal({
  order,
  onClose,
}: {
  order: OrderWithItems;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Modal title="Törlöd a rendelést?" onClose={onClose}>
      <p>
        <span className="font-medium">#{order.id}</span> · {order.name} ·{" "}
        <span className="tabular-nums">{huf.format(order.total)}</span>
      </p>
      <p className={`mt-2 text-sm ${muted}`}>
        A tételeivel együtt törlődik, és nem lehet visszaállítani.
      </p>
      <div className="mt-6 flex items-center justify-end gap-5">
        <button onClick={onClose} className={link}>
          Mégse
        </button>
        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await deleteOrder(order.id);
              onClose();
            })
          }
          className="rounded-sm bg-red-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-40"
        >
          {pending ? "Törlés…" : "Törlés"}
        </button>
      </div>
    </Modal>
  );
}
