import { getCurrentUser } from "../../_lib/getCurrentUser";
import ActivitiesTableAndFilters from "../../_adminComponents/ActivitiesTableAndFilters";
import { getActivities } from "../../_lib/data-services";

export const revalidate = 0;

// meta data
export const metadata = {
  title: "Dashboard - Activities",
  description:
    "Manage, edit, and organize DXB Stag Party activities directly from your dashboard for a seamless planning experience.",
};

export default async function Page() {
  const Activities = await getActivities();
  const user = await getCurrentUser();

  const userRole = user?.user_metadata?.role;
  const isAdmin = userRole === "admin";
  return (
    <ActivitiesTableAndFilters isAdmin={isAdmin} Activities={Activities} />
  );
}
