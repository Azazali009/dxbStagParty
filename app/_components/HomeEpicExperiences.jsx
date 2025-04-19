"use client";
import Image from "next/image";
import { cinzel } from "../layout";
import { motion } from "framer-motion";

export default function HomeEpicExperiences() {
  return (
    <section className="mx-auto w-[95%] space-y-12 py-20">
      <h2
        className={`${cinzel.className} text-center text-2xl font-bold capitalize text-matalicGold sm:text-4xl`}
      >
        Epic stag experiences
      </h2>
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
              kick up cand, smash the throttle &mdash; this is fuir throttle
              dune mahem with crew
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
              Champagne, beats, and pangramic views &mdash; the ultimate
              pre-party at sea
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
              Go big or go home +1300 Off over the Palm with be chearing on
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
              five-stars steaks, Your own villa. No shirts require
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
            <p className="text-lg leading-[1.5]">serious belly laughs.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
