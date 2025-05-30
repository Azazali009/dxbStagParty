import React from "react";
import { playfairDisplay } from "../layout";
import Link from "next/link";
import { getBlogById } from "../_lib/blogApi";
import Image from "next/image";

export default async function BlogHero() {
  const blog = await getBlogById(15);

  return (
    <div className="relative h-[700px] overflow-hidden rounded-xl">
      <Image src={blog.image} fill alt={blog.name} className="object-cover" />
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-navyBlue/90 to-transparent"></div>
      <div className="relative z-10 flex min-h-[800px] w-[50%] flex-col justify-center gap-6 p-6">
        <p className="uppercase">{blog.category}</p>
        <h1
          className={`${playfairDisplay.className} text-8xl font-semibold capitalize leading-[1.3]`}
        >
          {blog.name}
        </h1>
        <p className="text-xl">{blog.description}</p>
        <div>
          <Link
            href={`/blog/${blog.id}`}
            className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-lg capitalize duration-300 hover:bg-reddish"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
