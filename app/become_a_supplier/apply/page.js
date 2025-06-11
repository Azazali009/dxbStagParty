import React from "react";
import SupplierForm from "../../_adminComponents/SupplierForm";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <SupplierForm isForApply={true} />
    </div>
  );
}
