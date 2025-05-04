import Packages from "../../_adminComponents/Packages";
import { getPackages } from "../../_lib/packagesApi";

export default async function page() {
  const PackagesArr = await getPackages();

  return <Packages Packages={PackagesArr} />;
}
