"use client";
import Image from "next/image";
import Link from "next/link";
import navItems from "@/lib/datas/navItems";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "motion/react";

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

function NavGroup({ side }: { side: Side }) {
  return (
    <div
      className={`flex w-full flex-col motion-reduce:animate-none ${
        side === "left" ? "animate-reveal-left" : "animate-reveal-right"
      }`}
    >
      <div className="h-[2px] w-full rounded-full bg-white/50" />
      <nav className="desktop-nav flex w-full flex-row items-center justify-around gap-[15px]">
        {navItems
          .filter((item) => item.position === side)
          .map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-[20px] text-white desktop-nav-item"
            >
              {item.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}

function MobileHeader({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  // Nyitott menünél ne görgessen alatta az oldal
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const bar = `absolute left-0 h-[3px] w-full rounded-full transition-colors duration-300 ${
    open
      ? "bg-accent"
      : "bg-white group-data-[theme=light]/header:bg-foreground"
  }`;

  return (
    <>
      {/* Felső sáv: logó + hamburger */}
      <div
        className={`relative z-10 mx-auto mt-[15px] flex w-[90%] items-center justify-between rounded-full  px-[15px] py-[8px] transition-all duration-500 md:hidden ${
          scrolled && !open ? " bg-foreground/40 backdrop-blur-sm" : ""
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="relative h-[60px] w-[90px] overflow-hidden rounded-[10px]"
        >
          <Image
            alt="József Zoltán bádogos mester – főoldal"
            src="/images/favicon.ico.webp"
            fill
            sizes="90px"
            className="object-cover animate-scale-up"
          />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
          className="relative h-5 w-7 cursor-pointer"
        >
          <motion.span
            className={`${bar} top-0`}
            animate={open ? { y: 9, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3, ease }}
          />
          <motion.span
            className={`${bar} top-[9px]`}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={`${bar} top-[18px]`}
            animate={open ? { y: -9, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3, ease }}
          />
        </button>
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
            className="fixed top-0 right-0 w-2/3 h-dvh bg-foreground md:hidden rounded-tl-[10px] rounded-bl-[10px] overflow-y-auto overflow-x-hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-6 px-[10%] min-h-[450px]">
              {navItems.map((item) => (
                <motion.li key={item.path} variants={menuItem}>
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="block  pb-3 text-[15px] font-bold text-white"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
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
      data-theme={headerTheme}
      className="group/header fixed top-0 left-0 z-[999] w-full"
    >
      {/* Desktop header ------------- */}
      <div
        className={`mx-auto hidden md:flex w-[90%] px-[25px] flex-row items-center mt-[35px] justify-center gap-[25px] rounded-full border border-transparent py-[10px] transition-all duration-500 ${
          scrolled ? "border-white/40 bg-foreground/40 backdrop-blur-sm" : ""
        }`}
      >
        <NavGroup side="left" />

        <Link
          href="/"
          className={`relative transition-all duration-300 ${
            scrolled ? "h-[50px] min-w-[75px]" : "h-[100px] min-w-[150px]"
          } overflow-hidden rounded-[10px]`}
        >
          <Image
            alt="József Zoltán bádogos mester – főoldal"
            src="/images/favicon.ico.webp"
            fill
            sizes="150px"
            className="object-cover animate-scale-up"
          />
        </Link>

        <NavGroup side="right" />
      </div>

      {/* Mobil header ----------------- */}
      <MobileHeader scrolled={scrolled} />
    </header>
  );
}
