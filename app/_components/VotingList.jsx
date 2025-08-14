import { getVotingSessionsByOrganiserId } from "../_lib/apiVotingSession";
import Button from "./Button";

export default async function VotingList({ user }) {
  const sessions = await getVotingSessionsByOrganiserId(user.id);

  return (
    <div className="container mx-auto border-t border-neutral-700 px-4 py-6">
      <h1 className="mb-6 text-3xl font-semibold text-softGold">
        Voting Sessions
      </h1>

      <div className="space-y-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`space-y-4 rounded-lg ${session.status === "open" ? "text-softGold" : "text-neutral-500"} border border-neutral-700 p-6 shadow-lg`}
          >
            <h2 className="text-xl font-medium">{session.title}</h2>

            <p className="mt-2">
              Status:{" "}
              <strong
                className={`rounded-full px-6 py-1 capitalize ${session.status === "open" ? "bg-green-900/80 text-green-300" : "bg-neutral-700/40 text-neutral-300"}`}
              >
                {session.status}
              </strong>
            </p>

            <p className="mt-2">
              Votes:{" "}
              <strong>
                {session?.result_json?.total_votes || 0} /{" "}
                {session?.voter_contacts?.length || 0}
              </strong>
            </p>

            <p className="mt-2">
              Voting ends at:{" "}
              <strong>{new Date(session.end_time).toLocaleString()}</strong>
            </p>

            {/* Show results only if session is closed */}
            {session.status === "closed" && (
              <div className="mt-4 border-t border-neutral-700 pt-4">
                <h3 className="mb-2 text-lg font-semibold text-softGold">
                  Results
                </h3>

                {session.activity_results?.length > 0 ? (
                  <ul className="space-y-1">
                    {session.activity_results.map((a) => (
                      <li
                        key={a.id}
                        className={`flex justify-between ${
                          a.isWinner
                            ? "font-bold text-matalicGold"
                            : "text-gray-300"
                        }`}
                      >
                        <span>{a.name}</span>
                        <span>{a.votes} vote(s)</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No votes received.</p>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center gap-4">
              <Button
                variation="gold"
                href={`/account/organiser/vote/${session.id}`}
                className="w-fit py-1.5 sm:text-sm"
              >
                View Details
              </Button>

              {session.status === "open" && (
                <span className="font-semibold text-matalicGold">
                  Open for voting
                </span>
              )}
              {session.status === "closed" && (
                <span className="font-semibold text-red-500">
                  Voting closed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
