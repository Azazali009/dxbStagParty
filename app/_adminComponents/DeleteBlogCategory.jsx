"use client";
import { useTransition } from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import { deleteBlogCategoryAction } from "../_lib/blogCategoryAction";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";

export default function DeleteBlogCategory({ categoryId }) {
  const [loading, startTransition] = useTransition();

  function handleClick() {
    if (
      confirm(
        "Are you sure you want to delete this category? Blogs linked to this category will remain, but their category field will be set to null.",
      )
    )
      startTransition(async () => {
        const res = await deleteBlogCategoryAction(categoryId);
        if (res?.error) return toast.error(res?.error);
        toast.success("Catgeory deleted successfully");
      });
  }
  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className="fill-red-600 text-red-600"
    >
      {loading ? <SpinnerMini /> : <TrashIcon />}
    </button>
  );
}
