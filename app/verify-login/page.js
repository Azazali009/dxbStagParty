import { redirect } from "next/navigation";
import Spinner from "../_components/Spinner";
import { getCurrentUser } from "../_lib/getCurrentUser";

export default async function Page() {
  const user = await getCurrentUser();

  // if (user?.role === "admin") {
  if (user?.user_metadata?.role === "admin") {
    redirect("/dashboard");
  }

  if (user?.user_metadata?.role === "organiser") {
    redirect("/activities");
  }
  if (user?.user_metadata?.role === "supplier") {
    redirect("/dashboard/activities");
  }

  // Optional fallback, in case user has no recognized role
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <Spinner />
      <p className="font-semibold text-gray-400">
        Redirecting you now. Please wait a moment...
      </p>
    </div>
  );
}
