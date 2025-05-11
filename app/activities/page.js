import Activities from "../_components/Activities";
import Spinner from "../_components/Spinner";
import ActivityHeroSection from "../_components/ActivityHeroSection";
import { Suspense } from "react";
import ActivityFilters from "../_components/ActivityFilters";
import { getActivities, getActivity } from "../_lib/data-services";
import Image from "next/image";
import { playfairDisplay } from "../layout";
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
          <div className="flex h-[600px] flex-col items-start justify-end gap-4 bg-[url('/images/home-hero-bg.webp')] p-8 text-softGold">
            <h2 className="w-[60%] text-xl leading-[1.7]">
              Cruise dubai&apos;s coastline on your own private yacht-free-flow
              drinks, onboard tunes, and epic skyline views
            </h2>
            <button className="block rounded-md bg-orange-600 px-6 py-3 font-medium uppercase text-softGold hover:bg-orange-700">
              {" "}
              view yacht party details
            </button>
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="bg-[#694621] py-20">
        <div className="mx-auto w-[95%]">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-semibold uppercase">adrenaline hts</h2>
            <p>Thrills that will make your stag legendary</p>
          </div>
          <div className="!mt-20 grid grid-cols-[1fr_0.9fr_1fr] items-start gap-x-12">
            {/* card 1 */}
            {ActivitiesArray.slice(0, 3).map((activity, index) => {
              return (
                <div
                  key={activity.id}
                  className={`relative flex origin-top items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateY(-5deg)] ${
                    index === 1
                      ? "h-[600px]"
                      : index === 2
                        ? "h-[630px]"
                        : "h-[500px]"
                  }`}
                >
                  {/* overlay */}
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
                  {/* book button */}
                  <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 hover:bg-navyBlue/60">
                    {" "}
                    <Link
                      className="pointer-events-none invisible translate-y-full rounded-md bg-reddish px-6 py-2 capitalize opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                      href={`/activities/${activity.id}`}
                    >
                      Book your slot
                    </Link>
                  </div>
                  <Image
                    src={activity.image}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-2xl font-medium">
                    {activity.name}
                  </h2>
                </div>
              );
            })}

            <div className="card tilted-card relative col-span-2 -mt-10 flex h-[400px] rotate-90 items-end overflow-hidden rounded-lg">
              {/* titl design */}
              <div className="absolute right-0 top-0 z-20 h-6 w-[50%] rounded-b-3xl rounded-r-none bg-[#694621]"></div>
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
            </div>
            {/* card 5 */}
            <div className="flex flex-col gap-6 self-center">
              <button className="block rounded-2xl bg-orange-700 p-6 text-3xl font-medium capitalize">
                explore all adrenaline activities
              </button>
              <p className="text-xl">or browse all 60+ stag activities</p>
            </div>
          </div>
        </div>
      </section>
      {/* section 3 */}
      <section className="space-y-14 bg-reddish p-4 py-20">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold uppercase">
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
                <div
                  key={activity.id}
                  className={`relative flex ${index === 0 ? "h-[400px] [transform:perspective(300px)_rotateY(-2deg)]" : "h-[300px] origin-left [transform:perspective(300px)_rotateY(2deg)]"} rotate-12 items-end overflow-hidden rounded-lg p-10`}
                >
                  {/* overlay */}
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                  <Image
                    src={activity.image}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-4xl font-medium">
                    {activity.name}
                  </h2>
                </div>
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
                  <div
                    key={activity.id}
                    className="relative flex h-[400px] origin-top items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateY(-3deg)]"
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
                  </div>
                );
              })}
            </div>
            {/* 3 */}
            {ActivitiesArray.slice(0, 1).map((activity) => {
              return (
                <div
                  key={activity.id}
                  className="relative flex h-[250px] origin-right items-center overflow-hidden rounded-lg p-6 [transform:perspective(800px)_rotateY(-3deg)]"
                >
                  {/* overlay */}
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                  <Image
                    src={activity.image}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-4xl font-medium leading-[1.5]">
                    {activity.name}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="rounded-lg border-2 border-orange-700 bg-orange-700 px-6 py-2 capitalize duration-300 hover:bg-reddish">
            explore all party experience
          </button>
        </div>
      </section>
      {/* section 4 */}
      <section className="relative space-y-14 bg-red-100 p-4 py-20">
        <div className="max-w-[50%] space-y-4 text-navyBlue">
          <h2
            className={`${playfairDisplay.className} text-4xl font-bold capitalize leading-[1.4]`}
          >
            Chill & Luxe &mdash;{" "}
            <span className="font-light">
              Because not everything has to be loud
            </span>{" "}
          </h2>
          <p className="leading-[1.8]">
            Balance out of the madness with experience that are stylish,scenic
            and seriously smooth.
          </p>
        </div>
        <div
          className={`h-12 ${playfairDisplay.className} flex w-fit items-center rounded-md bg-[#e5cbcb] px-6 text-lg font-light italic text-[#b29e9e]`}
        >
          <p>Not everything needs a shot and a strobe light</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {/* column 1 */}

          <div className="space-y-6">
            {ActivitiesArray.slice(0, 2).map((activity, index) => {
              return (
                <div
                  key={activity.id}
                  className={`relative flex ${index === 0 ? "h-[400px] [transform:perspective(300px)_rotateX(-2deg)]" : "h-[350px] origin-left [transform:perspective(300px)_rotateY(1deg)]"} rotate-12 items-end overflow-hidden rounded-lg p-10`}
                >
                  {/* overlay */}
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                  <Image
                    src={activity.image}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-4xl font-medium">
                    {activity.name}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* column 2 */}
          <div className="space-y-8">
            <div className="relative flex h-[300px] rotate-12 items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateX(2deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={activity.image}
                fill
                alt={activity.name}
                className="object-cover"
              />
              <h2 className="relative z-20 text-lg font-semibold capitalize">
                {activity.name}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {ActivitiesArray.slice(0, 2).map((activity, index) => {
                return (
                  <div
                    key={activity.id}
                    className={`relative flex h-[400px] items-end overflow-hidden rounded-lg p-6 ${index === 0 && "[transform:perspective(300px)_rotateX(4deg)]"}`}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="rounded-lg bg-[#e5cbcb] px-6 py-2 capitalize text-navyBlue duration-300 hover:bg-reddish hover:text-white">
            explore all chill & luxe
          </button>
          <Link className="text-sm text-navyBlue hover:underline" href={"#"}>
            Or view the full activity list
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 z-50 h-12 w-full bg-red-100"></div>
      </section>
      {/* section 5 */}
      <section className="relative space-y-14 bg-red-100 p-4 py-20">
        <div className="mx-auto max-w-[50%] space-y-4 text-center text-navyBlue">
          <h2
            className={`${playfairDisplay.className} text-4xl font-bold uppercase leading-[1.4]`}
          >
            Home & Villa Friendly
          </h2>
          <h3 className="text-xl font-medium">
            Turn Your Crib Into the Main Event
          </h3>
          <p className="leading-[1.8]">
            Private chefs,cocktail masters, game nights, and more all brought
            straight to you
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* column 1 */}

          <div className="space-y-2">
            {ActivitiesArray.slice(0, 2).map((activity, index) => {
              return (
                <div
                  key={activity.id}
                  className={`relative flex ${index === 0 ? "h-[500px] [transform:perspective(600px)_rotateY(-3deg)]" : "h-[500px] origin-left [transform:perspective(600px)_rotateY(3deg)]"} rotate-12 items-end overflow-hidden rounded-xl p-10`}
                >
                  {/* overlay */}
                  <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                  <Image
                    src={activity.image}
                    fill
                    alt={activity.name}
                    className="object-cover"
                  />
                  <h2 className="relative z-20 text-4xl font-medium">
                    {activity.name}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* column 2 */}
          <div className="space-y-8">
            <div className="relative flex h-[400px] origin-right items-end overflow-hidden rounded-lg p-10 [transform:perspective(600px)_rotateY(-4deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={activity.image}
                fill
                alt={activity.name}
                className="object-cover"
              />
              <h2 className="relative z-20 text-lg font-semibold capitalize">
                {activity.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {ActivitiesArray.slice(0, 2).map((activity, index) => {
                return (
                  <div
                    key={activity.id}
                    className={`relative flex h-[400px] origin-top items-end overflow-hidden rounded-lg p-6 ${index === 0 ? "[transform:perspective(300px)_rotateX(4deg)_rotateY(4deg)]" : "[transform:perspective(500px)_rotateX(5deg)]"}`}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="rounded-lg bg-orange-700 px-6 py-2 capitalize text-softGold duration-300 hover:bg-reddish hover:text-white">
            see all Villa - Friendly Ideas
          </button>
          <Link className="text-sm text-navyBlue hover:underline" href={"#"}>
            Or view the full activity list
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 z-50 h-12 w-full bg-red-100"></div>
      </section>
      {/* <Suspense fallback={<Spinner />} key={groupSize}>
        <Activities
          ActivitiesArray={ActivitiesArray}
          searchQuery={searchQuery}
          groupSize={groupSize}
        />
      </Suspense> */}
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
