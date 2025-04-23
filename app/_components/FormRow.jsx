import React from "react";
import { cn } from "../_lib/utils";

export default function FormRow({ children, label, className }) {
  return (
    <div className={cn("flex flex-col gap-2 text-sm", className)}>
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
