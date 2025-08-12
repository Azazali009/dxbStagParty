import Image from "next/image";
import Button from "../../../../_components/Button";
import Countdown from "../../../../_components/Countdown";
import {
  getVotesBySessionId,
  getVotingSessionById,
} from "../../../../_lib/apiVotingSession";
import { getActivities } from "../../../../_lib/data-services";

export const revalidate = 0;
export default async function VotingSessionDetails({ params }) {
  const { voteId } = params;

  const [activities, session] = await Promise.all([
    getActivities(),
    getVotingSessionById(voteId),
  ]);

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-3xl font-semibold">Session not found</h1>
      </div>
    );
  }

  const isClosed = session.status === "closed";

  const votes = await getVotesBySessionId(session.id);
  const counts =
    votes?.reduce((acc, v) => {
      acc[v.activity_id] = (acc[v.activity_id] || 0) + 1;
      return acc;
    }, /** @type {Record<number, number>} */ ({})) || {};

  const winners = Array.isArray(session.result_activity_ids)
    ? session.result_activity_ids.map((n) => Number(n))
    : [];

  const ballotIds = (session.activity_ids || []).map((n) => Number(n));
  const ballotActivities =
    activities?.filter((a) => ballotIds.includes(a.id)) || [];

  const decorated = ballotActivities
    .map((a) => ({
      ...a,
      voteCount: counts[a.id] || 0,
      isWinner: winners.includes(a.id),
    }))
    .sort((a, b) => {
      if (isClosed) return b.voteCount - a.voteCount;
      return String(a.name).localeCompare(String(b.name));
    });

  const totalVotes = votes?.length || 0;
  const totalAttendees = session?.voter_contacts?.length || 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-2 text-3xl font-semibold">{session.title}</h1>

      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
        <span
          className={`rounded-full px-3 py-1 font-medium ${
            isClosed
              ? "bg-red-900/40 text-red-300"
              : "bg-yellow-900/40 text-yellow-300"
          }`}
        >
          {isClosed ? "Closed" : "Open for voting"}
        </span>

        <span className="text-gray-400">
          Votes:{" "}
          <b>
            {totalVotes} / {totalAttendees}
          </b>
        </span>

        <span className="text-gray-400">
          {isClosed ? (
            <>
              Session closed at:{" "}
              <b>
                {new Date(
                  session.closed_at || session.end_time,
                ).toLocaleString()}
              </b>
            </>
          ) : (
            <>
              Time remaining:{" "}
              <Countdown
                endTime={session?.end_time}
                isClosed={isClosed}
                intervalMs={1000} // update every second; change to 30000 for per-30s
              />{" "}
              (closes {new Date(session.end_time).toLocaleString()})
            </>
          )}
        </span>
      </div>

      <div className="rounded-lg border border-neutral-700 p-6 shadow-lg">
        <h2 className="text-xl font-medium">Activities</h2>

        <ul className="mt-4 space-y-4">
          {decorated.map((activity) => (
            <li
              key={activity.id}
              className={`flex w-full gap-4 rounded-md border p-4 shadow-2xl ${
                activity.isWinner ? "border-matalicGold" : "border-neutral-700"
              }`}
            >
              <div className="relative h-[84px] w-[112px] shrink-0 overflow-hidden rounded-md bg-neutral-800">
                <Image
                  src={activity?.bannerImage || "/default-activity-image.jpg"}
                  alt={activity.name || `Activity #${activity.id}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h4
                    className={`font-semibold ${
                      activity.isWinner
                        ? "text-matalicGold"
                        : "text-neutral-600"
                    }`}
                  >
                    {activity.name}
                  </h4>
                  <p
                    className={`text-sm ${activity?.isWinner ? "text-softGold" : "text-neutral-600"}`}
                  >
                    Votes: <b>{activity.voteCount}</b>
                  </p>
                </div>

                {isClosed && activity.isWinner && (
                  <Button className="!w-fit py-2.5 sm:text-sm" variation="gold">
                    Proceed to Booking
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {isClosed && totalVotes === 0 && (
          <p className="mt-4 text-sm text-gray-400">No votes were cast.</p>
        )}
      </div>
    </div>
  );
}
