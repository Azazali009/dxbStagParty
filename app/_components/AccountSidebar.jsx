"use client";
import Image from "next/image";
import Link from "next/link";
import { accountNavigations } from "../_lib/accountNavigations";
import { usePathname } from "next/navigation";
export default function AccountSidebar() {
  const pathname = usePathname();
  return (
    <div className="sticky top-10 flex flex-col border-r border-primary pr-4">
      <ul className="flex h-screen flex-col gap-2">
        {accountNavigations.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 rounded px-5 py-3 font-normal capitalize transition-all duration-300 hover:bg-primary ${pathname === link.href && "bg-primary"}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
        <li className="mt-auto flex items-center gap-2">
          <Image
            src={"/paintball.jpg"}
            width={50}
            height={50}
            alt="user name"
            className="aspect-square w-12 rounded-full"
          />
          <p>user name</p>
        </li>
      </ul>
    </div>
  );
}
