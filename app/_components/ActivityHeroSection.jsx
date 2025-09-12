import { getCurrentUser } from "../_lib/getCurrentUser";
import { BebasNeue } from "../layout";
import AnimatedHeading from "./AnimatedHeading";
import Button from "./Button";

export default async function ActivityHeroSection() {
  const user = await getCurrentUser();
  return (
    <div className="relative -mt-[170px] flex min-h-[400px] items-end gap-14 bg-[url('/images/activity-page-bg.webp')] bg-cover bg-no-repeat px-8 pb-10 pt-20 sm:h-[600px] md:min-h-[850px]">
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
      {/* content */}
      <div className="relative z-10 flex flex-col items-start gap-3 sm:gap-6">
        <AnimatedHeading
          className={`text-balance pt-16 text-left text-xl !font-normal uppercase !leading-[1.1] text-softGold ${BebasNeue.className} text-3xl xs:text-4xl sm:text-wrap md:text-7xl`}
        >
          {" "}
          Dubai&apos;s most legendary <br /> stag party experiences
        </AnimatedHeading>
        <p className="">60+ curated activities. One unforgettable weekend.</p>
        <div className="flex w-full items-center gap-2">
          {user && (
            <Button href="/account/create-vote" variation="gold">
              Start Activity Vote
            </Button>
          )}
          <Button
            whenToShow={["/activities"]}
            variation="gold"
            href={"/activities/all"}
          >
            Explore all activities
          </Button>
        </div>
      </div>
    </div>
  );
}
