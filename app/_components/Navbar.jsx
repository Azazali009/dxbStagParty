"use client";
import Link from "next/link";
import { navbar } from "./navbarData";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="sticky top-0 hidden p-4 lg:block">
      <ul className="flex items-center gap-6">
        {navbar.map((cur) => (
          <li
            key={cur.id}
            className={`text-sm font-semibold ${pathName === cur.href ? "text-secondary" : "text-softGold"} duration-300 hover:text-secondary`}
          >
            <Link href={cur.href}>{cur.navItem}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
