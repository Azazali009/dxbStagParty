import Image from "next/image";
import Link from "next/link";
import BookingWindowAndButton from "./BookingWindowAndButton";
import { cinzel } from "../layout";
import { getCurrentUser } from "../_lib/getCurrentUser";
import whiteWhatsapp from "../svgIcons/whiteWhatsapp.svg";
export default async function PackageHero({ Package }) {
  const { name, image, duration, description, recommendedTime } = Package;

  const user = await getCurrentUser();
  return (
    <section className="relative -mt-[110px] flex h-[450px] items-center justify-center gap-4 object-cover p-2 text-white xs:h-[600px] xs:p-4 sm:h-[700px] md:min-h-[900px]">
      <Image
        src={image}
        fill
        alt={name}
        quality={100}
        className="bg-center object-cover"
      />
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#120900]/20 to-[#3D1F00]"></div>
      <div className="relative z-10 mt-28 flex max-w-3xl flex-col gap-12 md:mt-0">
        <div className="space-y-4">
          <h1
            className={`text-center text-3xl font-bold tracking-tight text-matalicGold xs:text-5xl sm:text-6xl md:text-7xl ${cinzel.className}`}
          >
            {name}
          </h1>
          <p className="text-center leading-[1.6]">{description}</p>
        </div>

        <div className="mt-auto space-y-6">
          {/* icons */}
          <div className="flex items-center justify-between gap-6 text-[9px] xs:text-sm md:text-base">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p>{duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p>Recommended Time {recommendedTime} </p>
            </div>
            {/* <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <p> {destinations}</p>
            </div> */}
          </div>
          {/* cta */}
          <div className="grid grid-cols-3 gap-3 text-[9px] xs:text-xs md:gap-7 md:text-base">
            <BookingWindowAndButton user={user} Package={Package} />
            <button className="h-8 w-full rounded border border-white bg-black capitalize hover:bg-opacity-70 xs:h-10">
              get a quote
            </button>
            <Link
              className="flex h-8 w-full items-center justify-center gap-[2px] rounded-md border border-emerald-800 bg-emerald-800 capitalize duration-300 hover:bg-emerald-950 xs:h-10 xs:gap-2"
              href={"https://wa.me/+971568347487"}
            >
              <Image
                src={whiteWhatsapp}
                width={25}
                height={25}
                alt="whatsapp"
                className="size-3 xs:size-5"
              />
              <span>send to group</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
