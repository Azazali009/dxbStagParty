import Packages from "../../_adminComponents/Packages";
import { getPackages } from "../../_lib/packagesApi";

// meta data
export const metadata = {
  title: "Dashboard - Packages",
  description:
    "Manage, edit, and organize DXB Stag Party packages directly from your dashboard for a seamless planning experience.",
};

export default async function page() {
  const PackagesArr = await getPackages();

  return <Packages Packages={PackagesArr} />;
}
