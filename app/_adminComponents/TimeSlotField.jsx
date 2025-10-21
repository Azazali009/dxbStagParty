import { useState } from "react";

export default function TimeSlotsField() {
  const [slots, setSlots] = useState([
    { label: "", duration: "", price: "", startTimes: "", daysAvailable: "" },
  ]);

  const addSlot = () => {
    setSlots([
      ...slots,
      { label: "", duration: "", price: "", startTimes: "", daysAvailable: "" },
    ]);
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const updateSlot = (index, key, value) => {
    const updated = [...slots];
    updated[index][key] = value;
    setSlots(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {slots.map((slot, index) => (
        <div key={index} className="rounded-lg border border-softGold/30 p-3">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name={`time_slots[${index}][label]`}
              placeholder="Label (e.g. 30 mins)"
              value={slot.label}
              onChange={(e) => updateSlot(index, "label", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="number"
              name={`time_slots[${index}][duration]`}
              placeholder="Minutes"
              value={slot.duration}
              onChange={(e) => updateSlot(index, "duration", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="number"
              name={`time_slots[${index}][price]`}
              placeholder="AED per person"
              value={slot.price}
              onChange={(e) => updateSlot(index, "price", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="text"
              name={`time_slots[${index}][startTimes]`}
              placeholder="Start times (10:00,11:30)"
              value={slot.startTimes}
              onChange={(e) => updateSlot(index, "startTimes", e.target.value)}
              className="rounded bg-navyBlue p-2"
            />
            <input
              type="text"
              name={`time_slots[${index}][daysAvailable]`}
              placeholder="Days (Fri,Sat,Sun)"
              value={slot.daysAvailable}
              onChange={(e) =>
                updateSlot(index, "daysAvailable", e.target.value)
              }
              className="rounded bg-navyBlue p-2"
            />
          </div>
          {slots.length > 1 && (
            <button
              type="button"
              onClick={() => removeSlot(index)}
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
