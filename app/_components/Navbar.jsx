"use client";
import Link from "next/link";
import { navbar } from "./navbarData";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="sticky top-0 hidden items-center justify-between px-4 lg:flex">
      <Image src={"/logo.png"} width={100} height={100} alt="logo" />
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
