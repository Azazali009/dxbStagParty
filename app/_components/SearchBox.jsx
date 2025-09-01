"use client";
import React, { useEffect, useMemo, useState } from "react";
import DesignBorder from "./DesignBorder";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import { getBlogs } from "../_lib/blogApi";
import Link from "next/link";
import Image from "next/image";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const fuse = useMemo(() => {
    return new Fuse(blogs, {
      keys: ["name", "description", "blogContent"],
      threshold: 0.3, // lower = stricter, higher = more fuzzy
    });
  }, [blogs]);

  const results = query
    ? fuse.search(query).map((result) => result.item)
    : blogs;

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await getBlogs();
      setBlogs(blogs);
    }
    fetchBlogs();
  }, [query]);
  return (
    <div className="relative space-y-2">
      <h2 className="text-sm font-semibold capitalize text-matalicGold lg:text-2xl">
        Search posts
      </h2>
      <DesignBorder />
      <div className="relative">
        <input
          placeholder="search posts..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="!mt-6 block h-12 w-full rounded-md bg-navyBlue px-2 outline-none focus:outline-matalicGold"
        />
        <AnimatePresence>
          {query && (
            <motion.div
              className="no-scrollbar absolute -bottom-2 left-0 max-h-[300px] w-full translate-y-full overflow-y-auto rounded bg-navyBlue p-4 shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: "100%" }}
              exit={{ opacity: 0, y: "110%" }}
              transition={{ duration: 0.8 }}
            >
              <ul className="space-y-3">
                {!results || results?.length === 0 ? (
                  <p className="text-center text-neutral-600">No post found</p>
                ) : (
                  results?.map((blog) => {
                    return (
                      <li key={blog.id} className="flex gap-2">
                        <Image
                          src={blog.image}
                          width={100}
                          height={100}
                          alt={blog.name}
                          className="aspect-video rounded-md border border-neutral-700 object-cover"
                        />
                        <div className="flex flex-col gap-1">
                          <Link
                            className="line-clamp-1 text-sm duration-300 hover:text-neutral-500 hover:underline"
                            href={`/blog/${blog.id}`}
                          >
                            {blog.name}
                          </Link>
                          <span className="text-xs font-medium text-neutral-600">
                            By {blog.users.fullName}
                          </span>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
