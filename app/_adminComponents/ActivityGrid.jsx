import Image from "next/image";
import React from "react";
import DeleteActivity from "../_components/DeleteActivity";
import Link from "next/link";
import PencilIcon from "../svgIcons/PencilIcon";
import { cinzel } from "../layout";
import { formatToAED } from "../_lib/helpers";

export default function ActivityGrid({ Activities }) {
  if (Activities?.length <= 0)
    return <p className="p-4 text-center text-sm">No data found</p>;
  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-12 p-4">
      {Activities.map((activity) => {
        return (
          <div
            key={activity.id}
            className="relative flex h-52 items-end gap-2 overflow-hidden rounded p-3"
          >
            {/* overlay */}
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent via-primary/80 to-primary"></div>
            <Image
              className="object-cover"
              fill
              src={activity.image}
              alt={activity.name}
            />

            <div className="relative z-10 space-y-2 text-xs">
              <h3
                className={`text-sm leading-3 text-matalicGold ${cinzel.className} font-semibold`}
              >
                {activity.name}
              </h3>
              <p>{formatToAED(activity.price)}</p>
              <p>GS: {activity.group_size}</p>
              <div className="col-span-2 flex items-center gap-2 text-sm">
                <DeleteActivity activityId={activity.id} />
                <Link
                  title="Update Activity"
                  href={`/dashboard/activities/edit-activity/${activity.id}`}
                  className="capitaliz fill-sky-500 duration-300 hover:translate-y-[2px]"
                >
                  <PencilIcon />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
