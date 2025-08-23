import React from "react";
import DesignBorder from "./DesignBorder";
import Link from "next/link";

export default function CategoriesFilter({ categories }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold capitalize text-matalicGold lg:text-2xl">
        Post Categories
      </h2>
      <DesignBorder />
      <ul className="!mt-8 space-y-5 text-sm font-medium lg:text-lg">
        {categories.map((cat) => {
          return (
            <li key={cat.id}>
              <Link
                href={`category/${cat.id}`}
                className="flex items-center gap-2 hover:text-matalicGold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
