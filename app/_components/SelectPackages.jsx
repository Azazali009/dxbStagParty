import { useEffect, useState } from "react";
import FormRow from "../_components/FormRow";
import { getPackages } from "../_lib/packagesApi";

export default function SelectPackages({ setPackagePrice, packagePrice }) {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState(null);

  // effect to fetch packages for selection
  useEffect(() => {
    async function fetchPackages() {
      setLoading(true);
      const packages = await getPackages();
      setPackages(packages);
      setLoading(false);
    }
    fetchPackages();
  }, []);
  if (loading)
    return (
      <div className="h-20 w-full space-y-2">
        <div className="h-4 w-[200px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-tertiary"></div>
      </div>
    );
  return (
    <FormRow label={"Add packages"}>
      <select
        id="packages"
        value={packagePrice}
        onChange={(e) => setPackagePrice(e.target.value)}
        className="h-12 rounded-md bg-primary px-2 text-sm placeholder:text-sm focus:outline-blue-600"
      >
        <option value={0}>select packages</option>
        {packages?.map((pack) => (
          <option value={pack.price_band} key={pack.id}>
            {pack.name}
          </option>
        ))}
      </select>
    </FormRow>
  );
}
