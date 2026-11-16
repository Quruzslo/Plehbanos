"use client";
import Image from "next/image";
import Link from "next/link";
import navItems from "@/lib/datas/navItems";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";

const EMAIL = "info@pelda.hu";
const PHONE = "+36 30 123 4567";
const now = new Date().getFullYear();

const col = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

const mapVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.48 },
  },
};

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/belepes")) {
    return null;
  }

  return (
    <section className="w-full mt-[50px] bg-text text-white flex flex-col pt-[50px] pb-[60px]">
      <div className="footer-img relative mx-auto mt-[-50px] mb-[60px] bg-white p-[10px] rounded-b-[25px]">
        <Image
          src="/icon.svg"
          width={100}
          height={100}
          alt="Somogy megye Bádogos, kézzel készített bádogos díszek, szélkakasok"
          className="bg-text rounded-[15px]"
        />
      </div>

      <div className="w-[90%] max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mx-auto">
        <motion.div
          variants={col(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Bádogos munkák</h3>
            <div className="h-px w-full bg-white/15" />
          </div>
          <p className="text-sm leading-[1.9] text-white/60 font-light">
            Ereszcsatornák, lefolyók, szegélyek, párkány- és kéményfedések
            kivitelezése Kaposváron és vonzáskörzetében. Egyedi hajlítású
            elemek, szakszerű munkavégzés és pontos határidők Somogy megye
            területén.
          </p>
        </motion.div>

        <motion.div
          variants={col(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col gap-5 lg:pl-10"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Navigáció</h3>
            <div className="h-px w-full bg-white/15" />
          </div>
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.path} className="border-b border-white/[0.08]">
                <Link
                  href={item.path}
                  className="block py-[11px] text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="border-b border-white/[0.08]">
              <Link
                href="/adatvedelem"
                className="block py-[11px] text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                Adatvédelem
              </Link>
            </li>
            <li className="border-b border-white/[0.08]">
              <Link
                href="/aszf"
                className="block py-[11px] text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                Á.SZF.
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={col(0.24)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col gap-5 relative"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Kapcsolat</h3>
            <div className="h-px w-full bg-white/15" />
          </div>

          <div className="flex flex-col gap-3 z-10">
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-white/50 hover:text-white/80 transition-colors duration-200"
            >
              {EMAIL}
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-2xl font-bold text-white hover:text-white/80 transition-colors duration-200 leading-tight"
            >
              {PHONE}
            </a>
            <p className="text-sm text-white/50 mt-1">
              7400 Kaposvár, Somogy megye
            </p>
          </div>

          <motion.div variants={mapVariant} className="mt-4 w-full">
            <Image
              width={300}
              height={300}
              alt="Somogy megye térkép"
              src="/images/somogy.svg"
              className="w-full object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-16 w-[90%] max-w-[1200px] mx-auto">
        <div className="h-px bg-white/[0.08] mb-6" />
        <p className="text-xs text-white/30 tracking-wide">
          © {now} Minden jog fenntartva.
        </p>
      </div>
    </section>
  );
}
