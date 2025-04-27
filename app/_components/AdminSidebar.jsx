"use client";
import Link from "next/link";
import HomeIcon from "../svgIcons/HomeIcon";
import UserIcon from "../svgIcons/UserIcon";
import WebsiteIcon from "../svgIcons/WebsiteIcon";
import ChartPieIcon from "../svgIcons/ChartPieIcon";
import { usePathname } from "next/navigation";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen flex-col bg-navyBlue p-0 px-6 py-3 text-white">
      <h1 className="text-center text-xl font-bold">Admin panel</h1>
      <ul className="mt-20 flex flex-col gap-4">
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium ${pathname === "/dashboard" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard"}
        >
          <HomeIcon />
          <span>home</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium ${pathname === "/dashboard/activities" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard/activities"}
        >
          <ChartPieIcon />
          <span> activities</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium ${pathname === "/dashboard/bookings" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard/bookings"}
        >
          <CalenderDaysIcon />
          <span> bookings</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard"}
        >
          <UserIcon />
          <span> users</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 font-medium capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/"}
        >
          <WebsiteIcon />
          <span>visite website</span>
        </Link>
      </ul>
    </aside>
  );
};

export default SideBar;
