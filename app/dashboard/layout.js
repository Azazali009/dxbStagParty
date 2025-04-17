import AdminSidebar from "../_components/AdminSidebar";
import AdminHeader from "../_components/AdminHeader";
export const revalidate = 0;
export default function Layout({ children }) {
  return (
    <div className="grid h-full min-h-screen grid-cols-[16rem_1fr] items-start">
      <AdminSidebar />
      <div className="h-full">
        <AdminHeader />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
