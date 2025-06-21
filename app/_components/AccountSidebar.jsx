"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { accountNavigations } from "../_lib/accountNavigations";
export default function AccountSidebar({ children }) {
  const pathname = usePathname();
  return (
    <div className="sticky top-10 flex h-fit flex-col border-r border-navyBlue bg-navyBlue px-2 py-4 lg:py-10">
      <ul className="flex flex-row justify-center gap-2 lg:min-h-screen lg:flex-col lg:justify-start">
        {accountNavigations.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs font-medium capitalize transition-all duration-300 hover:bg-primary xs:text-sm sm:px-5 sm:py-3 ${pathname === link.href && "bg-primary"}`}
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
