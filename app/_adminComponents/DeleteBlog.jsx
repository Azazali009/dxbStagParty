"use client";
import { useTransition } from "react";
import SpinnerMini from "../_components/SpinnerMini";
import TrashIcon from "../svgIcons/TrashIcon";
import { deleteBlog } from "../_lib/blogAction";
import toast from "react-hot-toast";

export default function DeleteBlog({ id }) {
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    if (confirm("Are you sure you want to delete this blog?"))
      startTransition(async () => {
        const res = await deleteBlog(id);
        if (res?.error) return toast.error(res?.error);
      });
  }
  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="fill-red-600 hover:opacity-70 disabled:cursor-not-allowed"
    >
      {isPending ? <SpinnerMini /> : <TrashIcon />}
    </button>
  );
}
