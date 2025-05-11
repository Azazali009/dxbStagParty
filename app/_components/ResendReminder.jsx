import React from "react";

export default function ResendReminder({ attempts, status }) {
  if (attempts > 1 || status === "paid") return null;
  if (attempts === 0)
    return (
      <div className="w-fit rounded-md bg-red-100 p-4">
        <p className="text-sm font-medium leading-[1.7] text-red-800">
          You have <strong> {attempts}</strong> attempt(s) remaining.
        </p>
      </div>
    );
  return (
    <div className="w-fit rounded-md bg-yellow-100 p-4">
      <p className="text-sm font-medium leading-[1.7] text-yellow-800">
        You have <strong> {attempts}</strong> attempt(s) remaining. Please be
        careful when using your last resend link.
      </p>
    </div>
  );
}
