import AdminSidebar from "../_components/AdminSidebar";
export default function Layout({ children }) {
  return (
    <div className="grid h-full min-h-screen grid-cols-[16rem_1fr] items-start">
      <AdminSidebar />
      <div className="h-full bg-white p-2">
        <header>header</header>
        <div>{children}</div>
      </div>
    </div>
  );
}
