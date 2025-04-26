import Image from "next/image";
import { cinzel, playfairDisplay } from "../layout";
import keyIcon from "../svgIcons/key.png";
import HomeIcon from "../svgIcons/home.png";
import shirtIcon from "../svgIcons/shirt.png";
import filterIcon from "../svgIcons/filter.png";
import messageIcon from "../svgIcons/message.png";
import moonIcon from "../svgIcons/moon.png";
import folderPlayIcon from "../svgIcons/folderPlay.png";
import videoIcon from "../svgIcons/video.png";
import pdfIcon from "../svgIcons/pdf.png";
import InterestImageBox from "./InterestImageBox";
export default function HomeBlogSection() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 py-14">
      <div className="space-y-4">
        <h2
          className={`${cinzel.className} text-center text-5xl font-semibold text-matalicGold`}
        >
          plan like a pro
        </h2>
        <p className="text-center">Everything we know. All for your crew.</p>
      </div>
      <div className="grid grid-cols-2 items-center gap-12 p-12">
        <div className="relative flex h-[500px] items-end overflow-hidden rounded-lg p-6">
          <Image src={"/images/home-hero-bg.webp"} fill alt="image" />
          {/* overlay */}
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
          <div className="relative z-20 space-y-6">
            <h2
              className={`${playfairDisplay.className} text-5xl font-bold capitalize`}
            >
              your dubai <br />
              stag blueprint
            </h2>
            <p>
              The ultimate 3-day itinerary yachts, bugiies, beach clubs & banter
            </p>
            <button className="rounded-md border border-matalicGold bg-neutral-800 px-6 py-2.5 font-light capitalize duration-300 hover:bg-neutral-900">
              Read the full guide
            </button>
          </div>
        </div>
        <div className="space-y-12">
          <h3
            className={` ${cinzel.className} text-center text-2xl font-semibold`}
          >
            browse topics by interest
          </h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-8">
            <InterestImageBox icon={keyIcon} text={"VIP Access"} />
            <InterestImageBox icon={HomeIcon} text={"Villas & Accom"} />
            <InterestImageBox icon={shirtIcon} text={"Style & Eliquette"} />
            <InterestImageBox icon={filterIcon} text={"party hacks"} />
            <InterestImageBox icon={messageIcon} text={"real stories"} />
            <InterestImageBox icon={moonIcon} text={"Day/Night planning"} />
          </div>
          <div className="ml-4 flex items-center gap-4">
            <InterestImageBox icon={folderPlayIcon} text={"Blog"} />
            <InterestImageBox icon={videoIcon} text={"Video"} />
            {/* <InterestImageBox icon={pdfIcon} text={"PDF"} />
            <InterestImageBox icon={videoIcon} text={"insta reels"} /> */}
          </div>
          <button className="rounded-md border border-matalicGold bg-neutral-800 px-6 py-2.5 font-light capitalize duration-300 hover:bg-neutral-900">
            browse the stag guide
          </button>
        </div>
      </div>
    </div>
  );
}
