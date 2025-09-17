import Image from "next/image";
import DesignBorder from "./DesignBorder";
import Link from "next/link";

export default function TopVotedActivities({ activities }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold capitalize text-matalicGold lg:text-2xl">
        Top Voted Activities
      </h2>
      <DesignBorder />
      <ul className="!mt-6 space-y-4">
        {activities.map((act) => (
          <li
            key={act.id}
            className="flex items-center gap-4 rounded-lg border border-gray-700 bg-gray-900"
          >
            {act.image && (
              <Image
                src={act.image}
                alt={act.name}
                width={100}
                height={100}
                className="aspect-square rounded-md border border-neutral-700 object-cover"
              />
            )}
            <div className="p-1">
              <Link
                href={`/activities/${act.id}`}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm font-semibold">{act.name}</span>
              </Link>
              <p className="text-xs text-gray-400">{act.votes} votes</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
