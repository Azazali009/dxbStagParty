"use client";
import React, { useTransition } from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import { deleteActivityAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

export default function DeleteActivity({ activityId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete this activity?"))
      startTransition(() => deleteActivityAction(activityId));
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
