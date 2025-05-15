import { BebasNeue } from "../layout";
import AnimatedHeading from "./AnimatedHeading";

export default function ActivityHeroSection() {
  return (
    <div className="relative -mt-[170px] flex h-[800px] min-h-screen items-end gap-14 bg-[url('/images/activity-page-bg.webp')] bg-cover bg-no-repeat px-8 py-20">
      <div className="relative z-10 mb-40 space-y-6">
        <AnimatedHeading
          className={`text-balance pt-16 text-left text-xl !font-normal uppercase !leading-[1.1] text-softGold ${BebasNeue.className} sm:text-wrap md:text-7xl`}
        >
          {" "}
          Dubai most legendary <br /> stag party experiences
        </AnimatedHeading>
        <p className="">60+ curated activities. One unforgettable weekend.</p>
      </div>
      {/* <div className="relative z-10 mx-auto flex max-w-[50%] items-center gap-6 rounded-md bg-neutral-800/80 p-4">
        <button>Group Size</button>
        <select className="bg-transparent" name="">
          <option value="">Day Time</option>
        </select>
        <button>Activity Type</button>
        <select className="bg-transparent" name="">
          <option value="">Budget</option>
        </select>
      </div> */}
    </div>
  );
}
