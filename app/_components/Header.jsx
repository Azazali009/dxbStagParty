import Navbar from "./Navbar";
import Logo from "./Logo";
import AuthNav from "@/app/_components/AuthNav";
import MobileNav from "@/app/_components/MobileNav";
import TopBar from "@/app/_components/TopBar";
import SocialBar from "@/app/_components/SocialBar";

export default function Header() {
  return (
    <header className="relative z-50 border-b border-tertiary/40 bg-transparent">
      <TopBar />
      <SocialBar />
      <div className="flex items-center justify-between p-4">
        <Logo />
        <button>build</button>
      </div>
      <Navbar />
      <div className="flex items-center gap-4 py-4">
        {/* <AuthNav /> */}
        <MobileNav />
      </div>
    </header>
  );
}
