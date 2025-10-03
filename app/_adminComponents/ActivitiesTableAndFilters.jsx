"use client";
import { useState } from "react";
import ActivityGrid from "./ActivityGrid";
import ActivityList from "./ActivityList";
import CreateActivityAndSearch from "./CreatPackageAndSearch";
import GridList from "./GridList";
import ActivitySort from "./ActivitySort";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";

export default function ActivitiesTableAndFilters({ Activities, isAdmin }) {
  const [sort, setSort] = useState("");
  const [destinationSort, setDestinationSort] = useState("");
  const [grid, setGrid] = useState(false);
  const [list, setList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Sort by group size
  const groupSizeSortedActivities = [...searchedActivities];

  if (sort === "asc") {
    groupSizeSortedActivities.sort((a, b) => {
      const [minA, maxA] = a.group_size.split("-").map(Number);
      const [minB, maxB] = b.group_size.split("-").map(Number);

      if (minA !== minB) {
        return minA - minB; // pehle min value par sort
      } else {
        return maxA - maxB; // agar min barabar ho, to max par sort
      }
    });
  } else if (sort === "desc") {
    groupSizeSortedActivities.sort((a, b) => {
      const [minA, maxA] = a.group_size.split("-").map(Number);
      const [minB, maxB] = b.group_size.split("-").map(Number);

      if (minA !== minB) {
        return minB - minA; // pehle min value par sort (descending)
      } else {
        return maxB - maxA; // agar min barabar ho, to max par sort
      }
    });
  }

  // Sort by destination
  const destinatioSortedActivities = [...groupSizeSortedActivities];

  if (destinationSort === "destination-asc") {
    destinatioSortedActivities.sort((a, b) =>
      a.destinations.localeCompare(b.destinations),
    );
  } else if (destinationSort === "destination-desc") {
    destinatioSortedActivities.sort((a, b) =>
      b.destinations.localeCompare(a.destinations),
    );
  }

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

      {isAdmin && (
        <>
          <div className="flex items-center justify-between p-4">
            <ActivitySort
              sort={sort}
              setSort={setSort}
              destinationSort={destinationSort}
              setDestinationSort={setDestinationSort}
            />
            <GridList
              handleGrid={handleGrid}
              handleList={handleList}
              list={list}
              grid={grid}
            />
          </div>
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
                <ActivityList Activities={destinatioSortedActivities} />
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
                <ActivityGrid Activities={groupSizeSortedActivities} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
