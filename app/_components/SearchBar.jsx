"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
    <form
      onSubmit={handleSearch}
      className="flex h-12 max-w-lg items-center rounded-full bg-white px-4 shadow-lg"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block flex-1 bg-transparent p-2 placeholder:text-xs focus:outline-none"
        type="text"
        placeholder=" Glam, Beauty, Instagrammable, Photo, Luxury..."
      />

      <button className="flex size-8 items-center justify-center rounded-full bg-gray-200 p-2 shadow-xl outline-none duration-300 hover:scale-90 hover:shadow-none focus:border-none focus:outline-secondary">
        <Image
          src={"/images/search.png"}
          width={100}
          height={100}
          alt="search"
        />
      </button>
    </form>
  );
}
