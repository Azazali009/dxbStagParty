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

  return <ActivitiesTableAndFilters Activities={Activities} />;
}
