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
import Link from "next/link";
export default function HomeBlogSection() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 py-14 xl:max-w-full">
      <div className="space-y-2 xs:space-y-4">
        <h2
          className={`${cinzel.className} text-center text-4xl font-semibold text-matalicGold xs:text-5xl`}
        >
          plan like a pro
        </h2>
        <p className="text-center text-sm xs:text-base">
          Everything we know. All for your crew.
        </p>
      </div>
      <div className="grid grid-cols-1 items-center gap-12 p-6 md:grid-cols-2 md:p-12">
        <div className="relative flex h-[300px] items-end overflow-hidden rounded-lg p-6 sm:h-[500px]">
          <Image
            src={"/images/planLikeApro.webp"}
            className="object-cover"
            fill
            alt="image"
          />
          {/* overlay */}
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
          <div className="relative z-20 space-y-3 xs:space-y-6">
            <h2
              className={`${playfairDisplay.className} text-xl font-bold capitalize xs:text-5xl`}
            >
              your dubai <br />
              stag blueprint
            </h2>
            <p className="text-xs xs:text-base">
              The ultimate 3-day itinerary: yachts, buggies, beach clubs &
              banter
            </p>
            <Link
              href={"/blog"}
              className="inline-block rounded-md border border-matalicGold bg-neutral-800 px-4 py-2 text-xs font-light capitalize duration-300 hover:bg-neutral-900 xs:px-6 xs:py-2.5 xs:text-base"
            >
              Read the full guide
            </Link>
          </div>
        </div>
        <div className="space-y-12">
          <h3
            className={` ${cinzel.className} text-center text-xl font-semibold xs:text-2xl`}
          >
            browse topics by interest
          </h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-8">
            <InterestImageBox icon={keyIcon} text={"VIP Access"} />
            <InterestImageBox icon={HomeIcon} text={"Villas & Accom"} />
            <InterestImageBox icon={shirtIcon} text={"Style & Etiquette"} />
            <InterestImageBox icon={filterIcon} text={"party hacks"} />
            <InterestImageBox icon={messageIcon} text={"real stories"} />
            <InterestImageBox icon={moonIcon} text={"Day/Night planning"} />
            <InterestImageBox url="/blog" icon={folderPlayIcon} text={"Blog"} />
            <InterestImageBox icon={videoIcon} text={"Video"} />
          </div>
          {/* <div className="ml-4 flex items-center gap-10">
            <InterestImageBox icon={folderPlayIcon} text={"Blog"} />
            <InterestImageBox icon={videoIcon} text={"Video"} />
          </div> */}
          <Link
            href={"/blog"}
            className="inline-block rounded-md border border-matalicGold bg-neutral-800 px-6 py-2.5 font-light capitalize duration-300 hover:bg-neutral-900"
          >
            browse the stag guide
          </Link>
        </div>
      </div>
    </div>
  );
}
