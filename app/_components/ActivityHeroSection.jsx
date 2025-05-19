import { BebasNeue } from "../layout";
import AnimatedHeading from "./AnimatedHeading";

export default function ActivityHeroSection() {
  return (
    <div className="relative -mt-[170px] flex h-[800px] min-h-screen items-center gap-14 bg-[url('/images/activity-page-bg.webp')] bg-cover bg-no-repeat px-8 py-20">
      <div className="relative z-10 space-y-6">
        <AnimatedHeading
          className={`text-balance pt-16 text-left text-xl !font-normal uppercase !leading-[1.1] text-softGold ${BebasNeue.className} sm:text-wrap md:text-7xl`}
        >
          {" "}
          Dubai&apos;s most legendary <br /> stag party experiences
        </AnimatedHeading>
        <p className="">60+ curated activities. One unforgettable weekend.</p>
      </div>
    </div>
  );
}
