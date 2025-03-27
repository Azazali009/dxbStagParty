"use client";

import { useState } from "react";

export default function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <div className="">
      <p className="text-xs !leading-[2] sm:text-base">{displayText}</p>
      <button
        className="block font-medium capitalize text-neutral-600 underline underline-offset-4 duration-300 hover:text-stone-700"
        onClick={() => setIsExpanded((expand) => !expand)}
      >
        {isExpanded ? "show less" : "show more"}
      </button>
    </div>
  );
}
