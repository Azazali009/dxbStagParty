import AdminSidebar from "../_components/AdminSidebar";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "../_lib/getCurrentUser";
import UserInfo from "../_adminComponents/UserInfo";

export const revalidate = 0;

export default async function Layout({ children }) {
  const user = await getCurrentUser();
  const role = user?.user_metadata?.role;

  if (role !== "admin") notFound();

  return (
    <div className="grid min-h-screen grid-cols-[16rem_1fr]">
      <AdminSidebar user={user} />
      <div className="flex w-full flex-col">
        <UserInfo user={user} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
