"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../_components/Logo";
import MobileNav from "./MobileNav";
import { navbar } from "./navbarData";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="sticky top-0 flex items-center justify-between px-4">
      <Logo />
      <ul className="hidden items-center gap-6 lg:flex">
        {navbar.map((cur) => (
          <li
            key={cur.id}
            className={`text-sm font-semibold ${pathName === cur.href ? "text-secondary" : "text-softGold"} duration-300 hover:text-secondary`}
          >
            <Link href={cur.href}>{cur.navItem}</Link>
          </li>
        ))}
      </ul>
      <MobileNav />
    </nav>
  );
}
