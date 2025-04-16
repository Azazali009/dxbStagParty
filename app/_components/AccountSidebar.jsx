"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { accountNavigations } from "../_lib/accountNavigations";
export default function AccountSidebar({ children }) {
  const pathname = usePathname();
  return (
    <div className="bg-navyBlue border-navyBlue sticky top-10 flex flex-col border-r px-2 py-10">
      <ul className="flex min-h-screen flex-col gap-2">
        {accountNavigations.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
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
