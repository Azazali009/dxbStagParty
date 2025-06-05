import React from "react";
import { cn } from "../_lib/utils";

export default function FormRow({ children, label, className }) {
  return (
    <div className={cn("flex flex-col gap-2 text-xs xs:text-sm", className)}>
      <label
        className="text-[9px] font-medium capitalize xs:text-sm"
        htmlFor={children?.props?.id}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
