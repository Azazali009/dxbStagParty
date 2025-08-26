import React from "react";
import Table from "./Table";
import VotingSessionsRow from "./VotingSessionsRow";

export default function VotingSessionsTable({ sessions }) {
  const headers = ["Title", "Status", "Created", "End Time", "action"];
  return (
    <Table
      headers={headers}
      data={sessions}
      RowComponent={({ id, ...session }) => (
        <VotingSessionsRow key={id} session={{ id, ...session }} />
      )}
    />
  );
}
