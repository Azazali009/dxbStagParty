import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import Spinner from "../_components/Spinner";

export default async function Page() {
  const { user } = await auth();

  if (user?.role === "admin" && user?.role !== "user") {
    return redirect("/dashboard");
  }

  if (user?.role === "user" && user?.role !== "admin") {
    return redirect("/account");
  }

  return <Spinner />;
}
