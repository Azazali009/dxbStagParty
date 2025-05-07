"use client";
import Link from "next/link";
import HomeIcon from "../svgIcons/HomeIcon";
import UserIcon from "../svgIcons/UserIcon";
import WebsiteIcon from "../svgIcons/WebsiteIcon";
import ChartPieIcon from "../svgIcons/ChartPieIcon";
import { usePathname } from "next/navigation";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import PackgeIcon from "../svgIcons/PackgeIcon";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

const SideBar = ({ user }) => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex min-h-screen flex-col bg-navyBlue p-0 px-6 py-3 text-white">
      <h1 className="text-center text-xl font-bold">Admin panel</h1>
      <ul className="mt-20 flex flex-col gap-4">
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard"}
        >
          <HomeIcon />
          <span>home</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/activities" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard/activities"}
        >
          <ChartPieIcon />
          <span> activities</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/bookings" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard/bookings"}
        >
          <CalenderDaysIcon />
          <span> bookings</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/packages" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard/packages"}
        >
          <PackgeIcon />
          <span> packages</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 capitalize ${pathname === "/dashboard/users" && "bg-sky-600"} transition-all duration-300 hover:bg-sky-600`}
          href={"/dashboard/users"}
        >
          <UserIcon />
          <span> users</span>
        </Link>
        <Link
          className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 capitalize transition-all duration-300 hover:bg-sky-600`}
          href={"/"}
        >
          <WebsiteIcon />
          <span>visite website</span>
        </Link>
      </ul>
      <div className="my-auto flex items-center gap-4 p-4">
        <Link href={"/account"}>
          <Image
            src={user?.user_metadata?.avatar_url || "/images/defaultUser.png"}
            width={30}
            height={300}
            alt={user?.user_metadata?.full_name}
            className="size-10 rounded-full object-cover"
          />
        </Link>
        <div>
          <h3 className="font-semibold capitalize text-matalicGold">
            {user?.user_metadata?.full_name?.split(" ")[0]}
          </h3>
          <p className="font-light text-gray-600">{user?.user_metadata.role}</p>
        </div>
        {/* <SignOutButton /> */}
      </div>
    </aside>
  );
};

export default SideBar;
