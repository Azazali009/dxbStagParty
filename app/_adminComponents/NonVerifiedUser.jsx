import React from "react";
import Table from "./Table";
import NonVerifiedUserRow from "./NonVerifiedUserRow";

export default function NonVerifiedUser({ headers, data }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold capitalize text-red-500">
        Non Verified Users
      </h2>
      <div className="overflow-hidden rounded-md border border-b-0 border-white/5">
        <Table
          headers={headers}
          data={data}
          RowComponent={({ id, ...user }) => (
            <NonVerifiedUserRow key={id} user={{ id, ...user }} />
          )}
        />
      </div>
    </div>
  );
}
