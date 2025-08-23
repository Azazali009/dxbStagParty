import React from "react";
import { playfairDisplay } from "../layout";
import Link from "next/link";
import { getBlogById } from "../_lib/blogApi";
import Image from "next/image";

export default async function BlogHero() {
  const blog = await getBlogById(15);

  return (
    <div className="relative flex h-[230px] items-end overflow-hidden rounded-xl xs:h-[400px] md:h-[600px] lg:h-[700px]">
      <Image src={blog.image} fill alt={blog.name} className="object-cover" />
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-navyBlue/90 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center gap-2 p-3 xs:gap-6 xs:p-6 md:w-[80%] lg:w-[50%]">
        <p className="text-xs uppercase xs:text-base">
          {blog.blogCategories?.name}
        </p>
        <h1
          className={`${playfairDisplay.className} text-3xl font-semibold capitalize leading-[1.3] sm:text-5xl md:text-8xl`}
        >
          {blog.name}
        </h1>
        <p className="text-xs xs:text-xl">{blog.description}</p>
        <div>
          <Link
            href={`/blog/${blog.id}`}
            className="inline-block rounded-lg border-2 border-[#70592f] bg-[#70592f] px-3 py-1 text-xs capitalize duration-300 hover:bg-reddish xs:px-6 xs:py-2 xs:text-lg"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
