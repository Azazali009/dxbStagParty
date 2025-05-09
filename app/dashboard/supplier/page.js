import React from "react";
import Table from "../../_adminComponents/Table";
import SupplierRow from "../../_adminComponents/SupplierRow";
import { getSuppliers } from "../../_lib/apiSupplier";
import CreateSupplierAndSearch from "../../_adminComponents/CreateSupplierAndSearch";
export default async function Page() {
  const suppliers = await getSuppliers();

  const headers = ["Supplier ID", "Name", "Phone", "Email", "Action"];
  return (
    <div className="space-y-4">
      <CreateSupplierAndSearch />
      <div className="p-4">
        <h1 className="mb-6 text-2xl font-semibold capitalize">
          all suppliers
        </h1>
        <Table
          headers={headers}
          data={suppliers}
          RowComponent={({ id, ...supplier }) => (
            <SupplierRow supplier={{ id, ...supplier }} key={id} />
          )}
        />
      </div>
    </div>
  );
}
