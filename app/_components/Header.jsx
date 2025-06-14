"use client";
import { usePathname } from "next/navigation";
import AuthNav from "./AuthNav";
import Navbar from "./Navbar";

export default function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return (
    <header className="relative z-20 mx-auto flex h-[110px] flex-col justify-center bg-transparent">
      <AuthNav />
      <Navbar />
    </header>
  );
}
