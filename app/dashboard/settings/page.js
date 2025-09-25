import BlogCategories from "../../_adminComponents/BlogCategories";
import Button from "../../_components/Button";
import React from "react";

export const revalidate = 0;

// meta data
export const metadata = {
  title: "Dashboard - Settings",
  description:
    "Update your DXB Stag Party dashboard settings, manage account preferences, and configure your planning tools.",
};

export default function Page() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center gap-4">
        <Button
          className={"w-fit"}
          href={"/dashboard/settings/create-category"}
          variation="gold"
        >
          + add blog category
        </Button>
      </div>

      <BlogCategories />
    </div>
  );
}
