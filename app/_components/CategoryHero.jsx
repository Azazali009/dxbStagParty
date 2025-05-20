import React from "react";
import { BebasNeue } from "../layout";

export default function CategoryHero({ categoryImage, categoryName }) {
  return (
    <div
      className="relative flex h-[400px] items-end gap-14 bg-cover bg-no-repeat px-8 pb-10 pt-20"
      style={{ backgroundImage: `url(${categoryImage})` }}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/60 to-transparent"></div>
      <h2
        className={`relative z-20 text-7xl font-bold capitalize text-softGold ${BebasNeue?.className}`}
      >
        {categoryName}
      </h2>
    </div>
  );
}
