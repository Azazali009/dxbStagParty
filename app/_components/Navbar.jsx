"use client";
import Link from "next/link";
import { navbar } from "./navbarData";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {navbar.map((cur) => (
          <li
            key={cur.id}
            className={`${pathName === cur.href ? "text-secondary" : "text-white"} duration-300 hover:text-secondary`}
          >
            <Link href={cur.href}>{cur.navItem}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
