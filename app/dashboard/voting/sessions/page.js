import VotingSessionsTable from "../../../_adminComponents/VotingSessionsTable";
import { getVotingSessions } from "../../../_lib/apiVotingSession";

// meta data
export const metadata = {
  title: "Dashboard - Voting - Session",
  description:
    "Manage and monitor DXB Stag Party voting sessions in your dashboard to let guests choose activities and customize their Dubai experience.",
};

export default async function SessionsPage() {
  const sessions = await getVotingSessions();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-bold">Voting Sessions</h1>
      <VotingSessionsTable sessions={sessions} />
    </div>
  );
}
