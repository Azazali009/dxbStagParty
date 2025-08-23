import Image from "next/image";
import React from "react";

export default function AuthorBox({ author }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src={author.avatar}
        width={500}
        height={500}
        alt={author.fullName}
        className="aspect-square size-[100px] rounded-full border border-neutral-700 object-cover md:size-[200px]"
      />
      <span>{author.fullName}</span>
    </div>
  );
}
