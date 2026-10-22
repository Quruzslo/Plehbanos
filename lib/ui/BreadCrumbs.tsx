import Link from "next/link";
import { HouseIcon } from "@phosphor-icons/react/ssr";

type Crumb = { label: string; href?: string };

export default function BreadCrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-[15px]">
      <ol className="flex flex-row items-center gap-[5px] text-[15px] font-bold">
        <li className="flex">
          <Link href="/" aria-label="Főoldal" title="Főoldal">
            <HouseIcon size={20} className="hover:fill-accent " />
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={item.label}
              className="flex items-center gap-3 overflow-hidden"
            >
              <span aria-hidden>/</span>
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-accent transition">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`${isLast ? "bg-text text-white px-[5px] rounded-sm" : ""}  truncate`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
