import React from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import TrashIcon from "../svgIcons/TrashIcon";
import PencilIcon from "../svgIcons/PencilIcon";
import Link from "next/link";
import DeleteBlogCategory from "./DeleteBlogCategory";

export default function BlogCategoriesTable({ categories }) {
  const headers = ["ID", "Blog", "Slug", "Actions"];
  return (
    <div>
      <Table
        headers={headers}
        data={categories}
        RowComponent={({ id, ...category }) => (
          <TableRow key={id}>
            <p>{id}</p>
            <p>{category.name}</p>
            <p>{category.slug}</p>
            <div className="flex items-center gap-4">
              <Link
                href={`/dashboard/settings/update-category/${id}`}
                className="fill-indigo-600"
              >
                <PencilIcon />
              </Link>
              <DeleteBlogCategory categoryId={id} />
            </div>
          </TableRow>
        )}
      />
    </div>
  );
}
