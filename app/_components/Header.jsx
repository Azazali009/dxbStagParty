import Navbar from "./Navbar";
import Logo from "./Logo";
import AuthNav from "@/app/_components/AuthNav";
import MobileNav from "@/app/_components/MobileNav";
import TopBar from "@/app/_components/TopBar";
import SocialBar from "@/app/_components/SocialBar";
import Button from "./Button";

export default function Header() {
  return (
    <header className="relative z-50 bg-transparent">
      <TopBar />
      <SocialBar />
      <div className="flex items-center justify-between p-4">
        <Logo />
        <Button>build your package</Button>
      </div>
      <Navbar />
      <div className="flex items-center gap-4 py-4 lg:hidden">
        {/* <AuthNav /> */}
        <MobileNav />
      </div>
    </header>
  );
}
