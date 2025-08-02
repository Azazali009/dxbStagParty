import { getCurrentUserPlanningData } from "../../_lib/apiPlanningSession";
import UpdateProfile from "../../_components/UpdateProfile";
import UpdateUserProfilePlanningForm from "../../_components/UpdateUserProfilePlanningForm";

import { getCurrentUser } from "../../_lib/getCurrentUser";

export const revalidate = 0;

export default async function Page() {
  const user = await getCurrentUser();
  const data = await getCurrentUserPlanningData(user.id);

  return (
    <div className="space-y-10 bg-navyBlue p-2 py-10 text-softGold sm:p-6 lg:py-20">
      <UpdateProfile user={user} />
      <UpdateUserProfilePlanningForm data={data} />
    </div>
  );
}
