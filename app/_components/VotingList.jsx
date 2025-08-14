import { getVotingSessionsByOrganiserId } from "../_lib/apiVotingSession";
import VotingListItems from "./VotingListItems";

export default async function VotingList({ user }) {
  const sessions = await getVotingSessionsByOrganiserId(user.id);

  return (
    <div className="container mx-auto border-t border-neutral-700 px-4 py-6">
      <h1 className="mb-6 text-3xl font-semibold text-softGold">
        Voting Sessions
      </h1>

      <VotingListItems sessions={sessions} organiserId={user.id} />
    </div>
  );
}
