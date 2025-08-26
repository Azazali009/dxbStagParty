import VotingSessionsTable from "../../../_adminComponents/VotingSessionsTable";
import { getVotingSessions } from "../../../_lib/apiVotingSession";
import Link from "next/link";

export default async function SessionsPage() {
  const sessions = await getVotingSessions();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-bold">Voting Sessions</h1>
      <VotingSessionsTable sessions={sessions} />
    </div>
  );
}
