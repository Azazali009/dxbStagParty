import Link from "next/link";
import { getActivities } from "../_lib/data-services";
import ActivityCard from "@/app/_components/ActivityCard";

export default async function HomeActivities() {
  const Activities = await getActivities();

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
        {Activities?.slice(0, 3)?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      <div className="col-span-3 mt-8 justify-self-center">
        <Link
          href={"/activities"}
          className="block w-full rounded-full bg-gradient-to-r from-secondary via-[#735d1d] to-secondary px-4 py-3 text-xs font-semibold capitalize text-white duration-300 hover:scale-95 hover:bg-gradient-to-br sm:px-8 sm:text-base"
        >
          See More
        </Link>
      </div>
    </div>
  );
}
