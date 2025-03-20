import Navbar from "./Navbar";
import Logo from "./Logo";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-50 flex h-20 items-center justify-between gap-12 border-b border-tertiary bg-transparent px-8">
      <Logo />
      <Navbar />
      <Link href={"/account"}>
        <UserIcon width={20} />
      </Link>
    </header>
  );
}
