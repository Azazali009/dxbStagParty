import Link from "next/link";
import CalenderViewButton from "./CalenderViewButton";
import dashboardIcon from "../svgIcons/dashboard.png";

import Image from "next/image";
import { getCurrentUser } from "../_lib/getCurrentUser";
export default async function AdminHeader() {
  const user = await getCurrentUser();

  return (
    // <div className="sticky top-0 z-10 flex items-center justify-end gap-4 bg-navyBlue p-4 shadow-sm">
    <div className="flex min-h-[240px] flex-col justify-center gap-6 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-900 p-8">
      <div className="flex items-center gap-2">
        <Image src={dashboardIcon} width={30} height={30} alt="dashboard" />
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Welcome back,{" "}
          <span className="capitalize text-yellow-300">
            {user?.user_metadata?.full_name?.split(" ")[0]}
          </span>{" "}
          <span className="animate-wave inline-block">👋</span>
        </h1>
      </div>
      <p className="text-white/80">
        This is your{" "}
        <span className="font-medium text-white">Admin Command Center</span> —
        manage activities, bookings, blogs, and more.
      </p>
      <div className="flex items-center gap-2">
        <CalenderViewButton />
        <Link
          className="flex h-10 items-center gap-1 rounded-lg bg-white px-6 text-sm font-medium capitalize text-indigo-800 shadow-lg duration-300 hover:bg-gray-200 hover:shadow-none"
          href={"/dashboard/activities/create-activity"}
        >
          <span className="text-xl">+</span>
          <span>create activity</span>
        </Link>
      </div>
    </div>
  );
}
