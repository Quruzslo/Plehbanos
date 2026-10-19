import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";

interface MainButtonProps {
  link: string;
  text: string;
  icon?: Icon;
  iconSize: number;
  className?: string;
}

export default function MainButton({
  link,
  text,
  icon: IconComponent,
  iconSize,
  className,
}: MainButtonProps) {
  return (
    <Link
      href={link}
      className={`group relative inline-flex h-14 items-center rounded-[10px] bg-transparent pl-16 pr-6 font-semibold text-foreground ${className ?? ""}`}
    >
      <span className="absolute inset-y-1 left-1 z-10 flex w-12 items-center justify-center rounded-[7px] bg-accent text-background transition-[width] duration-500 group-hover:w-[calc(100%-8px)] group-focus-visible:w-[calc(100%-8px)]">
        {IconComponent && (
          <span
            className="overflow-hidden"
            style={{ width: iconSize, height: iconSize }}
          >
            <span className="flex flex-col -translate-y-1/2 transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
              <IconComponent weight="bold" aria-hidden size={iconSize} />
              <IconComponent weight="bold" aria-hidden size={iconSize} />
            </span>
          </span>
        )}
      </span>
      <span className="text-white">{text}</span>
    </Link>
  );
}
