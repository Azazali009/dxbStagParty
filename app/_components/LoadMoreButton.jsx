"use client";

import React from "react";
import { useActivity } from "../_context/ActivityProvider";

export default function LoadMoreButton({ totalChunks }) {
  const { loadMore, visibleChunks } = useActivity();

  if (visibleChunks >= totalChunks) return null;

  return (
    <div className="flex justify-center py-12 [grid-column:1/-1]">
      <button
        onClick={loadMore}
        className="rounded-lg bg-white px-8 py-3 text-lg font-medium text-navyBlue hover:opacity-80"
      >
        Load More
      </button>
    </div>
  );
}
