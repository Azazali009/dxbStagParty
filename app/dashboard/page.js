import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";

export default async function page() {
  const { user } = await auth();

  if (user.role !== "admin") redirect("/account");
  if (user.role === "admin") return <div className="">Admin dashboard</div>;
}
