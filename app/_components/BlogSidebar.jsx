"use client";
import Image from "next/image";
import React, { useState } from "react";
import DesignBorder from "./DesignBorder";
import Link from "next/link";
import Humburger from "../svgIcons/Humburger";
import XMarkIcon from "../svgIcons/XMarkIcon";
import AuthorBox from "./AuthorBox";
import SearchBar from "./SearchBar";
import CategoriesFilter from "./CategoriesFilter";
import SearchBox from "./SearchBox";

export default function BlogSidebar({ author, categories }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <aside
        data-lenis-prevent={true}
        className="sticky top-10 hidden space-y-8 rounded-xl border border-neutral-700 p-6 lg:block"
      >
        <AuthorBox author={author} />
        <SearchBox />
        <CategoriesFilter categories={categories} />
      </aside>

      <button
        onClick={() => setShow((show) => !show)}
        className="relative z-20"
      >
        {!show ? <Humburger /> : <XMarkIcon />}
      </button>
      {show && (
        <aside className="absolute right-0 top-0 h-fit w-[70%] space-y-8 rounded-xl border border-neutral-700 bg-primary p-6 shadow-2xl">
          <AuthorBox author={author} />
          <SearchBox />
          <CategoriesFilter categories={categories} />
        </aside>
      )}
    </>
  );
}
