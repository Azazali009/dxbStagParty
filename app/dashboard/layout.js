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
      <div className="grid min-h-screen grid-cols-[16rem_1fr]">
        <AdminSidebar />

        <div className="flex h-screen w-full flex-col">
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    );
}
{
  /* <div className="grid grid-cols-[16rem_1fr] min-h-screen">

  <div className="sticky top-0 h-screen">
    <AdminSidebar />
  </div>


  <div className="flex flex-col w-full">
    <AdminHeader />
    <div className="p-4 overflow-y-auto">{children}</div>
  </div>
</div> */
}
