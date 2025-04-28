import { getUsers } from "../_lib/apiUser";
import TrashIcon from "../svgIcons/TrashIcon";
import DeleteUser from "./DeleteUser";
export default async function UserTable() {
  const users = await getUsers();
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold capitalize">All Users</h2>
      <div className="overflow-hidden rounded-md border border-b-0 border-white/5">
        <div className="grid grid-cols-4 justify-items-center bg-navyBlue py-2 text-sm">
          <p className="">User ID</p>
          <p className="">Username</p>
          <p>email</p>
          <p>Actions</p>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-4 justify-items-center border-b border-white/5 px-2 py-3 text-sm"
          >
            <p className="">{user.id.split("-")[0]}</p>
            <p className="text-left">{user.user_metadata.full_name}</p>
            <p>{user.email}</p>
            <DeleteUser userId={user.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
