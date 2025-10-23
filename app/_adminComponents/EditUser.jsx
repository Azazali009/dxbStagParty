import React from "react";
import PencilIcon from "../svgIcons/PencilIcon";
import Link from "next/link";

export default function EditUser({ userId }) {
  return (
    <Link href={`users/update-user/${userId}`} className="fill-indigo-600">
      <PencilIcon />
    </Link>
  );
}
