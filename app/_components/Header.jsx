import MobileNav from "../_components/MobileNav";
import SocialBar from "../_components/SocialBar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="relative z-30 mx-auto flex h-[110px] max-w-7xl flex-col justify-center bg-transparent">
      {/* <TopBar /> */}
      <SocialBar />
      {/* <div className="flex items-center justify-between bg-primary p-4">
        <Button>build your package</Button>
        <Logo />
        <LinkButton
          href={"https://wa.me/+971568347487"}
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
      </div> */}
      <Navbar />

      {/* <AuthNav /> */}
      <MobileNav />
    </header>
  );
}
