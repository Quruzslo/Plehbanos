import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FrontProducts from "../components/FrontPageProducts";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero></Hero>
      <Services></Services>
      <FrontProducts></FrontProducts>
    </main>
  );
}
