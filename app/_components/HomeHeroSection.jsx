import { cinzel } from "../layout";
import AnimatedHeading from "./AnimatedHeading";

export default function HomeHeroSection() {
  return (
    <section className="relative -mt-[110px] flex items-end justify-center gap-10 bg-[url('/images/home-hero-bg.webp')] bg-cover bg-no-repeat p-4 pb-10 pt-32 sm:min-h-[650px]">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>

      <div className="relative z-10 ml-12 flex flex-col items-center gap-2 text-center">
        <AnimatedHeading
          className={`text-left font-semibold md:text-6xl ${cinzel.className} uppercase !leading-[1.2] text-matalicGold`}
        >
          Where legends celebrate
        </AnimatedHeading>
        <p className="text-lg">
          Dubai most elite stag party expereinces &mdash;
          bold,bespoke,unforgetable
        </p>
        <button className="mt-8 rounded border border-matalicGold bg-matalicGold px-6 py-2 font-medium uppercase text-primary backdrop-blur-md duration-300 hover:bg-transparent hover:text-softGold hover:opacity-80">
          plan your party
        </button>
      </div>
    </section>
  );
}
