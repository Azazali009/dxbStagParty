import UpdateProfile from "../../_components/UpdateProfile";
import { getCurrentUser } from "../../_lib/getCurrentUser";
export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="p-8">
      <UpdateProfile user={user} />
    </div>
  );
}
