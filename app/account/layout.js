import AccountSidebar from "../_components/AccountSidebar";

export default function Layout({ children }) {
  return (
    <div className="mt-6 grid h-full grid-cols-1 items-start gap-2 border border-gray-800 p-2 sm:p-4 lg:grid-cols-[16rem_1fr]">
      <AccountSidebar />
      <div className="">{children}</div>
    </div>
  );
}
