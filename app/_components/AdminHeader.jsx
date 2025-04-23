import Link from "next/link";
import plusIcon from "../svgIcons/plus.svg";
import Image from "next/image";
export default function AdminHeader() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-navyBlue/40 p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search activity,package,blogs..."
        className="h-12 w-2/3 rounded-full bg-primary px-4 outline-none duration-300 placeholder:text-sm placeholder:tracking-wider focus:outline-matalicGold"
      />
      <Link
        className="flex items-center gap-3 rounded-md bg-black px-6 py-3 capitalize shadow-lg duration-500 hover:scale-95 hover:opacity-70 hover:shadow-none"
        href={"/dashboard/create-activity"}
      >
        <Image src={plusIcon} width={20} height={20} alt="add" />{" "}
        <span>create activity</span>
      </Link>
    </div>
  );
}
