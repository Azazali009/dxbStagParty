import UserTable from "../../_components/UserTable";
import AddUserAndSearch from "../../_adminComponents/AddUserAndSearch";

export const revalidate = 0;

// meta data
export const metadata = {
  title: "Dashboard - Users",
  description:
    "View, manage, and update user accounts within the DXB Stag Party dashboard for smooth event planning and administration.",
};

export default async function Page() {
  return (
    <div className="space-y-10">
      <AddUserAndSearch />
      <UserTable />
    </div>
  );
}
