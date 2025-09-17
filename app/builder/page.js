import UserPlanningFormAndSummary from "../_components/UserPlanningFormAndSummary";
import { getCategories } from "../_lib/categoryApi";
import { getActivities } from "../_lib/data-services";
import { getCurrentUser } from "../_lib/getCurrentUser";

export default async function Page({ searchParams }) {
  const planningStep = Number(searchParams?.planningStep ?? 1);
  const user = await getCurrentUser();
  const activities = await getActivities();
  const categories = await getCategories();

  return (
    <div className="mt-8 p-0 sm:mt-0 sm:p-10">
      <UserPlanningFormAndSummary
        categories={categories}
        planningStep={planningStep}
        activities={activities}
        serverUser={user}
      />
    </div>
  );
}
