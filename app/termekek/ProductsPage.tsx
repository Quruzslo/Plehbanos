"use client";
import { CheckFatIcon } from "@phosphor-icons/react";
import BreadCrumbs from "@/lib/ui/BreadCrumbs";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import ProductCarousel from "./ProductCarousel";
import ProductCard from "./ProductCard";
import {
  getFirstProducts,
  getProducts,
  type Category,
  type Product,
} from "./products";
import Categories from "./Categories";
import { useState } from "react";
import Compare from "./Compare";

const CallToActionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const benefits = [
  "Nem tucat termék",
  "Minőségi anyagokból",
  "Időtálló és egyedi",
];

const newProducts = await getFirstProducts();

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const products = getProducts(activeCategory);
  const [activeCompare, setActiveCompare] = useState<Product[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <section
      data-header="light"
      className="flex flex-col w-full pt-[120px] lg:pt-[150px] bg-white "
    >
      {compareOpen && activeCompare.length > 0 && (
        <Compare
          activeCompare={activeCompare}
          setActiveCompare={setActiveCompare}
          onClose={() => setCompareOpen(false)}
        />
      )}
      <div className="flex flex-col lg:flex-row w-[90%] max-w-[2560px] mx-auto  items-center">
        <div className="flex flex-col w-full lg:w-1/2">
          <BreadCrumbs items={[{ label: "Termékek" }]}></BreadCrumbs>
          <h1 className="text-[35px] font-black">
            Kézműves dekorációs termékek
          </h1>

          <p className="text-[20px]">
            Kézműves bádogos termékek, családiházakra és kertekbe
          </p>

          <ul className="flex flex-col  justify-center gap-[5px] w-fit mr-auto mt-[20px]">
            {benefits.map((elem) => (
              <li key={elem} className="flex flex-row nowrap gap-3">
                <div className="flex flex-row items-center justify-center relative  overflow-hidden rounded-full w-[30px] h-[30px]">
                  <CheckFatIcon size={20} className="fill-accent" />
                </div>
                <p>{elem}</p>
              </li>
            ))}

            <li className="flex flex-row nowrap gap-3 relative w-fit items-center justify-center ">
              <div className="flex flex-row items-center justify-center relative  overflow-hidden rounded-full w-[30px] h-[30px]">
                <span className="absolute top-0 left-0 w-full h-1/3 bg-red-400" />
                <span className="absolute top-2/3 left-0 w-full h-1/3 bg-white" />
                <span className="absolute bottom-0 left-0 w-full h-1/3 bg-green-400" />
              </div>

              <p className="z-10 font-bold">Made in Hungary</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <ProductCarousel
            products={newProducts}
            activeCompare={activeCompare}
            setActiveCompare={setActiveCompare}
            setCompareOpen={setCompareOpen}
          />
        </div>
      </div>
      <motion.div
        variants={CallToActionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col lg:flex-row my-[50px] bg-linear-45 from-transparent from-50% to-accent/70 to-[calc(50%+1px)] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)] text-text font-bold p-[15px] rounded-[10px] w-[90%] max-w-[2560px] mx-auto items-center justify-center relative"
      >
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-row">
            <p className="text-[20px] lg:text-[30px] font-bold ">
              Van egy ötleted{" "}
              <span className="text-[35px] lg:text-[45px] font-black text-white bg-text p-[5px] h-fit rounded-md">
                ?
              </span>{" "}
              Akár ajándékba adnád{" "}
              <span className="text-[35px] lg:text-[45px] font-black text-white bg-text p-[5px] h-fit rounded-md">
                ?
              </span>
            </p>
          </div>
          <p>
            Csak írd meg az elképzeléseidet és elkészítjük neked az egyedi
            termékedet!
          </p>
          <Link
            href="/kapcsolat"
            className="flex flex-row gap-[5px] bg-accent w-fit p-[10px] text-white rounded-md mt-[25px]"
          >
            Van egy ötletem
          </Link>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 relative">
          <Image
            alt="Egyedi bádogos termékek, kézzel készült díszek"
            width={350}
            height={350}
            src="/images/blob-bg.svg"
            className=" object-cover ml-auto"
          ></Image>
        </div>
      </motion.div>

      <div className="w-[90%] mx-auto flex flex-col">
        <h2 className="text-[35px] font-black">Termékeink</h2>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-1/3 py-[25px]  lg:px-[10px] justify-start ">
            <Categories
              category={activeCategory}
              setCategory={setActiveCategory}
            />
          </div>
          <div className="flex flex-col w-full lg:w-2/3 lg:px-[10px] py-[25px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
              {products.map((elem) => (
                <ProductCard
                  key={elem.id}
                  item={elem}
                  activeCompare={activeCompare}
                  setActiveCompare={setActiveCompare}
                  setCompareOpen={setCompareOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
