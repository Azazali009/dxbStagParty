import VoteReports from "../../../_adminComponents/VoteReports";
import { getVotingReports } from "../../../_lib/apiVotingSession";

// meta data
export const metadata = {
  title: "Dashboard - Voting - reports",
  description:
    "Manage and monitor DXB Stag Party voting reports in your dashboard to let guests choose activities and customize their Dubai experience.",
};

export default async function Page() {
  const { results, trend } = await getVotingReports();

  return (
    <div className="p-6">
      <VoteReports results={results} trend={trend} />
    </div>
  );
}
