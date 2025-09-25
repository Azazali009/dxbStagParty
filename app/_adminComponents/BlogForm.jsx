"use client";
import { useEffect, useState, useTransition } from "react";
import FormRow from "../_components/FormRow";
import SubmitButton from "../_components/SubmitButton";
import { addBlog, editBlog } from "../_lib/blogAction";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toolbarOptions } from "../_lib/helpers";
import toast from "react-hot-toast";
import { getBlogCategories } from "../_lib/blogApi";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: toolbarOptions,
};

export default function CreateBlogForm({ isEdit = false, blog = {} }) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(blog.blogContent || "");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedcategory] = useState(
    isEdit ? blog.blogCategories.id : "",
  );
  const [blogName, setBlogName] = useState(blog?.name || "");
  const [blogSlug, setBlogSlug] = useState(blog?.slug || "");

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await blogWithData(formData);

      if (res?.error) return toast.error(res?.error);
      !isEdit
        ? toast.success("Blog added successfully")
        : toast.success("Blog updated successfully");
    });
  };

  const blogWithData = !isEdit
    ? addBlog.bind(null, { value, selectedCategory })
    : editBlog.bind(null, { value, blogId: blog.id });

  // generate slug
  function generateSlug() {
    if (!blogName) return;
    const slug = blogName
      .toLowerCase() // lowercase
      .trim() // remove extra spaces
      .replace(/&/g, "and") // & ko 'and' bana do
      .replace(/[^a-z0-9\s-]/g, "") // special chars remove (except space/dash)
      .replace(/\s+/g, "-") // spaces → dash
      .replace(/-+/g, "-");
    setBlogSlug(slug);
  }
  // fetch blog categories
  useEffect(() => {
    async function fetchData() {
      const data = await getBlogCategories();
      setCategories(data);
    }
    fetchData();
  }, []);

  return (
    <form
      action={(formData) => handleSubmit(formData)}
      className="grid grid-cols-2 gap-x-16 gap-y-4 px-6 py-16"
    >
      <FormRow label={"Blog Title"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="name"
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
          placeholder="blog"
          defaultValue={blog.name || ""}
        />
      </FormRow>

      <FormRow label={"Blog Slug"}>
        <div className="relative w-full">
          <input
            className="h-10 w-full rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
            type="text"
            name="slug"
            value={blogSlug}
            onChange={(e) => setBlogSlug(e.target.value)}
            placeholder="blog-slug"
          />
          <button
            type="button"
            onClick={generateSlug}
            className="absolute right-2 top-1/2 inline-block -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 text-matalicGold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
      </FormRow>

      <FormRow label={"Category"}>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedcategory(e.target.value)}
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
        >
          <option value="">Select category</option>
          {categories?.map((cat) => {
            return (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </select>
      </FormRow>

      <FormRow label={"Blog Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="file"
          name="image"
        />
        <input type="hidden" name="existingImage" value={blog.image} />
      </FormRow>

      <FormRow label={"description"}>
        <textarea
          cols="30"
          rows="5"
          placeholder="description"
          className="rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          name="description"
          id="description"
          defaultValue={blog?.description || ""}
        ></textarea>
      </FormRow>

      <FormRow label={"Blog Content"} className={"![grid-column:1/-1]"}>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
          className="min-h-80 !rounded-md bg-navyBlue"
          defaultValue={blog.blogContent}
        />
      </FormRow>

      <div className="[grid-column:1/-1]">
        <SubmitButton>
          <span className="text-lg">{!isEdit ? "+" : ""}</span>
          <span> {!isEdit ? "add blog" : "update blog"}</span>
        </SubmitButton>
      </div>
    </form>
  );
}
