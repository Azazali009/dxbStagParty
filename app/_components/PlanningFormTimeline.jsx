import React from "react";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";

export default function PlanningFormTimeline({ timeline }) {
  const { setActivityBuffers } = usePartyBuilder();

  // handle activity buffer update
  const updateBuffer = (activityId, minutes) => {
    setActivityBuffers((prev) => ({
      ...prev,
      [activityId]: minutes,
    }));
  };
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-matalicGold sm:text-3xl">
        Timeline:
      </h2>

      {timeline.length === 0 ? (
        <p className="text-gray-400">
          No activities selected or start date missing.
        </p>
      ) : (
        <ul className="space-y-4">
          {timeline.map((item, i) => (
            <li
              key={i}
              className="rounded-md border border-gray-700 bg-navyBlue p-4 text-sm text-white"
            >
              {/* 🚨 Buffer warning */}
              {item.warning && (
                <p className="text-xs font-medium text-yellow-400">
                  {item.warning}
                </p>
              )}
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <div>
                  <span className="text-[9px] font-semibold leading-[0.2] sm:text-base">
                    {item.name}
                  </span>
                  <p className="text-[10px] text-gray-400 sm:text-xs">
                    {item.category?.name || "Activity"}
                  </p>
                </div>
                <div className="text-right text-xs sm:text-base">
                  <span>
                    {item.startTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {item.endTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="mt-1 flex items-center gap-2 text-xs sm:text-base">
                    <label className="text-xs">Buffer:</label>
                    <input
                      type="number"
                      min="0"
                      step="15"
                      value={item.userInput ?? 60}
                      onChange={(e) =>
                        updateBuffer(item.id, parseInt(e.target.value))
                      }
                      className="w-14 rounded bg-gray-800 p-1 text-xs text-white"
                    />
                    <span className="text-xs text-gray-400">min</span>
                  </div>
                </div>
              </div>
              {/* 🗺️ Map marker */}
              {item.destinations && (
                <>
                  <p className="mt-4 text-[9px] text-gray-300 sm:text-sm">
                    📍 {item.destinations}
                  </p>
                  <iframe
                    className="mt-2 w-full rounded-md bg-primary"
                    height="200"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      item.destinations,
                    )}&output=embed`}
                  ></iframe>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
