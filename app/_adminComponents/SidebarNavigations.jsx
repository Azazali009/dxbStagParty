import Link from "next/link";
import React, { useEffect, useState } from "react";
import HomeIcon from "../svgIcons/HomeIcon";
import ChartPieIcon from "../svgIcons/ChartPieIcon";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import PackgeIcon from "../svgIcons/PackgeIcon";
import SupplierIcon from "../svgIcons/SupplierIcon";
import UserIcon from "../svgIcons/UserIcon";
import WebsiteIcon from "../svgIcons/WebsiteIcon";
import { usePathname } from "next/navigation";
import { getPendingBookings } from "../_lib/data-services";
import { getPendingBookingCount } from "../_lib/helpers";
import { useBooking } from "../_context/bookingProvider";

export default function SidebarNavigations() {
  const { pendingBookingCount, setPendingBookingCount } = useBooking();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchPendingBookings() {
      const bookings = await getPendingBookings();
      setPendingBookingCount(bookings.length);
    }
    fetchPendingBookings();
  }, [setPendingBookingCount]);
  return (
    <ul className="mt-20 flex flex-col gap-2 self-stretch">
      <Link
        className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
        href={"/dashboard"}
      >
        <HomeIcon />
        <span>home</span>
      </Link>
      <Link
        className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname.startsWith("/dashboard/activities") && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
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
        <span> booking </span>{" "}
        {pendingBookingCount > 0 && (
          <span className="flex size-6 items-center justify-center rounded-full bg-red-600 text-sm">
            {pendingBookingCount}
          </span>
        )}
      </Link>
      <Link
        className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/packages" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
        href={"/dashboard/packages"}
      >
        <PackgeIcon />
        <span> packages</span>
      </Link>
      <Link
        className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/supplier" && "bg-sky-600"} capitalize transition-all duration-300 hover:bg-sky-600`}
        href={"/dashboard/supplier"}
      >
        <SupplierIcon />
        <span> supplier</span>
      </Link>
      <Link
        className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 capitalize ${pathname.startsWith("/dashboard/users") && "bg-sky-600"} transition-all duration-300 hover:bg-sky-600`}
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
        <span>visit website</span>
      </Link>
    </ul>
  );
}
