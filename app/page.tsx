import { Suspense } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FrontProducts from "../components/FrontPageProducts";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Services />
      <Suspense fallback={null}>
        <FrontProducts />
      </Suspense>
    </main>
  );
}
