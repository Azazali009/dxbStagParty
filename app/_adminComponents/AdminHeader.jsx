import Link from "next/link";
import CalenderViewButton from "./CalenderViewButton";
export default function AdminHeader() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-end gap-4 bg-navyBlue p-4 shadow-sm">
      <CalenderViewButton />
      <Link
        className="flex h-10 items-center gap-3 rounded-md bg-sky-600 px-6 capitalize shadow-lg duration-300 hover:bg-sky-800 hover:shadow-none"
        href={"/dashboard/create-activity"}
      >
        <span className="text-xl">+</span>
        <span>create activity</span>
      </Link>
    </div>
  );
}
