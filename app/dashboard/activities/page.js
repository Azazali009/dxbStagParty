import ActivitiesTableAndFilters from "../../_adminComponents/ActivitiesTableAndFilters";
import { getActivities } from "../../_lib/data-services";

export const revalidate = 0;
export default async function Page() {
  const Activities = await getActivities();

  return <ActivitiesTableAndFilters Activities={Activities} />;
}
