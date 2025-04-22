import AdminSidebar from "../_components/AdminSidebar";
import AdminHeader from "../_components/AdminHeader";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
export const revalidate = 0;
export default async function Layout({ children }) {
  const { user } = await auth();

  if (user.role !== "admin") redirect("/account");
  if (user.role === "admin")
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
