"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { getActivities } from "../_lib/data-services";

const ActivityContext = createContext();

export default function ActivityProvider({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [allActivities, setAllActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [groupSize, setGroupSize] = useState(0);
  const [dayTimeOptions, setDayTimeOptions] = useState([]);
  const [dayTime, setDayTime] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(0);
  const [budgetOptions, setBudgetOptions] = useState([]);

  // ✅ Sync with URL on mount
  useEffect(() => {
    const sizeFromUrl = Number(searchParams.get("groupSize")) || 0;
    const dayTimeFromUrl = searchParams.get("timing") || "";
    const categoryFromUrl = searchParams.get("category") || "";
    const budgetFromUrl = Number(searchParams.get("budget") || 0);

    setGroupSize(sizeFromUrl);
    setDayTime(dayTimeFromUrl);
    setCategory(categoryFromUrl);
    setBudget(budgetFromUrl);
  }, [searchParams]);

  // ✅ Sync to URL when value changes (from UI)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (groupSize > 0) {
      params.set("groupSize", groupSize);
    } else {
      params.delete("groupSize");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [groupSize, pathname, router, searchParams]);

  // Fetch activities on load
  useEffect(() => {
    async function fetchData() {
      const data = await getActivities();
      setAllActivities(data);

      // ✅ Extract unique dayTime values
      const uniqueDayTimes = Array.from(
        new Set(data.map((a) => a.dayTime).filter(Boolean)),
      );
      setDayTimeOptions(uniqueDayTimes);
      // ✅ Extract unique categories(activity type) values
      const uniqueCategories = Array.from(
        new Set(data.map((a) => a.category?.name).filter(Boolean)),
      );
      setCategoryOptions(uniqueCategories);

      // ✅ Extract unique budgets
      const uniqueBudgets = Array.from(
        new Set(data.map((a) => a.price).filter(Boolean)),
      );
      setBudgetOptions(uniqueBudgets);
    }

    fetchData();
  }, []);

  // Apply filter
  useEffect(() => {
    const filtered =
      allActivities.length > 0 &&
      allActivities?.filter((activity) => {
        // Group size logic
        const [min, max] = activity.group_size?.split("-").map(Number);
        const groupSizeMatch =
          groupSize === 0 || (groupSize >= min && groupSize <= max);

        // Daytime logic
        const dayTimeMatch =
          !dayTime || activity.dayTime?.toLowerCase() === dayTime.toLowerCase();

        // ✅ Category logic
        const categoryMatch =
          !category ||
          activity.category?.name?.toLowerCase() === category.toLowerCase();

        // ✅ Budget logic (example: exact match; adjust if you need ranges)
        const budgetMatch = budget === 0 || Number(activity.price) <= budget;

        return groupSizeMatch && dayTimeMatch && categoryMatch && budgetMatch;
      });

    setFilteredActivities(filtered);
  }, [groupSize, dayTime, allActivities, category, budget]);

  // Min/max values
  const groupSizeValues =
    allActivities.length > 0 &&
    allActivities
      ?.map((a) =>
        a.group_size
          ?.replace("–", "-") // replace en-dash with hyphen
          .split("-")
          .map(Number),
      )
      .filter((v) => v && v.length === 2 && !isNaN(v[0]) && !isNaN(v[1]));

  const minGroupSize =
    groupSizeValues.length > 0
      ? Math.min(...groupSizeValues.map((v) => v[0]))
      : 1;

  const maxGroupSize =
    groupSizeValues.length > 0
      ? Math.max(...groupSizeValues.map((v) => v[1]))
      : 40;

  return (
    <ActivityContext.Provider
      value={{
        filteredActivities,
        allActivities,
        groupSize,
        setGroupSize, // ✅ make available to context
        minGroupSize,
        maxGroupSize,
        dayTimeOptions,
        dayTime,
        setDayTime,
        categoryOptions,
        category,
        setCategory,
        budget,
        setBudget,
        budgetOptions,
        // loadMore,
        // visibleChunks,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (context === undefined)
    throw new Error("useActivity must be used inside ActivityProvider");
  return context;
}
