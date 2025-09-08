"use client";
import React, { useTransition } from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import toast from "react-hot-toast";
import { deleteSupplier } from "../_lib/supplierAction";
import SpinnerMini from "../_components/SpinnerMini";
import { deleteUserAction } from "../_lib/actions";

export default function DeleteSupplier({ supplierId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete this supplier?"))
      startTransition(async () => {
        const res = await deleteUserAction(supplierId);
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
