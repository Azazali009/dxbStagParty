"use client";
import Image from "next/image";
import LinkButton from "./LinkButton";
import { motion } from "framer-motion";

export default function PackageCard({ pack, index }) {
  return (
    <motion.div
      key={pack.id}
      className={`relative flex min-h-80 items-center ${index % 2 === 0 ? "justify-end" : "justify-start"} object-cover p-6`}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
      }}
    >
      <Image src={pack.image} fill alt={pack.name} className="object-cover" />
      {/* overlay */}
      <div
        className={`absolute left-0 top-0 z-10 h-full w-full ${index % 2 === 0 ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent to-primary/80`}
      ></div>
      {/* <div className="absolute left-4 top-4 flex h-10 w-32 items-center justify-center bg-red-600 text-white">
                  <span className="block capitalize">Editor&apos;s pick</span>
                </div> */}
      <div className={`relative z-20 max-w-[400px] space-y-3 text-right`}>
        <h3 className="text-2xl font-bold capitalize !leading-[1.3] text-matalicGold sm:text-5xl">
          {pack.name}
        </h3>
        <p className="text-lg leading-[1.5]">{pack.blurb}</p>
      </div>
    </motion.div>
  );
}
