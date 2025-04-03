"use client";
import React, { useState } from "react";
import searchIcon from "@/public/images/search.png";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClearFilterButton from "./ClearFilterButton";

export default function SearchBar({ searchQuery }) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setSearch("");
  }
  return (
    <div className="w-full rounded-md border border-tertiary p-4 [grid-column:1/-1]">
      <form onSubmit={handleSearch} className="flex items-center gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block border-r-2 border-tertiary/20 bg-transparent p-2 focus:outline-none"
          type="text"
          placeholder="search activity..."
        />
        <button className="flex size-10 items-center justify-center rounded-md bg-primary p-2 shadow-shadowOne outline-none duration-300 hover:shadow-none focus:border-none focus:outline-secondary">
          <Image src={searchIcon} width={100} height={100} alt="search" />
        </button>
        {searchQuery && searchQuery !== "all" && <ClearFilterButton />}
      </form>
    </div>
  );
}
