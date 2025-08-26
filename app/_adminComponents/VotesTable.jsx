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
        <TableRow key={id}>
          <p>{vote.session_id}</p>
          <div className="flex flex-col gap-2 justify-self-start text-xs">
            {vote.activity?.image && (
              <Image
                src={vote.activity.image}
                alt={vote.activity.name}
                width={500}
                height={500}
                className="aspect-video w-[100px] rounded border border-neutral-700 object-cover"
              />
            )}
            <span>{vote.activity?.name || "Unknown Activity"}</span>
          </div>
          <p className="line-clamp-1 text-xs">{vote.voter}</p>
          <p className="text-xs">{formatDateTime(vote.created_at)}</p>
        </TableRow>
      )}
    />
  );
}
