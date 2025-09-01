"use client";
import React, { useState } from "react";
import Humburger from "../svgIcons/Humburger";
import XMarkIcon from "../svgIcons/XMarkIcon";
import RecentPosts from "./RecentPosts";
import SearchBox from "./SearchBox";
import CategoriesFilter from "./CategoriesFilter";
import TopVotedActivities from "./TopVotedActivities";

export default function BlogMobileSidebar({ categories, mostPopular }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShow((show) => !show)}
        className="relative z-10 block lg:hidden"
      >
        {!show ? <Humburger /> : <XMarkIcon />}
      </button>
      {show && (
        <aside className="absolute right-0 top-0 h-fit w-[70%] space-y-8 rounded-xl border border-neutral-700 bg-primary p-6 shadow-2xl">
          <TopVotedActivities activities={mostPopular} />
          <RecentPosts />
          <SearchBox />
          <CategoriesFilter categories={categories} />
        </aside>
      )}
    </>
  );
}
