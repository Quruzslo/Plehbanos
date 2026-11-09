import { Suspense } from "react";
import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Bádogos Somogy megye, Kaposvár - Kapcsolat",
  description:
    "Megbízható és minőségi bádogos munkák és termékek Kaposváron és környékén, 30 év tapasztalattal.",
  keywords: "Bádogos szakember Kaposvár",
};

export default function ContactPageWrapper() {
  return (
    <section data-header="light">
      <Suspense fallback={<div className="h-[60vh]" />}>
        <ContactPage />
      </Suspense>
    </section>
  );
}
