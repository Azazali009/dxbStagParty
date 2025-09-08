"use client";

import { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// helper: Postgres timestamptz in UTC → "YYYY-MM-DD HH:MM:SS.mmmmmm+00"
function toTimestamptzUTC(d, endOfDay = false) {
  if (!d) return "";
  const dt = new Date(d);
  if (endOfDay) {
    dt.setUTCHours(23, 59, 59, 999); // inclusive end of day
  } else {
    dt.setUTCHours(0, 0, 0, 0); // start of day
  }
  const yyyy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  const HH = String(dt.getUTCHours()).padStart(2, "0");
  const MM = String(dt.getUTCMinutes()).padStart(2, "0");
  const SS = String(dt.getUTCSeconds()).padStart(2, "0");
  const ms = String(dt.getUTCMilliseconds()).padStart(3, "0");
  const micro = ms + "000"; // pad to microseconds
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}.${micro}+00`;
}

export default function BlackoutRange({ range, setRange }) {
  const start = useMemo(() => toTimestamptzUTC(range?.from, false), [range]);
  const end = useMemo(() => toTimestamptzUTC(range?.to, true), [range]);

  return (
    <div className="rounded-md border border-neutral-700 bg-primary p-2">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        pagedNavigation
        numberOfMonths={2} // show two months side by side
        disabled={{ before: new Date() }} // optional: disable past dates
      />
      {/* hidden fields so formData still works */}
      <input type="hidden" name="blackout_start" value={start} />
      <input type="hidden" name="blackout_end" value={end} />
    </div>
  );
}
