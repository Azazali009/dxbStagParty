"use client";
import React, { useTransition } from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import { deleteUserAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

export default function DeleteUser({ userId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete this user?"))
      startTransition(() => deleteUserAction(userId));
  }
  return (
    <button onClick={handleDelete} className="fill-red-600">
      {isPending ? <SpinnerMini /> : <TrashIcon />}
    </button>
  );
}
