import MobileNav from "@/app/_components/MobileNav";
import SocialBar from "@/app/_components/SocialBar";
import whatsappIcon from "@/public/images/whatsapp.png";
import Image from "next/image";
import Button from "./Button";
import LinkButton from "./LinkButton";
import Logo from "./Logo";
import Navbar from "./Navbar";
export default function Header() {
  return (
    <header className="relative z-50 bg-transparent">
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
            src={whatsappIcon}
            alt="whatsapp chat"
            width={100}
            height={100}
            className="w-8"
          />
          whatsapp <span className="text-green-500">chat to us</span>
        </LinkButton>
      </div>
      <Navbar />
      <div className="flex items-center gap-4 py-4 lg:hidden">
        {/* <AuthNav /> */}
        <MobileNav />
      </div>
    </header>
  );
}
