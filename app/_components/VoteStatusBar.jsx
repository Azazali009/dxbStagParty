import React from "react";
import Countdown from "./Countdown";

export default function VoteStatusBar({
  session,
  isClosed,
  totalVotes,
  totalAttendees,
}) {
  return (
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
              {new Date(session.closed_at || session.end_time).toLocaleString()}
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
  );
}
