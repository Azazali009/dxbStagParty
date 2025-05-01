import { redirect } from "next/navigation";
import Spinner from "../_components/Spinner";
import { getCurrentUser } from "../_lib/getCurrentUser";
// import { auth } from "../_lib/auth";
// import { supabaseAdmin } from "../_lib/adminSupabase";

export default async function Page() {
  const user = await getCurrentUser();
  console.log(user);
  // if (user?.role === "admin") {
  if (user?.role === "admin") {
    redirect("/dashboard");
  }

  if (user?.role === "organiser") {
    redirect("/account");
  }

  // Optional fallback, in case user has no recognized role
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-3">
      <Spinner />
      <p className="text-gray-400">
        Redirecting you now. Please wait a moment...
      </p>
    </div>
  );
}
