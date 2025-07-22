import React from "react";
import UserPlanningForm from "../_components/UserPlanningForm";
import { getCurrentUser } from "../_lib/getCurrentUser";
import LoggedInMeesage from "../_components/LoggedInMeesage";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user)
    return (
      <div className="flex min-h-screen items-center justify-center">
        {" "}
        <LoggedInMeesage
          redirectTo={`/login?redirectTo=${encodeURIComponent("/build")}`}
        />
      </div>
    );
  return <UserPlanningForm />;
}
