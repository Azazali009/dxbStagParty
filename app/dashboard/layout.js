import AdminSidebar from "../_components/AdminSidebar";
export default function Layout({ children }) {
  return (
    <div className="grid h-full min-h-screen grid-cols-[16rem_1fr] items-start gap-6">
      <AdminSidebar />
      <div className="h-full p-2">
        <header>header</header>
        <div>{children}</div>
      </div>
    </div>
  );
}
