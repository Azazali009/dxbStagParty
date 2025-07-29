import { cinzel } from "../layout";
import AnimatedHeading from "./AnimatedHeading";
import bgImage from "../../public/images/home-hero-bg.webp";
import Image from "next/image";
import Link from "next/link";
export default function HomeHeroSection() {
  return (
    <section className="relative -mt-[110px] flex items-end justify-center gap-10 p-4 pb-10 pt-32 sm:min-h-[650px] 2xl:min-h-[800px] vl:min-h-[1000px]">
      {/* overlay */}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
      <Image
        src={bgImage}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        alt="home hero image"
        className="object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center sm:ml-12">
        <AnimatedHeading
          className={`text-center font-semibold md:text-6xl ${cinzel.className} text-2xl uppercase !leading-[1.2] text-matalicGold`}
        >
          Where legends celebrate
        </AnimatedHeading>
        <p className="text-xs xs:text-sm sm:text-lg">
          Dubai&apos;s most elite stag party experiences &mdash; bold, bespoke,
          unforgettable
        </p>
        <Link
          href={"/builder"}
          className="rounded border border-matalicGold bg-matalicGold px-6 py-2 text-xs font-medium uppercase text-primary backdrop-blur-md duration-300 hover:bg-transparent hover:text-softGold hover:opacity-80 xs:text-sm sm:mt-8 sm:text-base"
        >
          Start Planning Your Stag Party
        </Link>
      </div>
    </section>
  );
}
