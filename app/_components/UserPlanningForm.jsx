"use client";
import { useRef, useState, useTransition } from "react";
import AttendeeEmailInputFields from "./AttendeeEmailInputFields";
import FormRow from "./FormRow";
import { cinzel } from "../layout";
import CalenderDaysIcon from "../svgIcons/CalenderDaysIcon";
import { addPlanning } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

export default function UserPlanningForm() {
  const [isPending, startTransition] = useTransition();
  const [startDate, setStartDate] = useState("");
  const [attendees, setAttendees] = useState(() =>
    Array(1)
      .fill(0)
      .map(() => ({ email: "", phone: "" })),
  );

  const datepickerRef = useRef(null);
  //   add attendee function
  const addAttendee = () => {
    setAttendees((prev) => [...prev, { email: "", phone: "" }]);
  };

  //   remove attendee function
  const removeAttendee = (index) => {
    setAttendees((prev) => prev.filter((_, i) => i !== index));
  };

  //   update attendee function
  const updateAttendee = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  //   handle submit
  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await addPlanningWithData(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success(
        "🎉 Your plan’s been saved! We’ll use it to make booking easier feel free to update it anytime from your profile.",
      );
    });
  }

  const addPlanningWithData = addPlanning.bind(null, { attendees, startDate });
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 rounded-xl border border-gray-800 p-6 sm:p-10">
      <div>
        <h1
          className={`${cinzel.className} text-2xl font-bold text-matalicGold sm:text-3xl lg:text-5xl`}
        >
          Build you own weekend
        </h1>
        <p className="text-neutral-500">
          Design your perfect weekend just the way you like it — from relaxing
          getaways to thrilling adventures, it&apos;s your time, your rules.
        </p>
      </div>
      <form
        action={async (formData) => handleSubmit(formData)}
        className="flex flex-col gap-6"
      >
        <FormRow label={"Start Date"}>
          <div className="relative w-full">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              placeholderText="Select a date and time"
              timeIntervals={30}
              dateFormat={"dd/MM/yyyy  hh:mm aa"}
              timeFormat="hh:mm aa"
              className="block !h-10 w-full rounded-md border border-gray-700 bg-transparent px-4 text-left font-semibold shadow-2xl focus:outline-none"
              calendarClassName="calender"
              minDate={new Date()}
              ref={datepickerRef}
              name="test"
            />
            <button
              type="button"
              onClick={() => datepickerRef.current.setOpen((prev) => !prev)}
              className={"absolute right-2 top-1/2 block -translate-y-1/2"}
            >
              <CalenderDaysIcon />
            </button>
          </div>
        </FormRow>
        <FormRow label={"Group Size"}>
          <input
            className="h-10 rounded-md border border-gray-700 bg-transparent p-2 outline-none focus:outline-matalicGold"
            type="text"
            name="groupSize"
            placeholder="2-6"
          />
        </FormRow>

        <>
          <AttendeeEmailInputFields
            attendees={attendees}
            updateAttendee={updateAttendee}
            removeAttendee={removeAttendee}
            minGroup={1}
          />

          <button
            className="inline-block w-fit rounded bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700 px-4 py-1.5 text-sm capitalize text-white hover:bg-gradient-to-tr"
            onClick={addAttendee}
            type="button"
          >
            + Attendee
          </button>
        </>
        <div>
          <button
            disabled={isPending}
            className="flex min-w-[100px] items-center justify-center rounded-md border border-matalicGold bg-transparent px-6 py-2 text-center font-semibold capitalize text-matalicGold duration-300 hover:bg-matalicGold hover:text-navyBlue hover:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-matalicGold"
          >
            {isPending ? <SpinnerMini /> : "submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
