import React from "react";
import Table from "./Table";
import VerifiedUserRow from "./VerifiedUserRow";

export default function VerifiedUsers({ headers, data }) {
  return (
    <div className="space-y-2">
      {" "}
      <h2 className="text-xl font-semibold capitalize">Verified Users</h2>
      <div className="overflow-hidden rounded-md border border-b-0 border-white/5">
        <Table
          headers={headers}
          data={data}
          RowComponent={({ id, ...user }) => (
            <VerifiedUserRow key={id} user={{ id, ...user }} />
          )}
        />
      </div>
    </div>
  );
}
