import BlogCategories from "../../_adminComponents/BlogCategories";
import Button from "../../_components/Button";
import React from "react";

export const revalidate = 0;

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
