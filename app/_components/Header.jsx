import SocialBar from "../_components/SocialBar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="relative z-10 mx-auto flex h-[110px] max-w-full flex-col justify-center bg-transparent">
      <SocialBar />
      <Navbar />
    </header>
  );
}
