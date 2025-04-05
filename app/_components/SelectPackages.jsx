"use client";

import { useEffect, useState } from "react";
import { getPackages } from "../_lib/packagesApi";
import { MultiSelect } from "react-multi-select-component";
import FormRow from "./FormRow";

export default function SelectPackages({
  setSelectedPackages,
  selectedPackages,
}) {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  // Effect to fetch activities
  useEffect(() => {
    async function fetchPackages() {
      setLoading(true);
      const fetchedPackages = await getPackages();
      setPackages(
        fetchedPackages.map((act) => ({
          label: act.name,
          value: act.id,
          price: act.price_band,
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
        <div className="h-4 w-[200px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-tertiary"></div>
      </div>
    );

  return (
    <FormRow label={"Select Packages:"}>
      <MultiSelect
        options={packages}
        value={selectedPackages} // Keep it controlled
        onChange={(selected) => {
          setSelectedPackages([...selected]); // Ensure state update happens outside of render
        }}
        labelledBy="Select Packages"
        className="custom-multi-select"
      />
    </FormRow>
  );
}
