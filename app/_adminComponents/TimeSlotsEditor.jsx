import { useState } from "react";

export default function TimeSlotsEditor({ initialSlots = [] }) {
  const [slots, setSlots] = useState(
    initialSlots.length
      ? initialSlots.map((s) => ({
          label: s.label || "",
          duration: s.duration_minutes || "",
          price: s.price_per_person || "",
          startTimes: (s.start_times || []).join(","),
          daysAvailable: (s.days_available || []).join(","),
        }))
      : [
          {
            label: "",
            duration: "",
            price: "",
            startTimes: "",
            daysAvailable: "",
          },
        ],
  );

  const addSlot = () => {
    setSlots([
      ...slots,
      { label: "", duration: "", price: "", startTimes: "", daysAvailable: "" },
    ]);
  };

  const removeSlot = (i) => {
    setSlots(slots.filter((_, idx) => idx !== i));
  };

  const updateSlot = (i, key, value) => {
    const updated = [...slots];
    updated[i][key] = value;
    setSlots(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {slots.map((slot, i) => (
        <div key={i} className="rounded border border-softGold/30 p-3">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name={`time_slots[${i}][label]`}
              placeholder="Label (e.g. 30 mins)"
              value={slot.label}
              onChange={(e) => updateSlot(i, "label", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="number"
              name={`time_slots[${i}][duration]`}
              placeholder="Minutes"
              value={slot.duration}
              onChange={(e) => updateSlot(i, "duration", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="number"
              name={`time_slots[${i}][price]`}
              placeholder="AED per person"
              value={slot.price}
              onChange={(e) => updateSlot(i, "price", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="text"
              name={`time_slots[${i}][startTimes]`}
              placeholder="Start times (10:00,11:30)"
              value={slot.startTimes}
              onChange={(e) => updateSlot(i, "startTimes", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="text"
              name={`time_slots[${i}][daysAvailable]`}
              placeholder="Days (Fri,Sat,Sun)"
              value={slot.daysAvailable}
              onChange={(e) => updateSlot(i, "daysAvailable", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
          </div>
          {slots.length > 1 && (
            <button
              type="button"
              onClick={() => removeSlot(i)}
              className="mt-2 text-xs text-red-400 hover:text-red-500"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addSlot}
        className="mt-2 rounded bg-softGold/10 px-3 py-1 text-softGold hover:bg-softGold/20"
      >
        + Add Time Slot
      </button>
    </div>
  );
}
