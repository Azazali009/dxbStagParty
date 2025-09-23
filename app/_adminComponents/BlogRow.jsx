"use client";
import Image from "next/image";
import Link from "next/link";
import SpinnerMini from "../_components/SpinnerMini";
import DeleteBlog from "../_adminComponents/DeleteBlog";
import PencilIcon from "../svgIcons/PencilIcon";
import TrashIcon from "../svgIcons/TrashIcon";

export default function BlogRow({ blog }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center gap-4 border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      <Image
        className="aspect-video rounded-md object-cover"
        src={blog.image || "/default-activity-image.jpg"}
        alt={blog.name}
        width={60}
        height={60}
      />
      <p>#{blog.id}</p>
      <p>{blog.name} </p>
      <p
        className={`${!blog?.blogCategories?.name && "font-medium text-red-600"}`}
      >
        {blog?.blogCategories?.name ?? "NA"}
      </p>
      <div className="flex items-center gap-2">
        <DeleteBlog id={blog.id} />
        <Link
          href={`/dashboard/blog/edit-blog/${blog.id}`}
          className="fill-blue-500 hover:opacity-80"
        >
          <PencilIcon />
        </Link>
      </div>
    </div>
  );
}
