import AccountSidebar from "../_components/AccountSidebar";

export default function Layout({ children }) {
  return (
    <div className="mt-6 grid min-h-dvh grid-cols-1 items-start gap-2 border border-gray-800 p-2 sm:p-4 lg:grid-cols-[16rem_1fr]">
      <AccountSidebar />
      <div className="no-scrollbar max-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
