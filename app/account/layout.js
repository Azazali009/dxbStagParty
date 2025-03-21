import AccountSidebar from "../_components/AccountSidebar";

export default function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] items-start gap-12 bg-[#1a1d20] p-4">
      <AccountSidebar />
      <div className="p-2">{children}</div>
    </div>
  );
}
