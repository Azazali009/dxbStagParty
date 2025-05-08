import React from "react";
import SpinnerMini from "../_components/SpinnerMini";
import TrashIcon from "../svgIcons/TrashIcon";
import Link from "next/link";
import PencilIcon from "../svgIcons/PencilIcon";

export default function SupplierRow({ supplier }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center justify-items-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      <p>#{supplier.id}</p>
      <p>{supplier.name} </p>
      <p>{supplier.activity}</p>
      <p>{supplier.email}</p>
      <div className="flex items-center gap-2">
        <button className="fill-red-600 hover:opacity-70 disabled:cursor-not-allowed">
          {false ? <SpinnerMini /> : <TrashIcon />}
        </button>
        <Link href={`#`} className="fill-blue-500 hover:opacity-80">
          <PencilIcon />
        </Link>
      </div>
    </div>
  );
}
