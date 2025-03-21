"use client";
import { WorldMap } from "../_components/ui/world-map";
import { motion } from "motion/react";

export default function Map() {
  return (
    <div className="mx-auto w-full bg-gradient-to-b from-black/30 via-gray-800 to-tertiary py-40 shadow-lg">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xl font-bold text-white md:text-4xl">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="mx-auto max-w-2xl py-4 text-sm text-neutral-500 md:text-lg">
          Break free from traditional boundaries. Book from anywhere, at the
          comfort of your own apartment. Perfect for Nomads and Travellers.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 25.2631,
              lng: 55.2972,
              label: "Dubai",
            }, // Dubai
            end: {
              lat: 24.4667,
              lng: 54.3667,
              label: "Abu Dhabi",
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
    </div>
  );
}
