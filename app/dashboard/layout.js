import AdminSidebar from "../_components/AdminSidebar";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "../_lib/getCurrentUser";

export const revalidate = 0;

export default async function Layout({ children }) {
  const user = await getCurrentUser();

  if (user?.user_metadata?.role !== "admin") notFound();
  if (user?.user_metadata?.role === "admin")
    return (
      <div className="grid min-h-screen grid-cols-[16rem_1fr]">
        <AdminSidebar user={user} />

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
