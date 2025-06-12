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
import { useBooking } from "../_context/bookingProvider";
import BlogIcon from "../svgIcons/BlogIcon";

export default function SidebarNavigations({ isSupplier }) {
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
    <>
      {!isSupplier ? (
        <ul className="mt-20 flex flex-col gap-2 self-stretch">
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard" && "bg-indigo-600"} capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/dashboard"}
          >
            <HomeIcon />
            <span>home</span>
          </Link>
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname.startsWith("/dashboard/activities") && "bg-indigo-600"} capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/dashboard/activities"}
          >
            <ChartPieIcon />
            <span> activities</span>
          </Link>
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/bookings" && "bg-indigo-600"} capitalize transition-all duration-300 hover:bg-indigo-600`}
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
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/packages" && "bg-indigo-600"} capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/dashboard/packages"}
          >
            <PackgeIcon />
            <span> packages</span>
          </Link>
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/supplier" && "bg-indigo-600"} capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/dashboard/supplier"}
          >
            <SupplierIcon />
            <span> supplier</span>
          </Link>
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname === "/dashboard/blog" && "bg-indigo-600"} capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/dashboard/blog"}
          >
            <BlogIcon />
            <span> blog</span>
          </Link>
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 capitalize ${pathname.startsWith("/dashboard/users") && "bg-indigo-600"} transition-all duration-300 hover:bg-indigo-600`}
            href={"/dashboard/users"}
          >
            <UserIcon />
            <span> users</span>
          </Link>
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/"}
          >
            <WebsiteIcon />
            <span>visit website</span>
          </Link>
        </ul>
      ) : (
        <ul className="mt-20 flex flex-col gap-2 self-stretch">
          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 ${pathname.startsWith("/dashboard/activities") && "bg-indigo-600"} capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/dashboard/activities"}
          >
            <ChartPieIcon />
            <span> activities</span>
          </Link>

          <Link
            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md px-6 capitalize transition-all duration-300 hover:bg-indigo-600`}
            href={"/"}
          >
            <WebsiteIcon />
            <span>visit website</span>
          </Link>
        </ul>
      )}
    </>
  );
}
