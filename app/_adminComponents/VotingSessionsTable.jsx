"use client";
import React from "react";
import Table from "./Table";
import VotingSessionsRow from "./VotingSessionsRow";
import { useSupabaseSubscription } from "../_hooks/useSupabaseSubscription";

export default function VotingSessionsTable({ sessions }) {
  useSupabaseSubscription({
    table: "voting_sessions",
    filterKey: "voting-list",
  });
  const headers = ["ID", "Title", "Status", "Created", "End Time", "action"];
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
