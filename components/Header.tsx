"use client";
import Image from "next/image";
import Link from "next/link";
import navItems from "@/lib/datas/navItems";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";

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

function NavGroup({
  side,
  headerTheme,
  scrolled,
}: {
  side: Side;
  headerTheme: "dark" | "light";
  scrolled: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col motion-reduce:animate-none ${
        side === "left" ? "animate-reveal-left" : "animate-reveal-right"
      }`}
    >
      <div
        className={`h-[2px] transition duration-600 rounded-full bg-white/50 ${headerTheme === "light" && !scrolled ? "!bg-text/50" : "!bg-white/50"} ${scrolled ? "!w-0" : "!w-full"}`}
      />
      <nav className="desktop-nav flex w-full flex-row items-center justify-around gap-[15px]">
        {navItems
          .filter((item) => item.position === side)
          .map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-[20px] text-white desktop-nav-item ${headerTheme === "light" && !scrolled ? "!text-text" : "!text-white"}`}
            >
              {item.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}

function MobileHeader({
  scrolled,
  headerTheme,
}: {
  scrolled: boolean;
  headerTheme: "light" | "dark";
}) {
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

  return (
    <>
      {/*  logó + hamburger */}
      <div
        className={`relative z-10 mx-auto mt-[15px] flex w-[90%] max-w-[2560px] items-center justify-between rounded-full  pl-[15px] pr-[5px] py-[8px] transition-all duration-500 lg:hidden ${
          scrolled && !open ? " bg-foreground/40 backdrop-blur-sm" : ""
        }`}
      >
        <Link
          href="/"
          className={`relative transition-all duration-300 ${
            scrolled
              ? "h-[40px] min-w-[40px] bg-transparent"
              : "h-[75px] min-w-[75px] bg-accent shadow-xl"
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
          <Link
            href="/kapcsolat"
            className="relative w-[50px] h-[50px] items-center justify-center  rounded-full flex flex-col gap-[5px] cursor-pointer bg-text px-[10px] py-[5px]"
          >
            <PaperPlaneTiltIcon size={25} className="text-white" />
          </Link>
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
              animate={open ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.span
              className={bar}
              animate={open ? { x: -40, opacity: 0 } : { x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.span
              className={bar}
              animate={open ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease }}
            />
          </button>
        </div>
      </div>

      {/* Lenyíló panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobil navigáció"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 w-2/3 h-dvh bg-foreground md:hidden rounded-tl-[10px] rounded-bl-[10px] overflow-y-auto overflow-x-hidden flex flex-col"
          >
            <ul className="flex h-full flex-col justify-center gap-6 px-[10%] min-h-[450px]">
              {navItems.map((item) => (
                <motion.li key={item.path} variants={menuItem}>
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="flex flex-row pb-3 text-[15px] xs:text-[20px] gap-[5px] font-bold text-white items-center"
                  >
                    <span className="w-[15px] h-[15px] bg-accent rounded-full" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-row gap-[5px] bg-accent items-center justify-center text-white text-[15px] font-bold">
              <p className="px-[5px]">Bádogos munkák / Somogy megye</p>
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
  const pathname = usePathname();

  // Melyik section van a header mögött
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
    const onScroll = () => setScrolled(window.scrollY > 150);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="group/header fixed top-0 left-0 z-[999] w-full"
    >
      {/* Desktop header ------------- */}
      <div
        className={`mx-auto hidden lg:flex w-[90%] max-w-[2560px]  px-[25px] flex-row items-center mt-[10px] justify-center gap-[25px] rounded-full border border-transparent py-[10px] transition-all duration-500 ${
          scrolled ? "border-white/40 bg-foreground/40 backdrop-blur-sm" : ""
        }`}
      >
        <NavGroup headerTheme={headerTheme} scrolled={scrolled} side="left" />

        <Link
          href="/"
          className={`relative transition-all duration-300 ${
            scrolled
              ? "h-[75px] min-w-[75px] bg-transparent"
              : "h-[100px] min-w-[100px] bg-accent shadow-xl"
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

        <NavGroup headerTheme={headerTheme} scrolled={scrolled} side="right" />
      </div>

      {/* Mobil header ----------------- */}
      <MobileHeader headerTheme={headerTheme} scrolled={scrolled} />
    </header>
  );
}
