// "use client";
import Image from "next/image";
import MobileNav from "../_components/MobileNav";
import SocialBar from "../_components/SocialBar";
import Button from "./Button";
import LinkButton from "./LinkButton";
import Logo from "./Logo";
import Navbar from "./Navbar";
// import { usePathname } from "next/navigation";
export default function Header() {
  // const pathname = usePathname();
  // if (pathname === "/dashboard") return;
  return (
    <header className="relative z-50 mx-auto max-w-7xl bg-gray-100">
      {/* <TopBar /> */}
      <SocialBar />
      <div className="flex items-center justify-between bg-gray-200 p-4">
        <Button>build your package</Button>
        <Logo />
        <LinkButton
          href={"https://wa.me/+92311123455"}
          className={"flex items-center gap-2"}
        >
          <Image
            src={"/images/whatsapp.png"}
            alt="whatsapp chat"
            width={100}
            height={100}
            className="w-8"
          />
          whatsapp <span className="text-green-500">chat to us</span>
        </LinkButton>
      </div>
      <Navbar />

      {/* <AuthNav /> */}
      <MobileNav />
    </header>
  );
}
