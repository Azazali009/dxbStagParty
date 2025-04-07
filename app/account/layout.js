import AccountSidebar from "../_components/AccountSidebar";
import UserData from "../_components/UserData";

export default function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] items-start gap-4 p-4">
      <AccountSidebar>
        <UserData />
      </AccountSidebar>
      <div className="p-2">{children}</div>
    </div>
  );
}
