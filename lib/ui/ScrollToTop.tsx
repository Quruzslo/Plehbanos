"use client";
import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@phosphor-icons/react";

export default function ScrollToTop() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 150);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      title="Felgörgetés"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Felgörgetés az oldal tetejére"
      className={`cursor-pointer z-[100]  flex flex-row items-center shadow-xl justify-center bg-text text-white fixed bottom-[15px] right-[15px] p-[5px] rounded-full  transition-[opacity,visibility] duration-300 ${
        isScrolled ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <span>
        <ArrowUpIcon size={25} />
      </span>
    </button>
  );
}
