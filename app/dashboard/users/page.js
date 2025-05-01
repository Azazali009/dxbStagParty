import UserTable from "../../_components/UserTable";
import AddUserAndSearch from "../../_adminComponents/AddUserAndSearch";

export const revalidate = 0;
export default async function Page() {
  return (
    <div className="space-y-10">
      <AddUserAndSearch />
      <UserTable />
    </div>
  );
}
