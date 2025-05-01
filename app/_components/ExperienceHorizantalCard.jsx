"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function ExperienceHorizantalCard() {
  return (
    <div className="space-y-4">
      {/* card 1 */}
      <motion.div
        className="relative flex min-h-72 items-center justify-end object-cover p-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
      >
        <Image
          src={"/images/Experiences/desertBuggy.jpg"}
          fill
          alt={"desert buggy racing"}
          className="object-cover"
        />
        {/* overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent to-primary/20"></div>
        <div className="absolute left-4 top-4 flex h-10 w-32 items-center justify-center bg-red-600 text-white">
          <span className="block capitalize">Editor&apos;s pick</span>
        </div>
        <div className="relative z-10 max-w-[400px] space-y-3 text-right">
          <h3 className="text-2xl font-bold capitalize !leading-[1.3] text-matalicGold sm:text-5xl">
            desert buggy racing
          </h3>
          <p className="text-lg leading-[1.5]">
            Kick up sand, smash the throttle — this is full-throttle dune mayhem
            with the crew.
          </p>
        </div>
      </motion.div>
      {/* card 2 */}
      <motion.div
        className="relative flex min-h-72 items-center object-cover p-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
      >
        <Image
          src={"/images/Experiences/staff eavourite.jpg"}
          fill
          alt={"staff eavourite"}
          className="object-cover"
        />
        {/* overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/40 to-transparent"></div>
        {/* <div className="absolute left-4 top-4 flex h-10 w-32 items-center justify-center bg-red-600 text-white">
        <span className="block capitalize">staff eavourite</span>
      </div> */}
        <div className="relative z-10 mt-16 max-w-[400px] space-y-3">
          <h3 className="text-2xl font-bold capitalize !leading-[1.3] text-softGold sm:text-5xl">
            yacht cruising
          </h3>
          <p className="text-lg leading-[1.5]">
            Champagne, beats, and panoramic views — the ultimate pre-party at
            sea.
          </p>
        </div>
      </motion.div>
      {/* card 3 */}
      <motion.div
        className="relative flex min-h-72 items-center justify-end object-cover p-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
      >
        <Image
          src={"/images/Experiences/skydiving.jpg"}
          fill
          alt={"desert buggy racing"}
          className="object-cover"
        />
        {/* overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent to-primary/40"></div>
        <div className="absolute left-4 top-4 flex h-10 w-32 items-center justify-center bg-red-600 text-white">
          <span className="block capitalize">Editor&apos;s pick</span>
        </div>
        <div className="relative z-10 max-w-[400px] space-y-3 text-right">
          <h3 className="text-2xl font-bold capitalize !leading-[1.3] text-matalicGold sm:text-5xl">
            skydiving
          </h3>
          <p className="text-lg leading-[1.5]">
            Go big or go home — 1,300 ft off over the Palm, with us cheering you
            on!
          </p>
        </div>
      </motion.div>
      {/* card 4 */}
      <motion.div
        className="relative flex min-h-72 items-center justify-end object-cover p-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
      >
        <Image
          src={"/images/Experiences/private-chef.jpg"}
          fill
          alt={"private chef dinner"}
          className="object-cover"
        />
        {/* overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent to-primary/40"></div>
        <div className="absolute left-4 top-4 flex h-10 w-32 items-center justify-center bg-red-600 text-white">
          <span className="block capitalize">Editor&apos;s pick</span>
        </div>
        <div className="relative z-10 max-w-[400px] space-y-3 text-right">
          <h3 className="text-2xl font-bold capitalize !leading-[1.2] text-matalicGold sm:text-5xl">
            private chef dinner
          </h3>
          <p className="text-lg leading-[1.5]">
            Five-star steaks. Your own villa. No shirts required.
          </p>
        </div>
      </motion.div>
      {/* card 5 */}
      <motion.div
        className="relative flex min-h-72 items-center justify-end object-cover p-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
      >
        <Image
          src={"/images/Experiences/poolparty.jpg"}
          fill
          alt={"pool party"}
          className="object-cover"
        />
        {/* overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent to-primary/40"></div>
        <div className="absolute left-4 top-4 flex h-10 w-32 items-center justify-center bg-red-600 text-white">
          <span className="block capitalize">Editor&apos;s pick</span>
        </div>
        <div className="relative z-10 max-w-[400px] space-y-3 text-right">
          <h3 className="text-2xl font-bold capitalize leading-[1.2] text-matalicGold sm:text-5xl">
            pool party
          </h3>
          <p className="text-lg leading-[1.5]">
            Get ready for some serious belly laughs.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
