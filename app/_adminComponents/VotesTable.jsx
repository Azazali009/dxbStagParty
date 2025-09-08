import React from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import Image from "next/image";
import { formatDateTime } from "../_lib/helpers";

export default function VotesTable({ votes }) {
  const headers = ["SessionID", "Activity", "Voter", "Time"];
  return (
    <Table
      headers={headers}
      data={votes}
      RowComponent={({ id, ...vote }) => (
        <TableRow key={id} className={"text-xs lg:text-sm"}>
          <p>{vote.session_id}</p>

          <p className="text-center">
            {vote.activity?.name || "Unknown Activity"}
          </p>

          <p className="line-clamp-1 text-center">{vote.voter}</p>
          <p className="">{formatDateTime(vote.created_at)}</p>
        </TableRow>
      )}
    />
  );
}
