import ActivitiesTable from "../../_adminComponents/ActivitiesTable";
import { getActivities } from "../../_lib/data-services";

export const revalidate = 0;
export default async function Page() {
  const Activities = await getActivities();
  return <ActivitiesTable Activities={Activities} />;
}
