"use client";
import { useState } from "react";
import ActivityGrid from "../_adminComponents/ActivityGrid";
import ActivityList from "../_adminComponents/ActivityList";
import CreateActivityAndSearch from "./CreatPackageAndSearch";
import GridList from "./GridList";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";

export default function ActivitiesTable({ Activities }) {
  const [grid, setGrid] = useState(false);
  const [list, setList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);
  // 🔍 Optional Synonym Mapping
  const synonymMap = {
    luxurious: "luxury",
    adventureous: "adventure",
    hiking: "trekking",
    campig: "camping",
  };

  // Normalize search term
  const normalizedQuery = searchQuery
    ? synonymMap[searchQuery.toLowerCase()] || searchQuery.toLowerCase()
    : "";

  // 🔍 Fuzzy search setup
  const fuse = new Fuse(Activities, {
    keys: ["name", "tags", "description"],
    threshold: 0.3,
  });

  // 🔍 Run fuzzy search or return all
  const searchedActivities =
    !normalizedQuery || normalizedQuery === ""
      ? Activities
      : fuse.search(normalizedQuery).map((res) => res.item);

  function handleGrid() {
    setGrid(true);
    setList(false);
  }
  function handleList() {
    setGrid(false);
    setList(true);
  }

  return (
    <div className="space-y-4">
      <CreateActivityAndSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <GridList
        handleGrid={handleGrid}
        handleList={handleList}
        list={list}
        grid={grid}
      />
      <AnimatePresence mode="wait">
        {list && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-4"
          >
            <ActivityList Activities={searchedActivities} />
          </motion.div>
        )}

        {grid && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ActivityGrid Activities={searchedActivities} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
