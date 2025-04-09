import React from "react";

export default function FormRow({ children, label }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label
        className="text-sm font-medium capitalize"
        htmlFor={children?.props?.id}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
