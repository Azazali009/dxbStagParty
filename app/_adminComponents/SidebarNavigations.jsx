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
import { useAuth } from "../_context/AuthProvider";
import VoteIcon from "../svgIcons/VoteIcon";

export default function SidebarNavigations({ isSupplier }) {
  const [show, setShow] = useState(false);
  const { pendingBookingCount, setPendingBookingCount } = useBooking();
  const { nonVerifyUsersCount } = useAuth();
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
            {nonVerifyUsersCount > 0 && (
              <span className="flex size-6 items-center justify-center rounded-full bg-red-600 text-sm">
                {nonVerifyUsersCount}
              </span>
            )}
          </Link>
          <div className="space-y-2">
            <button
              onClick={() => setShow((show) => !show)}
              className={`flex min-h-[3rem] w-full cursor-pointer items-center gap-2 rounded-md px-6 capitalize ${pathname.startsWith("/dashboard/voting") && "bg-indigo-600"} transition-all duration-300 hover:bg-indigo-600`}
            >
              <VoteIcon />
              <h2 className="">Voting</h2>
              {!show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </button>
            {show && (
              <ul className="ml-5 space-y-1 text-center">
                <li>
                  <Link
                    href="/dashboard/voting/sessions"
                    className={`block rounded-md px-3 py-2 text-sm hover:bg-neutral-800 ${pathname.startsWith("/dashboard/voting/sessions") && "bg-neutral-800"}`}
                  >
                    Sessions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/voting/votes"
                    className={`block rounded-md px-3 py-2 text-sm hover:bg-neutral-800 ${pathname.startsWith("/dashboard/voting/votes") && "bg-neutral-800"}`}
                  >
                    Votes Log
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/voting/reports"
                    className={`block rounded-md px-3 py-2 text-sm hover:bg-neutral-800 ${pathname.startsWith("/dashboard/voting/reports") && "bg-neutral-800"}`}
                  >
                    Reports
                  </Link>
                </li>
              </ul>
            )}
          </div>
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
