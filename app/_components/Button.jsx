import { cn } from "../_lib/utils";

export default function Button({
  children,
  onClick,
  disable,
  type = "button",
  className,
  variation = "default",
}) {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      type={type}
      className={
        variation === "default"
          ? `${cn("block rounded-full border-2 border-transparent bg-white px-4 py-3 text-xs font-semibold capitalize text-neutral-700 shadow-md transition-all duration-500 hover:border-secondary hover:from-transparent hover:to-transparent disabled:cursor-not-allowed disabled:opacity-40 sm:px-8 sm:text-base", className)}`
          : `${cn("block w-full rounded-full bg-gradient-to-r from-secondary to-[#604e18] px-4 py-3 text-xs font-semibold capitalize text-white duration-300 hover:scale-95 hover:bg-gradient-to-l disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:opacity-40 disabled:hover:scale-100 sm:px-8 sm:text-base", className)}`
      }
    >
      {children}
    </button>
  );
}
