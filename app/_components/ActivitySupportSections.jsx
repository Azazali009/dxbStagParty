import React from "react";
import { playfairDisplay } from "../layout";

export default function ActivitySupportSections({ activity }) {
  return (
    <div className="space-y-20 bg-[#1f1000] px-4 py-10">
      <h2
        className={`${playfairDisplay.className} text-center text-3xl font-semibold capitalize tracking-wider`}
      >
        Optional add ons
      </h2>
      <div className="flex items-center justify-center gap-4">
        <div>
          <span>BBQ Feast</span>
        </div>
        <div>
          <span>Photographer</span>
        </div>
        <div>
          <span>Drone Footage</span>
        </div>
        <div>
          <span>Transfers</span>
        </div>
        <div>
          <span>Hookah Lounge</span>
        </div>
        <div>
          <span>Ice Chest Upgrade</span>
        </div>
      </div>
      {/* map section */}
      <div className="!mt-24 grid grid-cols-2 gap-12">
        <div>
          <h3
            className={`text-center text-3xl font-semibold ${playfairDisplay.className} capitalize tracking-wider`}
          >
            Where It Happens
          </h3>
          <div class="map-container space-y-4 text-center">
            <iframe
              class="high-contrast-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.9670815658324!2d55.13809867359061!3d25.069104836880452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5764bd5d0dd5f%3A0xae7a4cfee76397e1!2sAl%20Badayer%20Desert%20Dubai%20-%20Dune%20Buggy%20%26%20Quad%20Biking%20Dubai!5e0!3m2!1sen!2s!4v1746545556704!5m2!1sen!2s"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div class="flex flex-col gap-2 text-lg font-light">
              <span>AT BADAYE-DESERT</span>
              <span>~45 min drive from Dubai Marina</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10">
          <h3
            className={`text-center text-3xl font-semibold ${playfairDisplay.className} capitalize tracking-wider`}
          >
            What to Bring
          </h3>
          <ul className="w-full space-y-4 border-b border-[#3D1F00] pb-8 text-center text-xl">
            <li>Closed Shoes</li>
            <li>Sunglasses</li>
            <li>ID for waiver</li>
          </ul>
          <div class="map-container flex flex-col gap-2 space-y-2 text-center text-xl font-light">
            <span>Dress code</span>
            <span>Comfortable / activewear</span>
          </div>
        </div>
      </div>
      {/* review section */}
      <div className="space-y-20 py-10">
        <h2
          className={`${playfairDisplay.className} text-center text-3xl font-semibold capitalize tracking-wider`}
        >
          What the Legends Say
        </h2>
        <div className="grid grid-cols-3 justify-items-center gap-8">
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
          className={`${playfairDisplay.className} text-center text-3xl font-semibold capitalize tracking-wider`}
        >
          Why Book With DXB Stag?
        </h2>
        <div className="flex items-center justify-center gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold capitalize">
              Groom Goes Free
            </h3>
            <p className="font-light">On eligible packages</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold capitalize">Split Payments</h3>
            <p className="font-light">Everyone pays their share</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold capitalize">Fully Vetted</h3>
            <p className="font-light">We’ve done it, loved it</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold capitalize">
              Concierge Included
            </h3>
            <p className="font-light">Personal touch all the way</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold capitalize">
              Same Price or Less
            </h3>
            <p className="font-light">No markups, ever</p>
          </div>
        </div>
      </div>
    </div>
  );
}
