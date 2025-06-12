"use client";
import SidebarNavigations from "../_adminComponents/SidebarNavigations";
import Logo from "./Logo";

const SideBar = ({ user }) => {
  const isSupplier = user?.user_metadata?.role === "supplier";
  return (
    <aside className="sticky top-0 flex h-full flex-col items-center bg-navyBlue p-0 px-6 py-3 text-white">
      <Logo />
      <SidebarNavigations isSupplier={isSupplier} />
    </aside>
  );
};

export default SideBar;
