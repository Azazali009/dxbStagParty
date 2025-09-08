import { cn } from "../_lib/utils";

export default function TableRow({ children, className }) {
  return (
    <div
      className={cn(
        `grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center justify-items-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md`,
        className,
      )}
    >
      {children}
    </div>
  );
}
