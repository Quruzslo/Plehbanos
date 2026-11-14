"use client";
import Image from "next/image";
import Link from "next/link";
import navItems from "@/lib/datas/navItems";
import { useState, useEffect, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "motion/react";

import {
  PaperPlaneTiltIcon,
  PhoneOutgoingIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  PackageIcon,
} from "@phosphor-icons/react";
import {
  CartStateContext,
  CartActionsContext,
} from "@/lib/context/cartContext";
import type { Product } from "@/lib/db/schema";
import { getLatestProducts } from "@/lib/db/getLatestProducts";
import MainButton from "../lib/ui/MainButton";

type Side = "left" | "right";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const panel: Variants = {
  hidden: {
    x: "100%",
    transition: {
      duration: 0.6,
      ease,
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
      ease,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuItem: Variants = {
  hidden: { x: 80, opacity: 0, transition: { duration: 0.2, ease } },
  visible: { x: 0, opacity: 1, transition: { duration: 0.2, ease } },
};

function CartDropdown({
  isMobile = false,
  latestProducts = [],
}: {
  isMobile?: boolean;
  latestProducts?: Product[];
}) {
  const cartItems = useContext(CartStateContext) ?? [];
  const { addItem, decreaseItem, removeItem } = useContext(CartActionsContext)!;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ÚJ: Kliens-oldali betöltés figyelése
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const total = cartItems.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0,
  );
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        title="Kosár"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`relative shrink-0 cursor-pointer z-10 rounded-full bg-text text-white transition-colors duration-200 hover:bg-accent flex items-center justify-center ${
          isMobile ? "w-[50px] h-[50px] px-[10px] py-[5px]" : "p-[13px] "
        }`}
      >
        <ShoppingCartIcon size={isMobile ? 25 : 24} />
        {isMounted && totalQuantity > 0 && (
          <span className="absolute -top-[0px] -right-[0px] bg-amber-400 text-text text-[12px] font-bold rounded-full min-w-[22px] h-[22px] px-1 flex items-center justify-center shadow-sm">
            {totalQuantity}
          </span>
        )}
      </button>
      <div
        inert={!open}
        className={`fixed lg:absolute overflow-hidden rounded-[10px] ${
          isMobile
            ? "left-[5%] right-[5%] w-[90%]"
            : "right-0 w-[min(450px,calc(100vw_-_32px))]"
        } top-[85px] lg:top-[calc(100%_+_12px)] z-[200] max-w-[2560px] lg:max-w-none grid shadow-[0_12px_35px_-5px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100 "
            : "grid-rows-[0fr] opacity-100 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden ">
          <div className="flex flex-col gap-[12px] p-[20px] bg-white text-text border border-text/10 max-h-[calc(100vh_-_100px)] overflow-y-auto">
            {!isMounted || cartItems.length === 0 ? (
              <div className="flex flex-col">
                <div className="w-[46px] h-[46px] rounded-xl bg-text/5 flex items-center justify-center mb-4">
                  <ShoppingBagIcon size={22} className="text-text" />
                </div>

                <h3 className="text-[18px] font-bold text-text mb-1.5">
                  A kosarad üres
                </h3>
                <p className="text-[13px] leading-relaxed text-text/60 mb-5">
                  Kézműves bádog díszeink egyedi darabok. Nézz szét a legújabb
                  munkáink között, és tedd a kosárba a kedvencedet!
                </p>

                {latestProducts.length > 0 && (
                  <>
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-text/50 mb-3">
                      A LEGÚJABB DARABOK
                    </span>

                    <div className="flex flex-col gap-3 mb-5">
                      {latestProducts.map((item) => (
                        <Link
                          key={item.id}
                          href={`/termekek/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="group flex flex-row items-center gap-3.5 p-1.5 -mx-1.5 rounded-xl hover:bg-text/[0.04] transition-colors"
                        >
                          <Image
                            width={52}
                            height={52}
                            src={item.img}
                            alt={item.name}
                            className="w-[52px] h-[52px] rounded-lg object-cover shrink-0 bg-text/5 border border-text/5"
                          />
                          <div className="flex flex-col min-w-0">
                            <h4 className="text-[14px] font-semibold text-text truncate group-hover:text-accent transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-[13px] text-text/60 tabular-nums mt-0.5">
                              {(item.salePrice ?? item.price).toLocaleString(
                                "hu-HU",
                              )}{" "}
                              Ft
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {/* Összes termék gomb */}
                <Link
                  href="/termekek"
                  onClick={() => setOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-text text-white text-[13px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                >
                  <span>ÖSSZES TERMÉK</span>
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              </div>
            ) : (
              <>
                <div className="max-h-[55vh] overflow-y-auto flex flex-col gap-[12px] pr-1">
                  {cartItems.map((i) => (
                    <div
                      key={i.id}
                      className="flex flex-row items-center gap-[10px] pb-[10px] border-b border-text/10 last:border-b-0 last:pb-0"
                    >
                      <Image
                        width={50}
                        height={50}
                        src={i.img}
                        alt={i.name}
                        className="rounded-md object-cover shrink-0 bg-text/5"
                      />

                      <div className="flex flex-col min-w-0">
                        <h3 className="text-[14px] font-bold truncate">
                          {i.name}
                        </h3>
                        <span className="text-[13px] text-text/50 tabular-nums">
                          {(
                            (i.salePrice ?? i.price) * i.quantity
                          ).toLocaleString("hu-HU")}{" "}
                          Ft
                        </span>
                      </div>

                      <div className="flex flex-row items-center gap-[5px] ml-auto shrink-0">
                        <button
                          type="button"
                          title="Csökkentés"
                          onClick={() => decreaseItem(i.id)}
                          className="cursor-pointer p-[5px] rounded-full border border-text/20 hover:bg-accent hover:text-white transition-colors"
                        >
                          <MinusIcon size={12} />
                        </button>

                        <span className="w-[22px] text-center text-sm font-medium tabular-nums">
                          {i.quantity}
                        </span>

                        <button
                          type="button"
                          title="Növelés"
                          onClick={() => addItem(i)}
                          disabled={i.quantity >= i.stock}
                          className="cursor-pointer p-[5px] rounded-full border border-text/20 enabled:hover:bg-accent enabled:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        >
                          <PlusIcon size={12} />
                        </button>

                        <button
                          type="button"
                          title="Törlés"
                          onClick={() => removeItem(i.id)}
                          className="cursor-pointer p-[5px] text-red-500 hover:text-red-700 transition-colors"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row justify-between pt-[12px] border-t border-text/20 font-bold text-[15px]">
                  <span>Összesen</span>
                  <span className="tabular-nums">
                    {total.toLocaleString("hu-HU")} Ft
                  </span>
                </div>

                <div onClick={() => setOpen(false)}>
                  <MainButton
                    text="Pénztár"
                    link="/penztar"
                    icon={PackageIcon}
                    iconSize={25}
                    className="flex flex-row gap-3 mt-[8px] !text-text hover:!text-white mx-auto w-fit"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavGroup({
  side,
  headerTheme,
  scrolled,
}: {
  side: Side;
  headerTheme: "dark" | "light";
  scrolled: boolean;
}) {
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (indicatorRef.current) {
      indicatorRef.current.style.left = `${el.offsetLeft - 10}px`;
      indicatorRef.current.style.width = `${el.offsetWidth + 20}px`;
      indicatorRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      className={`flex w-fit flex-col motion-reduce:animate-none px-[15px] ${
        side === "left" ? "animate-reveal-left" : "animate-reveal-right"
      }`}
    >
      <nav
        onMouseLeave={handleMouseLeave}
        className="desktop-nav relative flex w-full flex-row items-center justify-around gap-[15px]"
      >
        {/* Csúszó háttér */}
        <span
          ref={indicatorRef}
          aria-hidden
          className="pointer-events-none absolute top-1/2 h-full -translate-y-1/2 rounded-full bg-accent opacity-0 transition-all duration-300 ease-out"
        />

        {navItems
          .filter((item) => item.position === side)
          .map((item) => (
            <a
              key={item.path}
              href={item.path}
              onMouseEnter={handleMouseEnter}
              className={`relative z-10 py-1.5 text-[20px] transition-colors desktop-nav-item ${
                headerTheme === "light" && !scrolled
                  ? "!text-text"
                  : "!text-white"
              } hover:!text-white`}
            >
              {item.name}
            </a>
          ))}
      </nav>
    </div>
  );
}

function MobileHeader({
  scrolled,
  headerTheme,
  latestProducts,
}: {
  scrolled: boolean;
  headerTheme: "light" | "dark";
  latestProducts: Product[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const bar = `flex flex-row h-[3px] w-full rounded-full transition-colors duration-300  ${
    open ? "!bg-accent" : "bg-white "
  }`;
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <div className="relative z-10 mx-auto mt-[15px] flex w-[90%] max-w-[2560px] items-center justify-between pl-[15px] pr-[5px] py-[8px] lg:hidden">
        {/* HÁTTÉR ÉS BLUR KÜLÖN RÉTEGEN */}
        <div
          className={`absolute inset-0 -z-10 rounded-full transition-all duration-500 ${
            scrolled && !open ? "bg-foreground/40 backdrop-blur-sm" : ""
          }`}
        />

        <Link
          href="/"
          className={`relative transition-all duration-300 ${
            scrolled
              ? "h-[50px] min-w-[50px] bg-transparent"
              : "h-[50px] min-w-[50px] bg-accent shadow-xl"
          } overflow-hidden rounded-full`}
        >
          <Image
            alt="József Zoltán bádogos mester – főoldal"
            src="/icon.svg"
            fill
            sizes="150px"
            className="object-cover animate-scale-up "
          />
        </Link>

        <div className="flex flex-row gap-[5px] rounded-full ml-auto p-[3px] bg-gray-300">
          <CartDropdown isMobile latestProducts={latestProducts} />

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            className="relative w-[50px] h-[50px] flex flex-col items-center justify-center gap-[5px] rounded-full cursor-pointer bg-text px-[10px] py-[5px] overflow-hidden"
          >
            <motion.span
              className={bar}
              animate={open ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.span
              className={bar}
              animate={open ? { x: -4 } : { x: 8 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.span
              className={bar}
              animate={open ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.3, ease }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobil navigáció"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 w-2/3 h-dvh bg-foreground lg:hidden rounded-tl-[10px] rounded-bl-[10px] overflow-y-auto overflow-x-hidden flex flex-col"
          >
            <div className="flex flex-col w-full h-full relative">
              <div className="absolute right-0 top-[50%] translate-y-[-50%] rotate-[-90deg] z-[-1]">
                <span className="text-[25vw] text-white/5">MENÜ</span>
              </div>
              <ul className="flex h-full flex-col justify-center gap-6 px-[10%] min-h-[450px]">
                {navItems.map((item) => (
                  <motion.li key={item.path} variants={menuItem}>
                    <Link
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className="flex flex-row pb-3 text-[15px] xs:text-[20px] gap-[5px] font-bold text-white items-center"
                    >
                      <span className="w-[10px] h-[10px] bg-accent rounded-[2px]" />
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-row w-fit gap-[15px] mx-auto mb-[25px]">
                <a
                  href="tel:+36203127968"
                  className="w-[45px] h-[45px] rounded-full border-2 border-white/50 hover:border-white flex flex-row items-center justify-center"
                >
                  <PhoneOutgoingIcon className="w-[35px] h-[35px] mx-auto my-auto text-white" />
                </a>
                <a
                  href="tel:+36203127968"
                  className="w-[45px] h-[45px] rounded-full border-2 border-white/50 hover:border-white flex flex-row items-center justify-center"
                >
                  <PaperPlaneTiltIcon className="w-[35px] h-[35px] mx-auto my-auto text-white" />
                </a>
              </div>
              <div className="mt-auto flex flex-row gap-[5px] bg-accent items-center justify-center text-white text-[15px] font-bold">
                <p className="px-[5px]">Bádogos munkák / Somogy megye</p>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("dark");
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    getLatestProducts().then(setLatestProducts).catch(console.error);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const line = header.offsetTop + header.offsetHeight / 2;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHeaderTheme(
              entry.target.getAttribute("data-header") === "light"
                ? "light"
                : "dark",
            );
          }
        }
      },
      { rootMargin: `-${line}px 0px -${window.innerHeight - line - 1}px 0px` },
    );

    document
      .querySelectorAll("section")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      ref={headerRef}
      className="group/header fixed top-0 left-0 z-[999] w-full"
    >
      {/* Desktop header ------------- */}
      <div className="relative mx-auto hidden lg:flex w-[90%] max-w-[2560px] px-[10px] flex-row items-center mt-[10px] justify-center gap-[25px] py-[10px]">
        {/* DESKTOP HÁTTÉR ÉS BLUR KÜLÖN RÉTEGEN */}
        <div
          className={`absolute inset-0 -z-10 rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-white/40 bg-foreground/40 backdrop-blur-sm"
              : "border-transparent"
          }`}
        />

        <Link
          href="/"
          className={`relative transition-all duration-300 mr-auto ${
            scrolled
              ? "h-[50px] min-w-[50px] bg-transparent"
              : "h-[75px] min-w-[75px] bg-accent shadow-xl"
          } overflow-hidden rounded-full`}
        >
          <Image
            alt="József Zoltán bádogos mester – főoldal"
            src="/icon.svg"
            fill
            sizes="150px"
            className="object-cover animate-scale-up !stroke-accent"
          />
        </Link>

        <NavGroup headerTheme={headerTheme} scrolled={scrolled} side="left" />

        <CartDropdown latestProducts={latestProducts} />
      </div>

      {/* Mobil header ----------------- */}
      <MobileHeader
        headerTheme={headerTheme}
        scrolled={scrolled}
        latestProducts={latestProducts}
      />
    </header>
  );
}
