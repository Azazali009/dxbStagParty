import { notFound, redirect } from "next/navigation";
import AdminActivityForm from "../../_components/AdminActivityForm";
import { auth } from "../../_lib/auth";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login"); // Not logged in
  }

  if (session.user.role !== "admin") {
    notFound(); // show not found page
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <AdminActivityForm />
    </div>
  );
}
