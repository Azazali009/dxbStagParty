import { getActivities } from "../_lib/data-services";
import ActivityCard from "./ActivityCard";
import LinkButton from "./LinkButton";

export default async function HomeActivities() {
  const Activities = await getActivities();

  return (
    <section className="grid grid-cols-1 gap-4 p-4 py-20 md:grid-cols-2 lg:grid-cols-3">
      <div className="mb-8 space-y-3 text-center [grid-column:1/-1]">
        <h2 className="bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
          Explore our activities
        </h2>
        <p className="text-neutral-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, enim.
        </p>
      </div>
      {Activities?.slice(0, 5)?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
      <div className="mt-8 justify-self-center [grid-column:1/-1]">
        <LinkButton href={"/activities"}>See More &rarr;</LinkButton>
      </div>
    </section>
  );
}
