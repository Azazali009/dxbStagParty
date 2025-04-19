import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import Spinner from "../_components/Spinner";

export default async function Page() {
  const { user } = await auth();

  if (user?.role === "admin" && user?.role !== "user") {
    redirect("/dashboard");
  }

  if (user?.role === "user" && user?.role !== "admin") {
    redirect("/account");
  }
  if (!user)
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Spinner />
        <p>you are being redirected. please stay here.</p>
      </div>
    );
}
