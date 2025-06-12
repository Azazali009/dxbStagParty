"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChartPieIcon from "../svgIcons/ChartPieIcon";
import HomeIcon from "../svgIcons/HomeIcon";
import UserIcon from "../svgIcons/UserIcon";

const accountNavigations = [
  {
    name: "Home",
    href: "/supplier",
    icon: <HomeIcon />,
  },
  {
    name: "Activities",
    href: "/supplier/activities",
    icon: <ChartPieIcon />,
  },
  {
    name: "Profile",
    href: "/supplier/profile",
    icon: <UserIcon />,
  },
];
export default function SupplierSidebar({ children }) {
  const pathname = usePathname();
  return (
    <div className="sticky top-10 flex flex-col border-r border-navyBlue bg-navyBlue px-2 py-10">
      <ul className="flex min-h-screen flex-col gap-2">
        {accountNavigations.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={"#"}
                className={`flex items-center gap-2 rounded px-5 py-3 font-medium capitalize transition-all duration-300 hover:bg-primary ${pathname === link.href && "bg-primary"}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
        {children}
      </ul>
    </div>
  );
}
