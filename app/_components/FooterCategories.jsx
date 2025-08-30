import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { getCategories } from "../_lib/categoryApi";
import SpinnerMini from "./SpinnerMini";

export default function FooterCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);
  if (loading) return <SpinnerMini />;
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold">Top Categories</h2>
      <ul className="flex flex-col items-start gap-4">
        {categories?.map((cat) => (
          <li
            className="text-sm font-medium text-neutral-500 hover:underline"
            key={cat.id}
          >
            <Link href={`/activities/category/${cat.slug}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
