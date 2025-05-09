import React from "react";
import EditSupplierForm from "../../../../_adminComponents/EditSupplierForm";
import { getSupplierById } from "../../../../_lib/apiSupplier";
export default async function Page({ params }) {
  const { supplierId } = params;
  const supplier = await getSupplierById(Number(supplierId));

  return (
    <div>
      <EditSupplierForm supplier={supplier} />
    </div>
  );
}
