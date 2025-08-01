import React from "react";
import UserPlanningForm from "../_components/UserPlanningForm";
import { getCurrentUser } from "../_lib/getCurrentUser";
import LoggedInMeesage from "../_components/LoggedInMeesage";
import { getActivities } from "../_lib/data-services";
import { getCategories } from "../_lib/categoryApi";

export default async function Page({ searchParams }) {
  const planningStep = Number(searchParams?.planningStep ?? 1);
  const user = await getCurrentUser();
  const activities = await getActivities();
  const categories = await getCategories();

  return (
    <div className="p-4 sm:p-10">
      <UserPlanningForm
        categories={categories}
        planningStep={planningStep}
        activities={activities}
        serverUser={user}
      />
    </div>
  );
}
