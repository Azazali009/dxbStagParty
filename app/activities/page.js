import Activities from "../_components/Activities";
import Spinner from "../_components/Spinner";
import ActivityHeroSection from "../_components/ActivityHeroSection";
import { Suspense } from "react";
import ActivityFilters from "../_components/ActivityFilters";
import AdrenalineActivities from "../_components/AdrenalineActivities";
import ChilAndLuxeActivity from "../_components/ChilAndLuxeActivity";
import HomeAndVillaActivities from "../_components/HomeAndVillaActivities";
import { getActivities, getActivity } from "../_lib/data-services";
import Image from "next/image";
import { BebasNeue, playfairDisplay } from "../layout";
import Link from "next/link";

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const searchQuery = searchParams?.search ?? "all";
  const groupSize = Number(searchParams?.groupSize ?? 0);
  const extractMinMax = (groupSize) => {
    const [min, max] = groupSize.split("-").map(Number);
    return { min, max };
  };
  const ActivitiesArray = await getActivities();
  const activity = await getActivity(66);
  // Get min & max across all activities
  const allSizes = ActivitiesArray.map((activity) =>
    extractMinMax(activity.group_size),
  );
  const minGroupSize = Math.min(...allSizes.map((size) => size.min));
  const maxGroupSize = Math.max(...allSizes.map((size) => size.max));

  return (
    <div className="mx-auto min-h-screen max-w-full antialiased">
      <ActivityHeroSection />
      {/* <SearchBar searchQuery={searchQuery} /> */}
      <ActivityFilters
        minGroupSize={minGroupSize}
        maxGroupSize={maxGroupSize}
        searchQuery={searchQuery}
        groupSize={groupSize}
      />
      {/* section 1 */}
      <section className="bg-red-100 py-20 text-navyBlue">
        <div className="space-y-6">
          <div className="w-1/2 p-6">
            <h2 className="text-4xl font-semibold uppercase leading-[1.3]">
              vip spotlight &mdash; the experience everyone talks about
            </h2>
          </div>
          <div className="relative flex h-[800px] flex-col items-start justify-end gap-4 bg-[url('/images/activity-vip-bg.png')] bg-cover bg-no-repeat p-8 text-softGold">
            {/* overlay */}
            <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-r from-black/40 to-transparent"></div>
            <h2 className="relative z-10 w-[60%] text-xl leading-[1.7]">
              Cruise dubai&apos;s coastline on your own private yacht-free-flow
              drinks, onboard tunes, and epic skyline views
            </h2>
            <Link
              href="/activities/25"
              className="relative z-10 block rounded-md bg-orange-600 px-6 py-3 font-medium uppercase text-softGold hover:bg-orange-700"
            >
              {" "}
              view yacht party details
            </Link>
          </div>
        </div>
      </section>
      {/* section 2 */}
      <AdrenalineActivities category={"adrenaline"} />
      {/* section 3 */}
      <section className="space-y-14 bg-reddish p-4 py-20">
        <div className="flex flex-col items-center gap-4">
          <h2
            className={`text-5xl ${BebasNeue.className} font-medium uppercase`}
          >
            big energy day to night &mdash;{" "}
            <span className="capitalize">
              dubai&apos;s ultimate party line-up{" "}
            </span>{" "}
          </h2>
          <p>
            From rooftop pools to bottle-service bangers, this is where the real
            party starts
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 p-6">
          {/* column 1 */}
          <div className="space-y-6">
            {ActivitiesArray.slice(0, 2).map((activity, index) => {
              return (
                <Link
                  href={`/activities/${activity.id}`}
                  key={activity.id}
                  className={`relative flex ${index === 0 ? "h-[500px] [transform:perspective(300px)_rotateY(-2deg)]" : "h-[450px] origin-left [transform:perspective(800px)_rotateY(3deg)]"} rotate-12 items-end overflow-hidden rounded-lg p-10`}
                >
                  {/* overlay */}
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
                  <Image
                    src={activity.image}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-3xl font-medium">
                    {activity.name}
                  </h2>
                </Link>
              );
            })}
          </div>

          {/* column 2 */}
          <div className="space-y-8">
            <div className="relative flex h-[300px] rotate-12 items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateX(2deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
              <h2 className="absolute left-5 top-5 z-20 rounded-full bg-black px-6 py-2 text-sm capitalize">
                staff favourite
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {ActivitiesArray.slice(0, 2).map((activity, index) => {
                return (
                  <Link
                    href={`/activities/${activity.id}`}
                    key={activity.id}
                    className="relative flex h-[500px] items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateX(1.5deg)_rotateY(-2deg)]"
                  >
                    {index === 1 && (
                      <p className="absolute left-4 top-4 z-20 rounded-full bg-black px-6 py-2">
                        Best for Day Drinking
                      </p>
                    )}
                    {/* overlay */}
                    <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                    <Image
                      src={activity.image}
                      fill
                      alt={activity.name}
                      className="object-cover"
                    />
                    <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
                      {activity.name}
                    </h2>
                  </Link>
                );
              })}
            </div>
            {/* 3 */}
            {ActivitiesArray.slice(0, 1).map((activity) => {
              return (
                <Link
                  href={`/activities/${activity.id}`}
                  key={activity.id}
                  className="relative !mt-16 block h-[250px] w-full origin-right overflow-visible [transform:perspective(200px)_rotateY(-5deg)_scale(1.4)_translateX(-1%)_rotateZ(4deg)]"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="mt-10 h-full w-full">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-transparent" />
                      <h2 className="absolute left-6 top-1/2 z-20 -translate-y-1/2 text-4xl font-bold leading-snug text-white">
                        {activity.name}
                      </h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="rounded-lg border-2 border-[#70592f] bg-[#70592f] px-6 py-2 text-lg capitalize duration-300 hover:bg-reddish">
            explore all party experience
          </button>
        </div>
      </section>
      {/* section 4 */}
      <ChilAndLuxeActivity category={"Chill & Luxe"} />
      {/* section 5 */}
      <HomeAndVillaActivities ActivitiesArray={ActivitiesArray} />
    </div>
  );
}

// <div className="relative z-30 -mt-6 flex h-[600px] items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateY(-3deg)]">
//             {/* overlay */}
//             <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
//             <Image
//               src={"/images/home-hero-bg.webp"}
//               fill
//               alt="image"
//               className="object-cover"
//             />
//             <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
//               Speed battles at Dubai&apos;s premier indoor karting arena
//             </h2>
//           </div>
//           {/* card 3 */}
//           <div className="relative -mt-14 flex h-[630px] origin-center items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateX(5deg)]">
//             {/* overlay */}
//             <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
//             <Image
//               src={"/images/home-hero-bg.webp"}
//               fill
//               alt="image"
//               className="object-cover"
//             />
//             <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
//               View all adrenaline
//             </h2>
//           </div>
