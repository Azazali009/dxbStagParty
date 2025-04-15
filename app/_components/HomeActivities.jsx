import { getActivities } from "../_lib/data-services";
import { cinzel, playfairDisplay } from "../layout";
import ActivityCard from "./ActivityCard";
import LinkButton from "./LinkButton";

export default async function HomeActivities() {
  const Activities = await getActivities();
  return (
    <section className="grid grid-cols-1 gap-x-10 gap-y-10 p-4 py-20 md:grid-cols-2 lg:grid-cols-3">
      <div className="mb-8 flex items-center justify-between [grid-column:1/-1]">
        <div className="space-y-3">
          <h2
            className={`text-softGold ${cinzel.className} text-2xl font-bold sm:text-3xl md:text-5xl`}
          >
            What is your vibe
          </h2>
        </div>
        <div className="mt-8 justify-self-center [grid-column:1/-1]">
          <LinkButton href={"/activities"}>View All &rarr;</LinkButton>
        </div>
      </div>
      {Activities?.slice(0, 3)?.map((activity) => (
        <ActivityCard
          cinzel={cinzel}
          playfairDisplay={playfairDisplay}
          key={activity.id}
          activity={activity}
        />
      ))}
    </section>
  );
}
