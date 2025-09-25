import React from "react";
import BlogFilterAndTable from "../../_adminComponents/BlogFilterAndTable";
import DisplayBlogTable from "../../_adminComponents/DisplayBlogTable";

// meta data
export const metadata = {
  title: "Dashboard - Blogs",
  description:
    "Create, edit, and manage DXB Stag Party blog posts from your dashboard to share updates, tips, and event stories.",
};

export default function Page() {
  return (
    <div>
      <BlogFilterAndTable />

      <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 text-sm">
        <h1 className="mb-6 text-2xl font-semibold capitalize">all blogs</h1>
        <DisplayBlogTable />
      </div>
    </div>
  );
}
