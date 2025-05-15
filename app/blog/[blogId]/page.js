import React from "react";
import { getBlogById, getBlogs } from "../../_lib/blogApi";
import Image from "next/image";
import { cinzel } from "../../layout";
import { sanitizeHtml } from "../../_lib/helpers";

export const revalidate = 0;
export async function generateStaticParams() {
  const blogs = await getBlogs();
  const ids = blogs.map((curBlog) => ({
    blogId: String(curBlog.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const { blogId } = params;
  const blog = await getBlogById(blogId);
  const { name, category, image, blogContent, users } = blog;

  const safeHtml = sanitizeHtml(blogContent);
  return (
    <div>
      <div className="flex items-center gap-6 p-8">
        <figure className="relative size-20 overflow-hidden rounded-full border-2 border-gray-600 bg-navyBlue">
          <Image
            src={users.avatar}
            fill
            alt={users.fullName}
            className="object-cover"
          />
        </figure>
        <div className="flex flex-col">
          <span className="font-semibold">Author</span>
          <span className="font-medium uppercase text-gray-500">
            {users.fullName}
          </span>
        </div>
      </div>
      <div className="relative flex min-h-[700px] items-center justify-center">
        {/* overlay */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent via-black/50 to-primary"></div>
        <Image src={image} fill alt={name} className="object-cover" />
        <h1
          className={`relative ${cinzel.className} z-10 text-7xl font-black capitalize text-matalicGold`}
        >
          {name}
        </h1>
        <div className="absolute left-8 top-8 w-fit animate-bounce rounded-bl-full rounded-tr-full bg-matalicGold px-6 py-2.5 font-semibold capitalize text-navyBlue">
          {category}
        </div>
      </div>

      <div
        className="max-w-4xl space-y-4 px-6 py-8 prose-h1:text-7xl prose-h1:font-semibold prose-h2:text-4xl prose-h2:font-semibold prose-p:font-light prose-p:leading-[1.7] prose-strong:font-semibold prose-ul:space-y-3 prose-li:font-light"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
}
