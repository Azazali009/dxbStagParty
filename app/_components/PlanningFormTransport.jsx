import React from "react";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";

export default function PlanningFormTransport({ timeline }) {
  const {
    includeTransport,
    setIncludeTransport,
    transportHours,
    setTransportHours,
  } = usePartyBuilder();
  return (
    <div className="space-y-4 rounded-md border border-gray-700 bg-navyBlue p-6 text-white">
      <h2 className="text-2xl font-bold text-matalicGold">
        Transport Options 🚐
      </h2>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={includeTransport}
          onChange={(e) => setIncludeTransport(e.target.checked)}
        />
        Include transport between activities
      </label>

      {includeTransport && (
        <>
          <div className="flex items-center gap-2">
            <label className="text-sm">Estimated Travel Duration:</label>
            <input
              type="number"
              value={transportHours}
              min={0.5}
              max={3}
              step={0.5}
              onChange={(e) => setTransportHours(parseFloat(e.target.value))}
              className="w-16 rounded bg-gray-800 p-1 text-xs text-white"
            />
            <span className="text-xs text-gray-400">hours</span>
          </div>

          {/* 🚨 Show mismatch warnings per activity */}
          <div className="space-y-2 text-sm text-yellow-400">
            {timeline.map((item) => {
              const bufferMinutes = item.buffer || 60;
              const expectedMinutes = transportHours * 60;

              if (bufferMinutes < expectedMinutes) {
                return (
                  <p key={item.id}>
                    ⚠️ <strong>{item.name}</strong>: Buffer is {bufferMinutes}{" "}
                    mins, but you selected {expectedMinutes} mins for transport.
                    Consider adjust it.
                  </p>
                );
              }

              return null;
            })}
          </div>
        </>
      )}
    </div>
  );
}
