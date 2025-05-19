// app/verify-profile-click/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "../_lib/getCurrentUser";

export default async function Page() {
  const user = await getCurrentUser();

  if (user?.user_metadata?.role === "admin") {
    redirect("/dashboard");
  }

  if (user?.user_metadata?.role === "organiser") {
    redirect("/account");
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-3">
      <p>Redirecting...</p>
    </div>
  );
}
