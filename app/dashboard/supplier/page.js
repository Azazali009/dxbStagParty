import React from "react";
import Table from "../../_adminComponents/Table";
import SupplierRow from "../../_adminComponents/SupplierRow";
import { getSuppliers, getSupplierUsers } from "../../_lib/apiSupplier";
import CreateSupplierAndSearch from "../../_adminComponents/CreateSupplierAndSearch";

// meta data
export const metadata = {
  title: "Dashboard - Suppliers",
  description:
    "Manage and organize DXB Stag Party suppliers in your dashboard to ensure seamless coordination and top-quality event services.",
};

export default async function Page() {
  const suppliers = await getSupplierUsers();

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
