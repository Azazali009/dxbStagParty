import Image from "next/image";
import {
  getNonVerifiedUsers,
  getUsers,
  getVerifiedUsers,
} from "../_lib/apiUser";
import UserRow from "../_adminComponents/VerifiedUserRow";
import Table from "../_adminComponents/Table";
import NonVerifiedUser from "../_adminComponents/NonVerifiedUser";
import VerifiedUsers from "../_adminComponents/VerifiedUsers";

export default async function UserTable() {
  const users = await getVerifiedUsers();
  const nonVerifiedUsers = await getNonVerifiedUsers();

  const headers = ["", "User ID", "Username", "email", "Role", "Actions"];
  return (
    <div className="space-y-12 p-4">
      {nonVerifiedUsers.length > 0 && (
        <NonVerifiedUser headers={headers} data={nonVerifiedUsers} />
      )}
      {users?.length > 0 && <VerifiedUsers headers={headers} data={users} />}
    </div>
  );
}
