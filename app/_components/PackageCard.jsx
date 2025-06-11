"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PackageCard({ pack, index }) {
  return (
    <motion.div
      key={pack.id}
      className={`relative flex min-h-44 items-center sm:min-h-80 ${index % 2 === 0 ? "justify-end" : "justify-start"} object-cover p-3 sm:p-6`}
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

      <div
        className={`relative z-20 flex max-w-[90%] flex-col py-10 sm:space-y-3 md:max-w-[60%] ${index % 2 === 0 ? "text-right" : "text-left"}`}
      >
        <h3 className="text-2xl font-bold capitalize !leading-[1.3] text-matalicGold xs:text-4xl sm:text-5xl">
          {pack.name}
        </h3>
        <p className="text-xs leading-[1.5] xs:text-base sm:text-lg">
          {pack.blurb}
        </p>
        <Link
          className={`block rounded-md bg-matalicGold px-4 py-1.5 text-sm font-medium capitalize text-navyBlue duration-300 hover:opacity-90 ${index % 2 === 0 ? "self-end" : "self-start"} `}
          href={`/packages/${pack.id}`}
        >
          view detail
        </Link>
      </div>
    </motion.div>
  );
}
