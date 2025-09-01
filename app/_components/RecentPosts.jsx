"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RecentBlogs from "../_lib/blogApi";
import DesignBorder from "./DesignBorder";

export default function RecentPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecentPosts() {
      setLoading(true);
      const posts = await RecentBlogs();
      setBlogs(posts);
      setLoading(false);
    }
    fetchRecentPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold capitalize text-matalicGold lg:text-2xl">
        Recent posts
      </h2>
      <DesignBorder />
      <ul className="!mt-6 space-y-4">
        {blogs?.map((p) => (
          <li
            key={p.id}
            className="flex items-start gap-3 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Image
              src={p.image}
              alt={p.name}
              width={100}
              height={100}
              className="aspect-video rounded-md border border-neutral-700 object-cover"
            />

            <div className="flex-1">
              <Link
                href={`/blog/${p.id}`}
                className="line-clamp-2 text-sm font-medium text-gray-800 hover:underline dark:text-gray-200"
              >
                {p.name}
              </Link>
              {p.created_at ? (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(p.created_at).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
