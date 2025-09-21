import EditActivityForm from "../../../../_components/EditActivityForm";
import { getActivity } from "../../../../_lib/data-services";

export default async function Page({ params }) {
  const { slug } = params;
  const activity = await getActivity(slug);

  return <EditActivityForm activity={activity} />;
}
