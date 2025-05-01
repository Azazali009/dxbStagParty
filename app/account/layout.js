import AccountSidebar from "../_components/AccountSidebar";

export default function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] items-start gap-4 border border-gray-800 p-4">
      <AccountSidebar>{/* <UserData /> */}</AccountSidebar>
      <div className="p-2">{children}</div>
    </div>
  );
}
