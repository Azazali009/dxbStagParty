import React from "react";
import TopVotedActivities from "./TopVotedActivities";
import RecentPosts from "./RecentPosts";
import SearchBox from "./SearchBox";
import CategoriesFilter from "./CategoriesFilter";

export default function DesktopSidebar({ mostPopular, categories }) {
  return (
    <aside
      data-lenis-prevent={true}
      className="sticky top-10 hidden space-y-14 rounded-xl border border-neutral-700 p-6 lg:block"
    >
      <TopVotedActivities activities={mostPopular} />
      <RecentPosts />
      <SearchBox />
      <CategoriesFilter categories={categories} />
    </aside>
  );
}
