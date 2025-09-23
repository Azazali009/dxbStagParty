"use client";
import { useState, useTransition } from "react";
import FormRow from "../_components/FormRow";
import {
  addCatgeoryAction,
  updateCatgeoryAction,
} from "../_lib/blogCategoryAction";
import SpinnerMini from "../_components/SpinnerMini";
import toast from "react-hot-toast";

export default function CreateCategoryForm({ editId = null, data = {} }) {
  const [categoryName, setCategoryName] = useState(data?.name);
  const [categorySlug, setCategorySlug] = useState(data?.slug);
  const [loading, startTransition] = useTransition();

  function handleSubmit(formData) {
    startTransition(async () => {
      if (!editId) {
        const res = await addCatgeoryAction(formData);
        if (res?.error) return toast.error(res?.error);
        return toast.success(
          `New Category "${formData.get("name")}" added successfully.`,
        );
      } else {
        const res = await updateCatgeoryAction(formData);
        if (res?.error) return toast.error(res?.error);
        return toast.success(`Category updated successfully.`);
      }
    });
  }

  function generateSlug() {
    if (!categoryName) return;
    const slug = categoryName
      .toLowerCase() // lowercase
      .trim() // remove extra spaces
      .replace(/&/g, "and") // & ko 'and' bana do
      .replace(/[^a-z0-9\s-]/g, "") // special chars remove (except space/dash)
      .replace(/\s+/g, "-") // spaces → dash
      .replace(/-+/g, "-");
    setCategorySlug(slug);
  }

  return (
    <div className="space-y-14">
      <h1 className="mb-6 text-2xl font-semibold capitalize">
        {editId ? "Update category" : " add new blog category"}
      </h1>
      <form
        action={(formData) => handleSubmit(formData)}
        className="grid grid-cols-2 gap-8"
      >
        <FormRow label={"Catgeory Name"}>
          <input
            className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
            type="text"
            name="name"
            placeholder="Vip Access..."
            value={categoryName}
            defaultValue={data?.name}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormRow>

        <FormRow label={"Category Slug"}>
          <div className="relative w-full">
            <input
              className="h-10 w-full rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
              type="text"
              name="slug"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              placeholder="vip-access..."
              defaultValue={data?.slug}
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
        <input type="hidden" value={editId} name="categoryId" />
        <div className="[grid-column:1/-1]">
          <button
            disabled={loading}
            className="rounded-md bg-indigo-600 px-6 py-3 font-medium capitalize text-white hover:bg-indigo-700"
          >
            {!loading ? (
              editId ? (
                "+ update category"
              ) : (
                "+ add new category"
              )
            ) : (
              <span className="flex items-center gap-2">
                <SpinnerMini />
                <span>{editId ? "Updating..." : "Adding..."}</span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
