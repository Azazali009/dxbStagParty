import Link from "next/link";
import { getActivities } from "../_lib/data-services";
import ActivityCard from "@/app/_components/ActivityCard";

export default async function HomeActivities() {
  const Activities = await getActivities();

  return (
    <section className="grid grid-cols-1 gap-8 p-4 py-20 md:grid-cols-2 lg:grid-cols-3">
      <div className="mb-8 space-y-3 text-center [grid-column:1/-1]">
        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
          Explore our activities
        </h2>
        <p className="text-neutral-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, enim.
        </p>
      </div>
      {Activities?.slice(0, 3)?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
      <div className="mt-8 justify-self-center [grid-column:1/-1]">
        <Link
          href={"/activities"}
          className="block w-full rounded-full bg-gradient-to-r from-secondary via-[#735d1d] to-secondary px-4 py-3 text-xs font-semibold capitalize text-white duration-300 hover:scale-95 hover:bg-gradient-to-br sm:px-8 sm:text-base"
        >
          See More
        </Link>
      </div>
    </section>
  );
}
