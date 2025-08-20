import { cinzel } from "../layout";
import AnimatedHeading from "./AnimatedHeading";
import bgImage from "../../public/images/home-hero-bg.webp";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { getCurrentUser } from "../_lib/getCurrentUser";
export default async function HomeHeroSection() {
  const user = await getCurrentUser();
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
        <div className="flex items-center gap-4">
          <Button variation="gold" className={"w-fit"} href={"/builder"}>
            Start Planning Your Stag Party
          </Button>
          {user && (
            <Button
              href="/account/create-vote"
              className={"w-fit"}
              variation="gold"
            >
              Start Activity Vote
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
