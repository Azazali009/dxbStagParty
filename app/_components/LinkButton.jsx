import Link from "next/link";
import { cn } from "../_lib/utils";

export default function LinkButton({
  children,
  className,
  href,
  variation = "default",
  size = "medium",
}) {
  return (
    <Link
      href={href}
      className={
        variation === "default"
          ? `${cn(`flex items-center justify-center rounded-full border-2 border-transparent bg-navyBlue px-4 py-3 text-sm font-semibold capitalize shadow-lg transition-all duration-500 hover:border-secondary hover:from-transparent hover:to-transparent sm:px-8 sm:text-base ${size === "small" && "px-4 py-1.5 sm:text-xs"}`, className)}`
          : `${cn(`flex w-full items-center justify-center rounded-full bg-gradient-to-r from-matalicGold to-[#604e18] px-4 py-3 text-sm font-semibold capitalize text-white shadow-lg duration-300 hover:scale-95 hover:bg-gradient-to-l sm:px-8 sm:text-base ${size === "small" && "px-4 sm:text-sm"}`, className)}`
      }
    >
      {children}
    </Link>
  );
}
