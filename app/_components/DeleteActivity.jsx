"use client";
import React, { useTransition } from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import { deleteActivityAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";

export default function DeleteActivity({ activityId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete this activity?"))
      startTransition(async () => {
        const res = await deleteActivityAction(activityId);

        if (res?.error) return toast.error(res?.error);
      });
  }
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete Activity"
      className="fill-red-700 capitalize duration-300 hover:translate-y-[2px] disabled:opacity-40"
    >
      {isPending ? <SpinnerMini /> : <TrashIcon />}
    </button>
  );
}
