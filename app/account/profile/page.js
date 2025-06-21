import UpdateProfile from "../../_components/UpdateProfile";
import { getCurrentUser } from "../../_lib/getCurrentUser";
export const revalidate = 0;
export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-10 bg-gray-800 p-2 py-10 text-softGold sm:p-6 lg:py-0">
      <UpdateProfile user={user} />
    </div>
  );
}
