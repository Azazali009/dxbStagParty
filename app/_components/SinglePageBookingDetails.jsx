import Image from "next/image";
import React from "react";

export default function SinglePageBookingDetails({ image, duration, minAge }) {
  return (
    <div className="sticky top-12 rounded-md border border-tertiary px-2 py-6 lg:px-4">
      <Image
        className="rounded-md"
        src={image}
        alt="Paintball"
        width={1000}
        height={1000}
      />

      <div className="mt-4">
        <h2 className="text-xl font-bold sm:text-2xl">Quick Info</h2>
        <div className="mt-2 flex w-fit gap-8 text-sm">
          <div>
            <strong>Duration:</strong> <span>{duration} Mins</span>{" "}
          </div>
          <div>
            <strong>Min. Nums:</strong> <span>8</span>{" "}
          </div>
          <div>
            <strong>Min. Age:</strong> <span>{minAge}</span>{" "}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold sm:text-2xl">
            What&apos;s included?
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-2 text-xs sm:text-base">
            <li>Note: 54 km (approx 45 mins) from Athlone Town</li>
            <li>Transport not included</li>
            <li>Expert instructor</li>
            <li>All equipment provided</li>
            <li>300 paintballs each</li>
          </ul>
        </div>
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-bold sm:text-2xl">Why Book it?</h2>
          <p className="text-sm leading-[1.7] sm:text-base">
            Paintball, a stag party classic! Many a stag has been seen running
            around a field in a tutu avoiding hoards of paintballs coming
            straight for him. The pain is good practice for marriage, actually
            so is the tutu, he won&apos;t be wearing the trousers for much
            longer either!
          </p>
          <p className="mt-4 text-sm leading-[1.7] sm:text-base">
            The stag party will be fully loaded and with 300 paintballs you can
            afford to spray the field in the hope of hitting someone or be a
            sneaky bugger and hide in the trees and snipe, either way your stag
            party is guaranteed some laughs.
          </p>
        </div>
      </div>
    </div>
  );
}
