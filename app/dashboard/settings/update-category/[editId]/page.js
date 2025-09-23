import { getCatgeoryById } from "../../../../_lib/blogApi";
import CategoryForm from "../../../../_adminComponents/CategoryForm";
import React from "react";

export const revalidate = 0;
export default async function Page({ params }) {
  const { editId } = params;
  const category = await getCatgeoryById(editId);

  return (
    <div className="p-8">
      <CategoryForm editId={editId} data={category} />
    </div>
  );
}
