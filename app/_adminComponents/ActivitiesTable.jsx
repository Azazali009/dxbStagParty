"use client";
import { useState } from "react";
import ActivityGrid from "../_adminComponents/ActivityGrid";
import ActivityList from "../_adminComponents/ActivityList";
import CreateActivityAndSearch from "./CreateActivityAndSearch";
import GridList from "./GridList";
import { motion, AnimatePresence } from "framer-motion";
export default function ActivitiesTable({ Activities }) {
  const [grid, setGrid] = useState(false);
  const [list, setList] = useState(true);
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
      <CreateActivityAndSearch />
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
            <ActivityList Activities={Activities} />
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
            <ActivityGrid Activities={Activities} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
