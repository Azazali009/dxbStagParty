import React from "react";
import { playfairDisplay } from "../layout";

export default function PackageSupport({ Package }) {
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&q=${encodeURIComponent(Package.destinations || "dubai")}`;
  return (
    <section className="space-y-10 bg-[#1f1000] px-4 py-10">
      <h2
        className={`${playfairDisplay.className} text-center text-2xl font-semibold capitalize tracking-wider xs:text-3xl`}
      >
        Optional add ons
      </h2>
      <div className="flex items-center justify-center gap-4 text-xs xs:text-base">
        {!Package?.add_ons ? (
          <p className="italic text-gray-500">
            No add-ons have been added yet!
          </p>
        ) : (
          Package?.add_ons?.map((addon) => {
            return (
              <div key={addon}>
                <span className="inline-block capitalize">{addon}</span>
              </div>
            );
          })
        )}
      </div>
      {/* map section */}
      <div className="!mt-24 grid grid-cols-1 gap-12 sm:grid-cols-2">
        <div>
          <h3
            className={`text-center text-2xl font-semibold xs:text-3xl ${playfairDisplay.className} capitalize tracking-wider`}
          >
            Where It Happens
          </h3>
          <div class="map-container space-y-4 text-center">
            <iframe
              class="high-contrast-map"
              src={embedUrl}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* <div class="flex flex-col gap-2 text-xs font-light xs:text-lg">
              <span>{activity?.destinations}</span>
            
            </div> */}
          </div>
        </div>

        <div className="flex flex-col items-center gap-10">
          <h3
            className={`text-center text-2xl font-semibold xs:text-3xl ${playfairDisplay.className} capitalize tracking-wider`}
          >
            What to Bring
          </h3>
          <ul className="w-full space-y-4 border-b border-[#3D1F00] pb-8 text-center text-sm xs:text-xl">
            <li>Closed Shoes</li>
            <li>Sunglasses</li>
            <li>ID for waiver</li>
          </ul>
          <div class="map-container flex flex-col gap-2 space-y-2 text-center text-sm font-light xs:text-xl">
            <span>Dress code</span>
            <span>Comfortable / activewear</span>
          </div>
        </div>
      </div>
      {/* review section */}
      <div className="space-y-10 py-10 xs:space-y-20">
        <h2
          className={`${playfairDisplay.className} text-center text-2xl font-semibold capitalize tracking-wider xs:text-3xl`}
        >
          What the Legends Say
        </h2>
        <div className="grid grid-cols-1 justify-items-center gap-12 xs:grid-cols-2 xs:gap-8 sm:grid-cols-3">
          <div className="space-y-4 text-center">
            <h3 className="leading-[1.6]">
              “Best thing we did all weekend. Adrenaline overload!”
            </h3>
            <h4>— Tom, London</h4>
          </div>
          <div className="space-y-4 text-center">
            <h3 className="leading-[1.6]">
              “Felt like Mad Max meets Top Gear. Unreal.”
            </h3>
            <h4>— Jay, Manchester</h4>
          </div>
          <div className="space-y-4 text-center">
            <h3 className="leading-[1.6]">
              “Even the quiet lad wouldn’t shut up about it.”
            </h3>
            <h4>— Group from Cork</h4>
          </div>
        </div>
      </div>
      {/* why dxb stag */}
      <div className="space-y-10 py-10">
        <h2
          className={`${playfairDisplay.className} text-center text-2xl font-semibold capitalize tracking-wider xs:text-3xl`}
        >
          Why Book With DXB Stag?
        </h2>
        <div className="flex flex-wrap items-center justify-start gap-8 xs:justify-center">
          <div className="space-y-2 text-xs xs:text-base">
            <h3 className="text-base font-semibold capitalize xs:text-xl">
              Groom Goes Free
            </h3>
            <p className="font-light">On eligible packages</p>
          </div>
          <div className="space-y-2 text-xs xs:text-base">
            <h3 className="text-base font-semibold capitalize xs:text-xl">
              Split Payments
            </h3>
            <p className="font-light">Everyone pays their share</p>
          </div>
          <div className="space-y-2 text-xs xs:text-base">
            <h3 className="text-base font-semibold capitalize xs:text-xl">
              Fully Vetted
            </h3>
            <p className="font-light">We’ve done it, loved it</p>
          </div>
          <div className="space-y-2 text-xs xs:text-base">
            <h3 className="text-base font-semibold capitalize xs:text-xl">
              Concierge Included
            </h3>
            <p className="font-light">Personal touch all the way</p>
          </div>
          <div className="space-y-2 text-xs xs:text-base">
            <h3 className="text-base font-semibold capitalize xs:text-xl">
              Same Price or Less
            </h3>
            <p className="font-light">No markups, ever</p>
          </div>
        </div>
      </div>
    </section>
  );
}
