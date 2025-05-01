import UpdateProfile from "../../_components/UpdateProfile";
import { createClient } from "../../_utils/supabase/server";
import { getCurrentUser } from "../../_lib/getCurrentUser";
export const revalidate = 0;
export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-10 bg-gray-800 p-6 text-softGold">
      <UpdateProfile user={user} />
    </div>
  );
}
