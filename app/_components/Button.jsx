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
          ? `${cn("block rounded-full border-2 border-transparent bg-tertiary/40 px-4 py-3 text-xs capitalize shadow-shadowOne transition-all duration-500 hover:border-secondary hover:from-transparent hover:to-transparent sm:px-8 sm:text-base", className)}`
          : `${cn("block w-full rounded-full bg-gradient-to-r from-secondary via-[#735d1d] to-secondary px-4 py-3 text-xs font-semibold capitalize text-white duration-300 hover:scale-95 hover:bg-gradient-to-br sm:px-8 sm:text-base", className)}`
      }
    >
      {children}
    </button>
  );
}
