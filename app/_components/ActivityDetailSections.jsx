import React from "react";
import { playfairDisplay } from "../layout";
import Image from "next/image";

export default function ActivityDetailSections({ activity }) {
  return (
    <section className="space-y-10 bg-[#3D1F00] px-4 py-10">
      <h2
        className={`${playfairDisplay.className} text-3xl font-semibold !italic`}
      >
        Not your average desert ride.
      </h2>
      <p className="w-full leading-[1.7] sm:w-[60%]">
        You’re in control of a beast. Kick up sand, fly over dunes, and turn the
        desert into your personal racetrack. This is full-throttle fun, DXB
        style.
      </p>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex items-center gap-2">
          <svg
            fill="white"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10.6455 1.46996C11.3457 0.614763 12.6535 0.61476 13.3536 1.46995L14.3455 2.6814C14.4135 2.76444 14.5269 2.79482 14.6272 2.75691L16.0919 2.20368C17.1259 1.81314 18.2585 2.46704 18.4372 3.55775L18.6905 5.10281C18.7078 5.20872 18.7908 5.29173 18.8967 5.30909L20.4418 5.56232C21.5325 5.74109 22.1864 6.87367 21.7959 7.90763L21.2427 9.37232C21.2047 9.47271 21.2351 9.58611 21.3182 9.65409L22.5296 10.6459C23.3848 11.3461 23.3848 12.6539 22.5296 13.3541L21.0145 14.5945C20.694 14.8569 20.2215 14.8098 19.9591 14.4893C19.6967 14.1688 19.7438 13.6963 20.0643 13.4339L21.5794 12.1934C21.7015 12.0934 21.7015 11.9066 21.5794 11.8066L20.3679 10.8147C19.7867 10.3388 19.574 9.54506 19.8394 8.8423L20.3926 7.37761C20.4484 7.22991 20.355 7.06811 20.1992 7.04257L18.6541 6.78934C17.9128 6.66783 17.3317 6.08675 17.2102 5.34543L16.957 3.80036C16.9315 3.64454 16.7697 3.55113 16.6219 3.60692L15.1573 4.16015C14.4545 4.42558 13.6607 4.21289 13.1848 3.63164L12.193 2.42019C12.093 2.29802 11.9061 2.29802 11.8061 2.42019L10.8143 3.63164C10.3384 4.21289 9.54463 4.42559 8.84187 4.16015L7.37718 3.60692C7.22947 3.55113 7.06767 3.64454 7.04214 3.80036L6.7889 5.34542C6.6674 6.08675 6.08632 6.66783 5.34499 6.78934L3.79992 7.04257C3.64411 7.06811 3.55069 7.22991 3.60648 7.37761L4.15971 8.8423C4.42515 9.54506 4.21246 10.3388 3.6312 10.8147L2.41975 11.8066C2.29758 11.9066 2.29758 12.0934 2.41975 12.1934L3.6312 13.1853C4.21246 13.6612 4.42515 14.4549 4.15971 15.1577L3.60648 16.6224C3.55069 16.7701 3.64411 16.9319 3.79992 16.9574L5.34499 17.2107C6.08632 17.3322 6.6674 17.9132 6.7889 18.6546L7.04214 20.1996C7.06767 20.3555 7.22947 20.4489 7.37718 20.3931L8.84186 19.8399C9.54463 19.5744 10.3384 19.7871 10.8143 20.3684L11.8061 21.5798C11.9061 21.702 12.093 21.702 12.193 21.5798L13.1848 20.3684C13.6607 19.7871 14.4545 19.5744 15.1573 19.8399L16.6219 20.3931C16.7697 20.4489 16.9315 20.3555 16.957 20.1996L17.3264 17.9457C17.3934 17.5369 17.7791 17.2599 18.1878 17.3268C18.5966 17.3938 18.8737 17.7795 18.8067 18.1883L18.4372 20.4422C18.2585 21.533 17.1259 22.1869 16.0919 21.7963L14.6272 21.2431C14.5268 21.2052 14.4135 21.2356 14.3455 21.3186L13.3536 22.53C12.6535 23.3852 11.3457 23.3852 10.6455 22.53L9.65366 21.3186C9.58567 21.2356 9.47228 21.2052 9.37188 21.2431L7.9072 21.7963C6.87324 22.1869 5.74065 21.533 5.56189 20.4423L5.30865 18.8972C5.29129 18.7913 5.20828 18.7083 5.10238 18.6909L3.55731 18.4377C2.46661 18.2589 1.81271 17.1263 2.20324 16.0924L2.75647 14.6277C2.79439 14.5273 2.76401 14.4139 2.68097 14.3459L1.46952 13.3541C0.614328 12.6539 0.614325 11.3461 1.46952 10.6459L2.68097 9.65409C2.76401 9.58611 2.79439 9.47271 2.75647 9.37232L2.20324 7.90763C1.81271 6.87367 2.46661 5.74109 3.55731 5.56232L5.10238 5.30909C5.20828 5.29173 5.29129 5.20872 5.30865 5.10281L5.56189 3.55774C5.74065 2.46704 6.87324 1.81314 7.9072 2.20368L9.37188 2.75691C9.47228 2.79483 9.58567 2.76444 9.65366 2.6814L10.6455 1.46996Z"
              fill="#F7E7CE"
              fillRule="#F7E7CE"
            />
            <path
              clipRule="#F7E7CE"
              d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.8897 16.171 10.6989 16.25 10.5 16.25C10.3011 16.25 10.1103 16.171 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z"
              fill="#F7E7CE"
              fillRule="evenodd"
            />
          </svg>
          <p>Verified Partners</p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>

          <p>No Hidden Fees</p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>

          <p>AED 500 Hold</p>
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
              d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>

          <p>Concierge Support</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 rounded-xl bg-[#1f1000] p-12">
        <h2 className="text-2xl">Lock It In or Loop the Lads</h2>
        <div className="grid grid-cols-2 gap-7">
          <button className="block rounded-md border border-[#947a27] bg-[#947a27] px-6 py-2.5 capitalize hover:bg-opacity-70">
            add to my weekend
          </button>
          <button className="rounded border border-white bg-black px-6 py-2.5 capitalize hover:bg-opacity-70">
            get a quote
          </button>
        </div>
        <p className="flex items-center gap-2">
          {" "}
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <span>Send to the group</span>
        </p>
      </div>

      <div className="relative space-y-7">
        <h2 className="text-3xl font-semibold uppercase">What to Expect</h2>
        <div className="grid grid-cols-2 items-center gap-12">
          <div className="relative h-[600px] overflow-hidden rounded-xl">
            <Image
              className="object-cover"
              src={activity.image}
              fill
              alt={activity.name}
            />
          </div>
          <div className="space-y-4">
            <h4
              className={`text-3xl ${playfairDisplay.className} font-semibold`}
            >
              Adrenaline? Mate, there’s plenty of it.
            </h4>
            <p className="leading-[1.7]">
              {" "}
              Start with a safety briefing, then it’s go-time. Power over dunes,
              whip around sand bowls, and catch air like a desert beast.
            </p>
            <ul className="list-inside space-y-4">
              {activity?.coreInclusions?.map((inclusion) => {
                return (
                  <li key={inclusion} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>

                    <span>{inclusion}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
