import { getVotingSessionsByOrganiserId } from "../_lib/apiVotingSession";
import Button from "./Button";
import VotingListItems from "./VotingListItems";

export default async function VotingList({ user }) {
  const sessions = await getVotingSessionsByOrganiserId(user.id);

  if (!sessions || sessions?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
        <div className="mb-4 rounded-full bg-matalicGold/40 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-softGold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2h6v2m-7-4h8a2 2 0 002-2V7a2 2 0 00-2-2h-1l-2-2H9L7 5H6a2 2 0 00-2 2v4a2 2 0 002 2h1"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-matalicGold">
          No Voting Sessions Yet
        </h2>
        <p className="mt-2 max-w-sm text-neutral-500">
          You don’t have any voting session created. Start your first session
          and make the experience fun 🎉
        </p>
        <Button
          href="/account/create-vote"
          className={"block w-fit"}
          variation="gold"
        >
          Start Activity Vote
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-4 px-4 py-6">
      {sessions?.length > 0 && (
        <h1 className="mb-6 text-3xl font-semibold text-softGold">
          Voting Sessions
        </h1>
      )}

      <VotingListItems sessions={sessions} organiserId={user.id} />
      <div>
        <Button
          href="/account/create-vote"
          className={"block w-fit"}
          variation="gold"
        >
          Start Activity Vote
        </Button>
      </div>
    </div>
  );
}
