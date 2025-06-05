import Image from "next/image";
import LinkButton from "./LinkButton";
import { cinzel, playfairDisplay } from "../layout";
import Link from "next/link";

export default function ActivityCard({ activity }) {
  const { image, name, id, description, duration, price, group_size } =
    activity;

  return (
    // card v5
    <div className="relative flex h-[500px] items-end justify-center overflow-hidden rounded-sm border border-matalicGold object-cover pb-8 2xl:h-[700px]">
      <Image src={image} fill alt={name} className="bg-center object-cover" />
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black"></div>
      <div className="relative z-10 space-y-4 p-4">
        <h2
          className={`${cinzel.className} text-balance text-2xl font-bold text-secondary`}
        >
          {name}
        </h2>
        <p className="">{description}...</p>
        <Link
          href={`/activities/${id}`}
          className="block w-fit rounded-sm border-2 border-matalicGold bg-transparent px-4 py-2 text-sm uppercase tracking-wider backdrop-blur duration-300 hover:bg-matalicGold hover:text-navyBlue"
        >
          Explore itinerary
        </Link>
      </div>
    </div>
  );
}
