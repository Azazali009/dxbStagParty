import AuthNav from "./AuthNav";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="relative z-20 mx-auto flex h-[110px] w-[95%] max-w-full flex-col justify-center bg-transparent">
      <AuthNav />
      <Navbar />
    </header>
  );
}
