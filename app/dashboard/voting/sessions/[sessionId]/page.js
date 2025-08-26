import Image from "next/image";
import { getVotingSessionDetail } from "../../../../_lib/apiVotingSession";

export default async function SessionDetailPage({ params }) {
  const { session, activities, voteMap } = await getVotingSessionDetail(
    params.sessionId,
  );

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-matalicGold md:text-4xl">
        {session.title}
      </h1>
      <p className="mb-2 text-gray-400">
        Status:{" "}
        <span className="font-semibold text-gray-200">{session.status}</span>
      </p>
      <p className="mb-6 text-gray-400">
        Created: {new Date(session.created_at).toLocaleString()}
      </p>

      <h2 className="mb-3 text-xl font-semibold">Activities in this session</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => (
          <div
            key={a.id}
            className="flex flex-col gap-1 rounded-lg border border-gray-700 bg-gray-900 p-4"
          >
            {a.bannerImage && (
              <Image
                src={a.bannerImage}
                alt={a.name}
                width={200}
                height={100}
                className="mb-3 h-40 w-full rounded object-cover"
              />
            )}
            <h3 className="text-base font-semibold">{a.name}</h3>
            <p className="line-clamp-3 text-sm text-gray-400">
              {a.description}
            </p>
            <p className="mt-auto text-sm font-semibold text-gray-300">
              Votes:{" "}
              <span className="text-matalicGold">{voteMap[a.id] || 0}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
