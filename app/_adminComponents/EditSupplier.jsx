import Link from "next/link";
import React from "react";
import PencilIcon from "../svgIcons/PencilIcon";

export default function EditSupplier({ supplierId }) {
  return (
    <Link
      className="fill-indigo-600"
      href={`supplier/edit-supplier/${supplierId}`}
    >
      <PencilIcon />
    </Link>
  );
}
