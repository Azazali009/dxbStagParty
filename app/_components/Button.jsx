import Link from "next/link";
import { cn } from "../_lib/utils";

export default function Button({
  children,
  onClick,
  disable,
  type = "button",
  className,
  variation = "default",
  href = false,
}) {
  return (
    <>
      {!href ? (
        <button
          disabled={disable}
          onClick={onClick}
          type={type}
          className={
            variation === "default"
              ? `${cn("block rounded-full border-2 border-transparent bg-white px-4 py-2 text-center text-xs font-medium capitalize text-neutral-700 shadow-md transition-all duration-500 hover:border-secondary hover:from-transparent hover:to-transparent active:translate-y-2 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-3 sm:text-base", className)}`
              : `${cn("block w-full rounded-full border-2 border-matalicGold bg-transparent px-4 py-3 text-center text-sm font-medium capitalize text-matalicGold duration-300 hover:scale-95 hover:bg-gradient-to-l active:translate-y-2 disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:opacity-40 disabled:hover:scale-100 sm:px-6 sm:text-base", className)}`
          }
        >
          {children}
        </button>
      ) : (
        <Link
          href={href}
          className={
            variation === "default"
              ? `${cn("block rounded-full border-2 border-transparent bg-white px-4 py-2 text-center text-xs font-medium capitalize text-neutral-700 shadow-md transition-all duration-500 hover:border-secondary hover:from-transparent hover:to-transparent disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-3 sm:text-base", className)}`
              : `${cn("block w-full rounded-full border-2 border-matalicGold bg-transparent px-4 py-2 text-center text-sm font-medium capitalize tracking-wider text-matalicGold duration-300 hover:scale-95 hover:bg-gradient-to-l disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:opacity-40 disabled:hover:scale-100 sm:px-6 sm:py-3 sm:text-base", className)}`
          }
        >
          {children}
        </Link>
      )}
    </>
  );
}
