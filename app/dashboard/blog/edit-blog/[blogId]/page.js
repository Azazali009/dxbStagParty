import React from "react";
import BlogForm from "../../../../_adminComponents/BlogForm";
import { getBlogById } from "../../../../_lib/blogApi";

export default async function Page({ params }) {
  const { blogId } = params;
  const blog = await getBlogById(Number(blogId));

  return <BlogForm isEdit={true} blog={blog} />;
}
