import VoteReports from "../../../_adminComponents/VoteReports";
import { getVotingReports } from "../../../_lib/apiVotingSession";

export default async function Page() {
  const { results, trend } = await getVotingReports();

  return (
    <div className="p-6">
      <VoteReports results={results} trend={trend} />
    </div>
  );
}
