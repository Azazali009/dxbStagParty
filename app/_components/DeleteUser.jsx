"use client";
import React, { useTransition } from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import { deleteUserAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";

export default function DeleteUser({ userId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete this user?"))
      startTransition(async () => {
        const res = await deleteUserAction(userId);
        if (res?.error) return toast.error(res?.error);
      });
  }
  return (
    <button onClick={handleDelete} className="fill-red-600">
      {isPending ? <SpinnerMini /> : <TrashIcon />}
    </button>
  );
}
