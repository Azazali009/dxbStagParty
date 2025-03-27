"use client";
import React from "react";

export default function Tabs({ tabs, filter, setFilter }) {
  return (
    <ul className="scrollbar-hide tab-design mx-auto hidden w-full max-w-5xl snap-x snap-mandatory justify-start gap-4 !overflow-x-auto px-4 lg:flex">
      {tabs.map((tab) => (
        <li key={tab} className="snap-start">
          <button
            onClick={() => setFilter(tab)}
            className={`flex w-full min-w-max justify-center whitespace-nowrap rounded-full border-2 border-secondary px-6 py-2 text-sm capitalize transition-all duration-300 ${
              filter === tab ? "bg-secondary" : "bg-transparent"
            } hover:bg-secondary`}
          >
            {tab.split("-").join(" ")}
          </button>
        </li>
      ))}
    </ul>
  );
}
