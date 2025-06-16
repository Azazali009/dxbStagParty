import React from "react";
import SpinnerMini from "../_components/SpinnerMini";
import DeleteSupplier from "../_adminComponents/DeleteSupplier";
import TrashIcon from "../svgIcons/TrashIcon";
import Link from "next/link";
import PencilIcon from "../svgIcons/PencilIcon";

export default function SupplierRow({ supplier }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center justify-items-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      <p>#{supplier.id?.split("-")[0]}</p>
      <p>{supplier.fullName} </p>
      <p>{supplier.phone} </p>
      {/* <p>{supplier.activities.name}</p> */}
      <p>{supplier.email}</p>
      <div className="flex items-center gap-2">
        <DeleteSupplier supplierId={supplier.id} />
        {/* <Link
          href={`/dashboard/users/edit-user/${supplier.id}`}
          className="fill-blue-500 hover:opacity-80"
        >
          <PencilIcon />
        </Link> */}
      </div>
    </div>
  );
}
