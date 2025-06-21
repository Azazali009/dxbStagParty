"use client";

import { useEffect, useState } from "react";
import { getPackages } from "../_lib/packagesApi";
import { MultiSelect } from "react-multi-select-component";
import FormRow from "./FormRow";

export default function SelectPackages({
  setSelectedPackages,
  selectedPackages,
  packageId,
}) {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  // Effect to fetch packages
  useEffect(() => {
    async function fetchPackages() {
      setLoading(true);
      const fetchedPackages = await getPackages();
      setPackages(
        fetchedPackages
          ?.filter((pack) => pack.id !== packageId)
          ?.map((pack) => ({
            label: pack.name,
            value: pack.id,
            price: pack.price_band,
          })),
      );
      setLoading(false);
    }
    fetchPackages();
  }, []);

  // Show loading placeholder
  if (loading)
    return (
      <div className="h-20 w-full space-y-2">
        <div className="h-4 w-[200px] animate-pulse rounded-md bg-navyBlue"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-navyBlue"></div>
      </div>
    );

  return (
    <FormRow label={"Select Packages:"}>
      <MultiSelect
        options={packages}
        value={selectedPackages}
        onChange={(selected) => {
          setSelectedPackages([...selected]);
        }}
        labelledBy="Select Packages"
        className="custom-multi-select"
        hasSelectAll={false}
      />
    </FormRow>
  );
}
