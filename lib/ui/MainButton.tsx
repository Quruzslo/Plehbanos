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
      className={`main-button relative inline-flex h-14 items-center rounded-[10px] bg-transparent pl-16 pr-6 font-semibold text-foreground ${className ?? ""}`}
    >
      <span className="main-button-fill absolute inset-y-1 left-1 z-10 flex w-12 items-center justify-center rounded-[7px] bg-accent text-background">
        {IconComponent && (
          <span
            className="overflow-hidden"
            style={{ width: iconSize, height: iconSize }}
          >
            <span className="main-button-icon flex flex-col">
              <IconComponent weight="bold" aria-hidden size={iconSize} />
              <IconComponent weight="bold" aria-hidden size={iconSize} />
            </span>
          </span>
        )}
      </span>
      <span>{text}</span>
    </Link>
  );
}
