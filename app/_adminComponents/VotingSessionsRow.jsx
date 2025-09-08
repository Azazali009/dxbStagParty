import React from "react";
import { formatDateTime } from "../_lib/helpers";
import Link from "next/link";

export default function VotingSessionsRow({ session }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center justify-items-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      <p>{session.id}</p>
      <p>{session.title}</p>
      <p
        className={`rounded-full px-4 py-1.5 font-medium capitalize ${session.status === "closed" ? "bg-neutral-700" : "bg-green-700"}`}
      >
        {session.status}{" "}
      </p>
      <p className="line-clamp-1 text-center text-xs">
        {formatDateTime(session.created_at)}
      </p>
      <p className="line-clamp-1 text-center text-xs">
        {formatDateTime(session.end_time)}
      </p>
      <Link
        href={`/dashboard/voting/sessions/${session.id}`}
        className="font-medium text-matalicGold hover:underline"
      >
        View
      </Link>
    </div>
  );
}
