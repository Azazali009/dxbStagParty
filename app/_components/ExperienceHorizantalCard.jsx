"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ExperienceHorizantalCard({
  desertBuggy,
  skyDiving,
  privateChef,
}) {
  const cardsData = [
    {
      id: desertBuggy.id,
      name: desertBuggy.name,
      description: desertBuggy.description,
      bannerImage: desertBuggy.bannerImage,
    },
    {
      id: skyDiving.id,
      name: skyDiving.name,
      description: skyDiving.description,
      bannerImage: skyDiving.bannerImage,
    },
    {
      id: privateChef.id,
      name: privateChef.name,
      description: privateChef.description,
      bannerImage: privateChef.bannerImage,
    },
    {
      id: 1001,
      name: "yacht cruising",
      description:
        "Champagne, beats, and panoramic views — the ultimate pre-party at sea.",
      bannerImage: "/images/Experiences/staff eavourite.jpg",
    },
    {
      id: 1002,
      name: "pool party",
      description: "Get ready for some serious belly laughs.",
      bannerImage: "/images/Experiences/poolparty.jpg",
    },
  ];
  return (
    <div className="space-y-4">
      {/* card 1 */}
      {cardsData.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={`relative flex min-h-60 items-center ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} justify-center object-cover p-6 sm:min-h-72 2xl:min-h-[450px]`}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
          >
            <Image
              src={card.bannerImage}
              fill
              alt={card.name}
              className="object-cover"
            />
            {/* overlay */}
            <div
              className={`absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black/20 via-primary/40 to-primary/40 ${index % 2 === 0 ? "md:bg-gradient-to-r" : "md:bg-gradient-to-l"}`}
            ></div>
            {/* <div className="absolute left-4 top-4 flex h-10 w-28 items-center justify-center bg-red-600 text-sm text-white sm:w-32 sm:text-base">
              <span className="block capitalize">Editor&apos;s pick</span>
            </div> */}
            <div
              className={`relative z-10 space-y-3 text-center md:max-w-[60%] md:space-y-6 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
            >
              <h3 className="text-lg font-bold capitalize !leading-[1.3] text-matalicGold xs:text-2xl sm:text-3xl md:text-3xl lg:text-5xl">
                {card.name}
              </h3>
              <p className="text-xs leading-[1.5] xs:text-sm md:text-lg">
                {card.description}
              </p>
              <Link
                className="inline-block rounded-md bg-[#E0B15E] px-6 py-2 text-sm font-medium capitalize text-navyBlue sm:text-base"
                href={`/activities/${card.id}`}
              >
                book now
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
