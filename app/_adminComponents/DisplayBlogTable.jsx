import React from "react";
import Table from "./Table";
import { getBlogs } from "../_lib/blogApi";
import BlogRow from "../_adminComponents/BlogRow";
export default async function DisplayBlogTable() {
  const blogs = await getBlogs();

  const headers = ["", "ID", "Name", "category", "action"];
  return (
    <div>
      <Table
        headers={headers}
        data={blogs}
        RowComponent={({ id, ...blog }) => (
          <BlogRow key={id} blog={{ id, ...blog }} />
        )}
      />
    </div>
  );
}
