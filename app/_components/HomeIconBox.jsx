import Image from "next/image";
import React from "react";

export default function HomeIconBox({ icon, title, children }) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-t-full border-t-2 border-secondary p-4 py-10 text-center shadow-shadowOne duration-300 hover:shadow-none">
      <Image src={icon} height={500} width={500} alt="map" className="w-20" />

      <h1 className="text-lg font-semibold capitalize text-neutral-200 sm:text-xl">
        {" "}
        {title}
      </h1>
      <p className="text-balance leading-[1.7] text-neutral-400">{children}</p>
    </div>
  );
}
