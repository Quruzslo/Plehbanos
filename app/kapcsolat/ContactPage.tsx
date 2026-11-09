"use client";
import { useState, useTransition } from "react";
import BreadCrumbs from "@/lib/ui/BreadCrumbs";
import { Phone, Envelope, MapPin, ShieldCheck } from "@phosphor-icons/react";
import { sendEmail } from "./email-actions";

export default function ContactPage() {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    success: boolean;
    text: string;
  } | null>(null);

  // Mezőspecifikus hibaüzenetek tárolása
  const [errors, setErrors] = useState<{
    name?: string[];
    email?: string[];
    tel?: string[];
    message?: string[];
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusMessage(null);
    setErrors(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await sendEmail(null, formData);

      if (result.success) {
        setStatusMessage({
          success: true,
          text: "Üzenetét sikeresen elküldtük! Hamarosan felvesszük Önnel a kapcsolatot.",
        });
        setErrors(null);
        (e.target as HTMLFormElement).reset();
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        if (result.generalError) {
          setStatusMessage({
            success: false,
            text: result.generalError,
          });
        }
      }
    });
  }

  return (
    <section
      data-header="light"
      className="w-full flex flex-col min-h-screen pt-[140px] lg:pt-[180px] pb-20 bg-gradient-to-b from-gray-50/50 to-white"
    >
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Bal oldal: Szöveges tartalom és elérhetőségek */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <BreadCrumbs items={[{ label: "Kapcsolat", href: "/kapcsolat" }]} />

          <div className="space-y-4">
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              Bádogos munkák <span className="text-accent">Kaposvár</span> és
              környékén
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Több, mint{" "}
              <span className="text-accent font-bold text-[25px]">30 év</span>{" "}
              tapasztalattal vállalunk bádogos munkákat Somogy megyében, első
              sorban Kaposváron és vonzáskörzetében.
            </p>
          </div>

          {/* Elérhetőségek kártyák */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Phone size={22} weight="bold" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Telefon</p>
                <p className="text-base font-semibold text-gray-900">
                  +36 (30) 000-0000
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white  ">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Envelope size={22} weight="bold" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">E-mail</p>
                <p className="text-base font-semibold text-gray-900">
                  info@pelda.hu
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white  ">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <MapPin size={22} weight="bold" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Helyszín</p>
                <p className="text-base font-semibold text-gray-900">
                  Kaposvár és Somogy vm.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white  ">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <ShieldCheck size={22} weight="bold" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Garancia</p>
                <p className="text-base font-semibold text-gray-900">
                  Minőségi munkavégzés
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobb oldal */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-[10px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)] border border-gray-100 p-8 lg:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Kérjen árajánlatot
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Töltse ki az alábbi űrlapot, és hamarosan felvesszük Önnel a
                kapcsolatot.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium ${
                    statusMessage.success
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Az Ön neve
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Pl. Kovács János"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    errors?.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-accent/20 focus:border-accent"
                  }`}
                />
                {errors?.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefonszám
                  </label>
                  <input
                    type="text"
                    name="tel"
                    placeholder="+36 30 123 4567"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                      errors?.tel
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:ring-accent/20 focus:border-accent"
                    }`}
                  />
                  {errors?.tel && (
                    <p className="text-red-500 text-xs mt-1">{errors.tel[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail cím
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="pelda@email.hu"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                      errors?.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:ring-accent/20 focus:border-accent"
                    }`}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Üzenet / Munkálatok leírása
                </label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Írja le röviden, milyen bádogos munkában tudunk segíteni..."
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors?.message
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-accent/20 focus:border-accent"
                  }`}
                />
                {errors?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 rounded-xl bg-accent text-white font-semibold transition-all shadow-md hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                {isPending ? "Küldés folyamatban..." : "Üzenet küldése"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
