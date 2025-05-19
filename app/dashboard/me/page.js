import React from "react";
import { getCurrentUser } from "../../_lib/getCurrentUser";
import UpdateProfile from "../../_components/UpdateProfile";
export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div className="p-8">
      <UpdateProfile user={user} />
    </div>
  );
}
