import Image from "next/image";
import Link from "next/link";
import React from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import EyeIcon from "../svgIcons/EyeIcon";
export default function ActivityRow({ activity }) {
  return (
    <div className="grid grid-cols-8 items-center justify-items-center rounded-b-md border border-navyBlue/30 bg-transparent px-2 py-2 text-xs">
      <Image src={activity.image} width={50} height={50} alt={activity.name} />
      <p className="justify-self-start text-left">{activity.name}</p>
      <p className="">{activity.price}</p>
      <p className="">{activity.duration}</p>
      <p className="">{activity.destinations}</p>
      <p className="">{activity.group_size}</p>
      <div className="col-span-2 flex items-center justify-center gap-4 text-sm">
        <button className="capitalize text-red-700 duration-300 hover:translate-y-[2px]">
          <TrashIcon />{" "}
        </button>
        <Link
          href={`/dashboard/edit-activity/${activity.id}`}
          className="capitalize text-matalicGold duration-300 hover:translate-y-[2px]"
        >
          <EyeIcon />
        </Link>
      </div>
    </div>
  );
}
