"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getPackages } from "../_lib/packagesApi";
import { motion } from "framer-motion";

export default function DisplayPackages({ packages }) {
  return (
    <section className="bg-[#694621] py-40">
      <div className="mx-auto w-[95%]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold uppercase">
            exclusive packages
          </h2>
          <p>
            All-in-one experiences crafted for the ultimate stag celebration
          </p>
        </div>

        <div className="!mt-20 grid grid-cols-1 items-start gap-8">
          {/* card 1 */}
          {packages.map((pack, index) => {
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
                <Image
                  src={pack.image}
                  fill
                  alt={pack.name}
                  className="object-cover"
                />
                {/* overlay */}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-transparent to-primary/60"></div>
                {/* <div className="absolute left-4 top-4 flex h-10 w-32 items-center justify-center bg-red-600 text-white">
                  <span className="block capitalize">Editor&apos;s pick</span>
                </div> */}
                <div
                  className={`relative z-20 max-w-[400px] space-y-3 text-right`}
                >
                  <h3 className="text-2xl font-bold capitalize !leading-[1.3] text-matalicGold sm:text-5xl">
                    {pack.name}
                  </h3>
                  <p className="text-lg leading-[1.5]">{pack.blurb}</p>
                </div>
              </motion.div>
            );
          })}

          {/* cta column 5 */}
          {packages.length >= 3 && (
            <div
              className="flex flex-col gap-6 self-center text-center"
              style={{
                gridColumn: packages.length === 3 && "1/-1",
                justifySelf: "center",
                marginTop: "60px",
              }}
            >
              <Link
                href={`#`}
                className="flex items-center rounded-2xl bg-navyBlue p-6 text-2xl font-medium capitalize duration-300 hover:opacity-70"
              >
                explore all exclusive packages
              </Link>
              <p className="text-xl">or browse all 12+ stag packages</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
