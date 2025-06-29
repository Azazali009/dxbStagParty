"use client";
import { useState, useTransition } from "react";
import FormRow from "../_components/FormRow";
import SubmitButton from "../_components/SubmitButton";
import { addBlog, editBlog } from "../_lib/blogAction";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toolbarOptions } from "../_lib/helpers";
import toast from "react-hot-toast";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: toolbarOptions,
};

export default function CreateBlogForm({ isEdit = false, blog = {} }) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(blog.blogContent || "");

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
    ? addBlog.bind(null, { value })
    : editBlog.bind(null, { value, blogId: blog.id });
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
          placeholder="blog"
          defaultValue={blog.name || ""}
        />
      </FormRow>

      <FormRow label={"Category"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="category"
          placeholder="blog"
          defaultValue={blog.category || ""}
        />
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
