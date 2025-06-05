import { getActivities } from "../_lib/data-services";
import { cinzel } from "../layout";
import ActivityCarousel from "./ActivityCarousel";

export default async function HomeActivities() {
  const Activities = await getActivities();
  return (
    <section className="mx-auto grid grid-cols-1 gap-x-4 gap-y-10 p-4 py-10 md:grid-cols-2 md:py-20 lg:grid-cols-4">
      <div
        className={`mb-8 flex flex-col text-center ${cinzel.className} items-center justify-center gap-3 [grid-column:1/-1]`}
      >
        <h2
          className={`text-matalicGold ${cinzel.className} text-2xl font-semibold sm:text-3xl md:text-6xl`}
        >
          signature stag styles
        </h2>
        <p className="text-base capitalize sm:text-2xl">
          Choose the style that matches your crew
        </p>
      </div>
      <ActivityCarousel Activities={Activities} />
    </section>
  );
}
