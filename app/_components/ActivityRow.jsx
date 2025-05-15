import Image from "next/image";
import Link from "next/link";
import PencilIcon from "../svgIcons/PencilIcon";
import DeleteActivity from "./DeleteActivity";
export default function ActivityRow({ activity }) {
  return (
    <div className="grid grid-cols-9 items-center justify-items-center border border-b-0 border-white/5 px-2 py-2 text-center text-xs duration-300 odd:bg-navyBlue hover:bg-navyBlue">
      <Image src={activity.image} width={50} height={50} alt={activity.name} />
      <p className="">{activity.name}</p>
      <p className="">{activity.price}</p>
      <p className="">{activity.duration}</p>
      <p className="">{activity.destinations}</p>
      <p className="">{activity.group_size}</p>
      <p className="capitalize">
        {activity.supplier ? (
          activity.supplier?.name
        ) : (
          <span className="font-medium text-red-600">Not Assigned</span>
        )}
      </p>
      <div className="col-span-2 flex items-center justify-center gap-2 text-sm">
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
  );
}
