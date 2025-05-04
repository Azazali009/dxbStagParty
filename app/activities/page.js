import Activities from "../_components/Activities";
import Spinner from "../_components/Spinner";
import ActivityHeroSection from "../_components/ActivityHeroSection";
import { Suspense } from "react";
import ActivityFilters from "../_components/ActivityFilters";
import { getActivities } from "../_lib/data-services";
import Image from "next/image";
import { playfairDisplay } from "../layout";

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const searchQuery = searchParams?.search ?? "all";
  const groupSize = Number(searchParams?.groupSize ?? 0);
  const extractMinMax = (groupSize) => {
    const [min, max] = groupSize.split("-").map(Number);
    return { min, max };
  };
  const ActivitiesArray = await getActivities();

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
      {/* section 2 */}
      <section className="bg-[#694621] py-20">
        <div className="mx-auto w-[95%]">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-semibold uppercase">adrenaline hts</h2>
            <p>Thrills that will make your stag legendary</p>
          </div>
          <div className="!mt-20 grid grid-cols-[1fr_0.9fr_1fr] items-start gap-x-12">
            {/* card 1 */}
            <div className="relative flex h-[500px] items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateY(-5deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
              <h2 className="relative z-20 text-2xl font-medium">
                Lock, load and aim for the stag
              </h2>
            </div>
            {/* card 2 */}
            <div className="relative z-30 -mt-6 flex h-[600px] items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateY(-3deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
              <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
                Speed battles at Dubai&apos;s premier indoor karting arena
              </h2>
            </div>
            {/* card 3 */}
            <div className="relative -mt-14 flex h-[630px] origin-center items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateX(5deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
              <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
                View all adrenaline
              </h2>
            </div>
            {/* card 4 */}
            <div className="card tilted-card relative col-span-2 -mt-10 flex h-[400px] items-end overflow-hidden rounded-lg">
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
              <p className="text-xl">or browse all 60% stag activities</p>
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
              dubai&apos;s ultimate party line0up{" "}
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
            <div className="relative flex h-[500px] rotate-12 items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateY(-2deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
              <h2 className="relative z-20 text-4xl font-medium">Pool Party</h2>
            </div>
            <div className="relative flex h-[300px] origin-left rotate-12 items-end overflow-hidden rounded-lg p-10 [transform:perspective(300px)_rotateY(2deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
              <h2 className="relative z-20 text-4xl font-medium">
                Beach Club Days
              </h2>
            </div>
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
              {/* 1 */}
              <div className="relative flex h-[400px] origin-top items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateY(-3deg)]">
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                <Image
                  src={"/images/home-hero-bg.webp"}
                  fill
                  alt="image"
                  className="object-cover"
                />
                <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
                  Beach Club days
                </h2>
              </div>
              {/* 2 */}
              <div className="relative flex h-[400px] origin-top items-end overflow-hidden rounded-lg p-6 [transform:perspective(300px)_rotateY(-3deg)]">
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
                <Image
                  src={"/images/home-hero-bg.webp"}
                  fill
                  alt="image"
                  className="object-cover"
                />
                <h2 className="relative z-20 text-2xl font-medium leading-[1.5]">
                  Bottomless Brunch
                </h2>
                <p className="absolute left-4 top-4 rounded-full bg-black px-6 py-2">
                  Best for Day Drinking
                </p>
              </div>
            </div>
            {/* 3 */}
            <div className="relative flex h-[250px] origin-right items-center overflow-hidden rounded-lg p-6 [transform:perspective(800px)_rotateY(-3deg)]">
              {/* overlay */}
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <Image
                src={"/images/home-hero-bg.webp"}
                fill
                alt="image"
                className="object-cover"
              />
              <h2 className="relative z-20 text-4xl font-medium leading-[1.5]">
                Nightlife DJ
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="rounded-lg border-2 border-orange-700 bg-orange-700 px-6 py-2 capitalize duration-300 hover:bg-reddish">
            explore all party experience
          </button>
        </div>
      </section>
      {/* section 4 */}
      <section className="space-y-14 bg-red-100 p-4 py-20 text-navyBlue">
        <div className="max-w-[50%] space-y-4">
          <h2
            className={`${playfairDisplay.className} text-4xl font-bold capitalize leading-[1.4]`}
          >
            Chill & Luxe &mdash;{" "}
            <span className="font-light">
              Because not everything has to be be loud
            </span>{" "}
          </h2>
          <p className="leading-[1.8]">
            Balance out of the madness with experience that are stylish,scenic
            and seriously smooth.
          </p>
        </div>
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
