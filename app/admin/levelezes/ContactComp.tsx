"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import type { Contact } from "@/lib/db/schema";
import { deleteContact } from "./contacts-action";

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

const th = "px-4 pb-3 pt-5 font-normal whitespace-nowrap";
const td = "block min-w-0 xl:table-cell xl:px-4 xl:py-4 xl:align-top";
const muted = "text-text/55";

const link =
  "text-sm text-text/60 underline-offset-4 hover:text-text hover:underline disabled:opacity-40";
const linkDanger =
  "text-sm text-red-700/70 underline-offset-4 hover:text-red-700 hover:underline disabled:opacity-40";

export default function ContactsComp({
  contacts,
  total,
}: {
  contacts: Contact[];
  total: number;
}) {
  const [deleting, setDeleting] = useState<Contact | null>(null);

  return (
    <>
      <div className="flex items-baseline justify-between gap-4 border-b border-text/15 px-4 pb-4 pt-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Beérkezett üzenetek
        </h2>
        <p className={`text-sm tabular-nums ${muted}`}>{total} összesen</p>
      </div>

      {contacts.length === 0 ? (
        <p className={`px-4 py-12 text-sm ${muted}`}>Még nincs üzenet.</p>
      ) : (
        <div className="xl:overflow-x-auto">
          <table className="block w-full text-sm xl:table">
            <thead
              className={`hidden text-left text-xs xl:table-header-group ${muted}`}
            >
              <tr className="border-b border-text/15">
                <th className={th}>ID / Dátum</th>
                <th className={th}>Küldő</th>
                <th className={th}>Elérhetőség</th>
                <th className={th}>Üzenet</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody className="block xl:table-row-group">
              {contacts.map((contact) => (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  onDelete={() => setDeleting(contact)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleting && (
        <DeleteModal contact={deleting} onClose={() => setDeleting(null)} />
      )}
    </>
  );
}

function ContactRow({
  contact,
  onDelete,
}: {
  contact: Contact;
  onDelete: () => void;
}) {
  const [pending] = useTransition();

  return (
    <tr
      className={`grid grid-cols-2 gap-x-6 gap-y-4 border-b border-text/10 px-4 py-5 transition-opacity last:border-0 xl:table-row xl:p-0 ${
        pending ? "opacity-40" : ""
      }`}
    >
      <td className={`${td} order-1 whitespace-nowrap tabular-nums`}>
        <div className="font-medium">#{contact.id}</div>
        <div className={muted}>
          {dayFmt.format(contact.createdAt)},{" "}
          {timeFmt.format(contact.createdAt)}
        </div>
      </td>

      <td className={`${td} order-2 col-span-2 break-words sm:col-span-1`}>
        <div className="font-medium">{contact.name}</div>
      </td>

      <td className={`${td} order-3 col-span-2 break-words sm:col-span-1`}>
        <a
          href={`tel:${contact.phone}`}
          className={`block ${muted} hover:text-text`}
        >
          {contact.phone}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className={`block [overflow-wrap:anywhere] ${muted} hover:text-text`}
        >
          {contact.email}
        </a>
      </td>

      <td className={`${td} order-4 col-span-2 xl:max-w-md`}>
        <p className="whitespace-pre-wrap text-text/85">{contact.message}</p>
      </td>

      <td className={`${td} order-5 text-right`}>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 xl:flex-col xl:items-end xl:gap-y-1.5">
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

function DeleteModal({
  contact,
  onClose,
}: {
  contact: Contact;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Modal title="Törlöd az üzenetet?" onClose={onClose}>
      <p>
        <span className="font-medium">#{contact.id}</span> · {contact.name}
      </p>
      <p className={`mt-2 text-sm ${muted}`}>
        A beérkezett üzenet véglegesen törlődik, és nem lehet visszaállítani.
      </p>
      <div className="mt-6 flex items-center justify-end gap-5">
        <button onClick={onClose} className={link}>
          Mégse
        </button>
        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await deleteContact(contact.id);
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
