"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DownSvg from "../svgIcons/DownSvg";
import UpSvg from "../svgIcons/UpSvg";
import { AnimatePresence, motion } from "framer-motion";
export default function SearchBar() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    if (!search) return;
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setSearch("");
  }
  return (
    <div className="space-y-3">
      <div className="flex w-full items-center justify-between fill-softGold">
        <label className="block font-medium">Activity Type</label>
        <button onClick={() => setShow((show) => !show)}>
          {show ? <UpSvg /> : <DownSvg />}
        </button>
      </div>
      <AnimatePresence>
        {show && (
          <motion.form
            key="search-form"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onSubmit={handleSearch}
            className="flex h-12 max-w-lg items-center rounded-md bg-navyBlue px-4 shadow-lg"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block flex-1 bg-transparent p-2 placeholder:text-xs focus:outline-none"
              type="text"
              placeholder=" Glam, Beauty, Instagrammable, Photo, Luxury..."
            />

            <button className="flex size-8 items-center justify-center rounded-full bg-primary p-2 shadow-xl outline-none duration-300 hover:bg-transparent hover:shadow-none focus:border-none focus:outline-secondary">
              <Image
                src={"/images/search.png"}
                width={100}
                height={100}
                alt="search"
              />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
