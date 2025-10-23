import { getUserById } from "../../../../_lib/apiUser";
import UserForm from "../../../../_adminComponents/UserForm";
import React from "react";

export default async function Page({ params }) {
  const userId = params.userId;

  const user = await getUserById(userId);

  return <UserForm userId={userId} user={user} />;
}
