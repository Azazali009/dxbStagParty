import Navbar from "./Navbar";
import Logo from "./Logo";
import AuthNav from "@/app/_components/AuthNav";
import MobileNav from "@/app/_components/MobileNav";

export default function Header() {
  return (
    <header className="relative z-50 flex h-20 items-center justify-between gap-12 border-b border-tertiary/40 bg-transparent px-8">
      <Logo />
      <Navbar />
      <div className="flex items-center gap-4">
        <AuthNav />
        <MobileNav />
      </div>
    </header>
  );
}
