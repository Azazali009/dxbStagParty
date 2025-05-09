"use client";
import SidebarNavigations from "../_adminComponents/SidebarNavigations";
import UserInfo from "../_adminComponents/UserInfo";
import Logo from "./Logo";

const SideBar = ({ user }) => {
  return (
    <aside className="sticky top-0 flex min-h-screen flex-col items-center bg-navyBlue p-0 px-6 py-3 text-white">
      <Logo />
      <SidebarNavigations />
      <UserInfo user={user} />
    </aside>
  );
};

export default SideBar;
