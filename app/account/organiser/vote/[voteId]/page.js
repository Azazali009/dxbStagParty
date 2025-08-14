import { getCurrentUser } from "../../../../_lib/getCurrentUser";
import Empty from "../../../../_components/Empty";
import VoteStatusBar from "../../../../_components/VoteStatusBar";
import VotingActivitiesList from "../../../../_components/VotingActivitiesList";
import {
  getVotesBySessionId,
  getVotingSessionById,
} from "../../../../_lib/apiVotingSession";
import { getActivities } from "../../../../_lib/data-services";

export const revalidate = 0;

export default async function VotingSessionDetails({ params }) {
  const user = await getCurrentUser();
  const { voteId } = params;

  const [activities, session] = await Promise.all([
    getActivities(),
    getVotingSessionById(voteId),
  ]);

  if (!session) {
    return <Empty name="Session" />;
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

      <VoteStatusBar
        totalAttendees={totalAttendees}
        totalVotes={totalVotes}
        session={session}
        isClosed={isClosed}
      />

      <VotingActivitiesList
        isClosed={isClosed}
        decorated={decorated}
        totalVotes={totalVotes}
        attendees={session?.voter_contacts}
        activities={decorated}
        user={user}
        session={session}
      />
    </div>
  );
}
