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
          ? `${cn("block rounded-full border-2 border-transparent bg-tertiary/40 px-6 py-3 capitalize shadow-shadowOne transition-all duration-500 hover:border-secondary hover:from-transparent hover:to-transparent", className)}`
          : `${cn("w-full rounded-full bg-gradient-to-r from-[#735d1d] via-secondary to-[#735d1d] px-8 py-3 font-semibold text-white duration-300 hover:scale-90 hover:border-blue-600 hover:bg-gradient-to-l", className)}`
      }
    >
      {children}
    </button>
  );
}
