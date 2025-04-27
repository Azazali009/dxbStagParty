import AnimatedHeading from "./AnimatedHeading";

export default function ActivityHeroSection() {
  return (
    <div className="relative -mt-[110px] flex h-[700px] min-h-screen flex-col justify-center gap-14 bg-[url('/images/activities-hero-bg.webp')] bg-cover bg-no-repeat px-8 py-20">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/20 via-black/20 to-primary"></div>
      <div className="relative z-10 max-w-[70%] space-y-6">
        <AnimatedHeading
          className={`text-nowrap pt-16 text-left text-xl font-bold !leading-[1.1] text-softGold sm:text-wrap md:text-6xl`}
        >
          {" "}
          Dubai most <br /> legendary stag party <br /> experiences
        </AnimatedHeading>
        <p className="">
          Over 60 epic activities, curated and ready to make your stag
          unforgetable.
        </p>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[50%] items-center gap-6 rounded-md bg-neutral-800/80 p-4">
        <button>Group Size</button>
        <select className="bg-transparent" name="" id="">
          <option value="">Day Time</option>
        </select>
        <button>Activity Type</button>
        <select className="bg-transparent" name="" id="">
          <option value="">Budget</option>
        </select>
      </div>
    </div>
  );
}
