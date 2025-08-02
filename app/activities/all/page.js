import ActivityHeroSection from "../../_components/ActivityHeroSection";
import ActivityFilters from "../../_components/ActivityFilters";
import React from "react";
import ActivityGrid from "../../_components/ActivityGrid";

export default function Page() {
  return (
    <div>
      <ActivityHeroSection />
      <ActivityFilters />
      <ActivityGrid />
    </div>
  );
}
