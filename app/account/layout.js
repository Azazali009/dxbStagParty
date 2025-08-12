import AccountSidebar from "../_components/AccountSidebar";

export default function Layout({ children }) {
  return (
    <div className="grid min-h-dvh grid-cols-1 divide-x divide-neutral-700 border border-neutral-700 lg:grid-cols-[16rem_1fr]">
      <AccountSidebar />
      <div className="no-scrollbar h-full bg-navyBlue p-4">{children}</div>
    </div>
  );
}
