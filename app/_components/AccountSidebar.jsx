"use client";
import Image from "next/image";
import Link from "next/link";
import { accountNavigations } from "../_lib/accountNavigations";
import { usePathname } from "next/navigation";
import UserData from "./UserData";
export default function AccountSidebar({ children }) {
  const pathname = usePathname();
  return (
    <div className="sticky top-10 flex flex-col border-r border-gray-300 bg-gray-200 p-2">
      <ul className="flex min-h-screen flex-col gap-2">
        {accountNavigations.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 rounded px-5 py-3 font-normal capitalize transition-all duration-300 hover:bg-gray-300 ${pathname === link.href && "bg-gray-300"}`}
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
