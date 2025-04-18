import Image from "next/image";
import { cinzel } from "../layout";
import clock from "../svgIcons/clock.svg";
import includes from "../svgIcons/includes.svg";
import user from "../svgIcons/user.svg";
import ActivityBanner from "./ActivityBanner";
import Link from "next/link";
export default function ActivityDetails({ activity }) {
  const {
    id,
    name,
    price,
    image,
    duration,
    minAge,
    destinations,
    description,
  } = activity;
  return (
    <>
      {/* header image banner */}
      <ActivityBanner activity={activity} />
      {/* overview section */}
      <section className="mx-auto grid w-[95%] max-w-7xl grid-cols-1 items-center justify-items-center gap-8 border-b border-navyBlue/30 py-14 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className={`${cinzel.className} text-4xl font-bold uppercase`}>
            Overview
          </h2>
          <p className={`leading-[1.9]`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ab
            eveniet et nam totam officia iusto. Quo ipsam minus placeat est
            obcaecati! Quas, earum sed placeat minima blanditiis sint fuga ullam
            ab ducimus velit, nam natus itaque voluptatum recusandae
            repellendus, ut dignissimos eum autem! Inventore autem molestiae
            consequatur explicabo facere.
          </p>
        </div>
        <Image
          src={"/images/food.jpg"}
          width={500}
          height={500}
          alt="food image"
          className="aspect-square h-[320px] object-cover"
        />
      </section>
      {/* details section */}
      <section className="mx-auto w-[95%] max-w-7xl space-y-8 border-b border-navyBlue/30 py-14">
        <h2 className={`${cinzel.className} text-4xl font-bold uppercase`}>
          details
        </h2>
        <div className="grid grid-cols-3 justify-items-start gap-6">
          {/* duration box */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image src={clock} height={25} width={25} alt="clock" />
              <span className="text-xl font-semibold uppercase text-matalicGold">
                Duration
              </span>
            </div>
            <p>3 hour</p>
          </div>
          {/* Group size box */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image src={user} height={25} width={25} alt="clock" />
              <span className="text-xl font-semibold uppercase text-matalicGold">
                Group size
              </span>
            </div>
            <p>4-20 people</p>
          </div>
          {/* includes box */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image src={includes} height={25} width={25} alt="clock" />
              <span className="text-xl font-semibold uppercase text-matalicGold">
                includes
              </span>
            </div>
            <p>Multi-course buffet</p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid w-[95%] grid-cols-2 gap-16 py-20">
        {/*  */}
        <div className="relative h-[400px] object-cover">
          <Image src={"/images/home-hero.webp"} fill alt="image" />
        </div>
        <div className="space-y-8">
          <h2
            className={`${cinzel.className} text-2xl font-bold text-matalicGold sm:text-5xl`}
          >
            Whats included
          </h2>
          <ul className="list-inside list-disc space-y-4 text-xl font-extralight capitalize">
            <li>multi-course buffet</li>
            <li>unlimited drinks</li>
            <li>live music or DJ</li>
            <li>reserved table</li>
          </ul>
          <Link
            href={"/contact"}
            className="inline-block rounded-md border border-b-2 border-matalicGold border-b-white bg-gradient-to-b from-primary to-navyBlue px-6 py-2 duration-300 hover:scale-105 hover:opacity-80"
          >
            contact us
          </Link>
        </div>
      </section>
    </>
  );
}
