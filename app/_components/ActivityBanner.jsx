import Image from "next/image";
import { cinzel } from "../layout";
import BookingWindowAndButton from "./BookingWindowAndButton";
export default async function ActivityBanner({ activity, user }) {
  const { name, description, image, bannerImage } = activity;

  return (
    <section className="relative flex min-h-[900px] items-center justify-center gap-4 object-cover p-4 text-white">
      <Image
        src={bannerImage}
        fill
        alt={name}
        quality={100}
        className="object-cover"
      />
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#120900]/20 to-[#3D1F00]"></div>
      <div className="relative z-10 flex max-w-[500px] flex-col gap-12">
        <div>
          <h1
            className={`text-center text-7xl font-bold tracking-tight text-matalicGold ${cinzel.className}`}
          >
            {name}
          </h1>
          <p className="text-center leading-[1.6]">{description}</p>
        </div>
        {/* <BookingWindowAndButton user={user} activity={activity} /> */}
        <div className="mt-auto space-y-6">
          {/* icons */}
          <div className="flex items-center justify-between gap-6">
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
              <p>{activity.duration}</p>
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <p>min {activity.minAge}</p>
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <p> 18+ AI Badayer</p>
            </div>
          </div>
          {/* cta */}
          <div className="grid grid-cols-2 gap-7">
            <button className="block rounded-md border border-[#947a27] bg-[#947a27] px-6 py-2.5 capitalize hover:bg-opacity-70">
              add to my weekend
            </button>
            <button className="rounded border border-white bg-black px-6 py-2.5 capitalize hover:bg-opacity-70">
              get a quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
