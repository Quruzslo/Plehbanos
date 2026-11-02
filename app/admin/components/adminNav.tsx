"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import adminLinks from "./adminLinks";
import { SignOutIcon } from "@phosphor-icons/react";
import { signOutAction } from "@/lib/auth/auth-actions";

export default function AdminNav({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <nav className="w-full flex flex-col gap-[20px] sticky top-[0px] lg:h-[100svh] p-[10px] pt-[20px]">
      <h2 className="mx-auto text-[25px] font-bold">{userName}</h2>
      <div className="flex flex-col gap-[20px] mt-auto">
        {adminLinks.map(({ name, path, icon: Icon }) => {
          const active = pathname === path || pathname.startsWith(path + "/");
          return (
            <Link
              key={path}
              href={path}
              aria-current={active ? "page" : undefined}
              className={`flex flex-row gap-[10px] py-[5px] px-[10px] rounded-full ${active ? "font-semibold bg-sky-500 text-white" : "opacity-60 hover:opacity-100 hover:bg-sky-200"}`}
            >
              <Icon size={25} />
              <span>{name}</span>
            </Link>
          );
        })}
      </div>

      <form action={signOutAction} className="mt-auto">
        <button
          type="submit"
          className="flex flex-row gap-[10px] py-[5px] px-[10px] items-center hover:text-red-400 w-fit cursor-pointer"
        >
          <SignOutIcon size={25} /> <span>Kilépés</span>
        </button>
      </form>
    </nav>
  );
}
