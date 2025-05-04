"use client";
import React, { useState } from "react";
import CreatePackageAndSearch from "./PackageHeader";
import Table from "./Table";
import PackageRow from "./PackageRow";

export default function Packages({ Packages }) {
  const [searchQuery, setSearchQuery] = useState("");
  const headers = ["", "Package ID", "Name", "Price", "Group Size", "Action"];
  return (
    <div className="space-y-6">
      <CreatePackageAndSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="p-4">
        <h1 className="mb-6 text-2xl font-semibold capitalize">all Packages</h1>
        <Table
          headers={headers}
          data={Packages}
          RowComponent={({ id, ...Package }) => (
            <PackageRow key={id} Package={{ id, ...Package }} />
          )}
        />
      </div>
    </div>
  );
}
