import EditActivityForm from "../../../../_components/EditActivityForm";
import { getActivity } from "../../../../_lib/data-services";

export default async function Page({ params }) {
  const { editId } = params;
  const activity = await getActivity(editId);

  return <EditActivityForm activity={activity} />;
}
