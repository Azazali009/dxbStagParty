"use client";

import { useMemo, useState, useEffect } from "react";
import { useSupplier } from "../_context/SupplierProvider";

const DAYS = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

export default function HoursWeekly() {
  const { formData, setFormData } = useSupplier();

  const [hours, setHours] = useState(
    formData.available_hours
      ? JSON.parse(formData.available_hours)
      : Object.fromEntries(
          DAYS.map((d) => [d.key, { open: false, start: "", end: "" }]),
        ),
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      available_hours: JSON.stringify(hours),
    }));
  }, [hours, setFormData]);

  const copyToAll = (fromKey) => {
    const src = hours[fromKey];
    if (!src) return;
    const next = { ...hours };
    DAYS.forEach((d) => {
      next[d.key] = { open: src.open, start: src.start, end: src.end };
    });
    setHours(next);
  };

  return (
    <div className="space-y-3 rounded-md border border-neutral-700 bg-primary p-3">
      {DAYS.map(({ key, label }) => {
        const day = hours[key];
        return (
          <div
            key={key}
            className="grid grid-cols-[60px,auto,auto,auto] items-center gap-3"
          >
            <label className="text-sm">{label}</label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={day.open}
                onChange={(e) =>
                  setHours((h) => ({
                    ...h,
                    [key]: { ...h[key], open: e.target.checked },
                  }))
                }
              />
              <span className="text-sm">Open</span>
            </label>

            <input
              type="time"
              disabled={!day.open}
              value={day.start}
              onChange={(e) =>
                setHours((h) => ({
                  ...h,
                  [key]: { ...h[key], start: e.target.value },
                }))
              }
              className="w-full rounded-md border border-neutral-700 bg-primary px-3 py-2 disabled:opacity-50"
            />

            <div className="flex items-center gap-2">
              <input
                type="time"
                disabled={!day.open}
                value={day.end}
                onChange={(e) =>
                  setHours((h) => ({
                    ...h,
                    [key]: { ...h[key], end: e.target.value },
                  }))
                }
                className="w-full rounded-md border border-neutral-700 bg-primary px-3 py-2 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => copyToAll(key)}
                className="rounded border border-neutral-600 px-2 py-1 text-xs hover:bg-neutral-800"
                title="Copy this day's hours to all days"
              >
                Copy to all
              </button>
            </div>
          </div>
        );
      })}

      <input
        type="hidden"
        name="available_hours"
        value={formData.available_hours}
      />
    </div>
  );
}
