import React from "react";
import { format } from "date-fns";
import PencilIcon from "../../svgIcons/PencilIcon";
import TrashIcon from "../../svgIcons/TrashIcon";

export default async function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-primary">My bookings</h1>
      <div className="space-y-4">
        {/* 1 */}
        <div className="flex border border-gray-300">
          <div className="flex-1 p-4">
            <div className="flex justify-between text-[#4d5053]">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold capitalize text-gray-100">
                  paintball activity
                </h3>
                <p className="text-base font-semibold capitalize">
                  Destination: <span className="font-medium">dubai</span>
                </p>

                <div className="flex items-center gap-2">
                  <strong className="text-lg font-semibold text-secondary">
                    $200
                  </strong>
                  <p>&bull;</p>
                  <p>4 attendees</p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-between">
                <strong className="block self-end bg-green-600 px-3 py-1 text-sm font-semibold capitalize tracking-wider text-green-100">
                  paid
                </strong>
                <p className="text-sm font-semibold text-[#4d5053]">
                  Booked {format("2025-01-10", " EEE, MMM dd yyyy,p")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-l border-gray-300">
            <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon />
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-gray-300"></div>
            <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon />
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
        {/* 2 */}
        <div className="flex border border-gray-300">
          <div className="flex-1 p-4">
            <div className="flex justify-between text-[#4d5053]">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold capitalize text-gray-100">
                  paintball activity
                </h3>
                <p className="text-base font-semibold capitalize">
                  Destination: <span className="font-medium">dubai</span>
                </p>

                <div className="flex items-center gap-2">
                  <strong className="text-lg font-semibold text-secondary">
                    $200
                  </strong>
                  <p>&bull;</p>
                  <p>4 attendees</p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-between">
                <strong className="block self-end bg-green-600 px-3 py-1 text-sm font-semibold capitalize tracking-wider text-green-100">
                  paid
                </strong>
                <p className="text-sm font-semibold text-[#4d5053]">
                  Booked {format("2025-01-10", " EEE, MMM dd yyyy,p")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-l border-gray-300">
            <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon />
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-gray-300"></div>
            <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon />
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
        {/* 3 */}
        <div className="flex border border-gray-300">
          <div className="flex-1 p-4">
            <div className="flex justify-between text-[#4d5053]">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold capitalize text-gray-100">
                  paintball activity
                </h3>
                <p className="text-base font-semibold capitalize">
                  Destination: <span className="font-medium">dubai</span>
                </p>

                <div className="flex items-center gap-2">
                  <strong className="text-lg font-semibold text-secondary">
                    $200
                  </strong>
                  <p>&bull;</p>
                  <p>4 attendees</p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-between">
                <strong className="block self-end bg-green-600 px-3 py-1 text-sm font-semibold capitalize tracking-wider text-green-100">
                  paid
                </strong>
                <p className="text-sm font-semibold text-[#4d5053]">
                  Booked {format("2025-01-10", " EEE, MMM dd yyyy,p")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-l border-gray-300">
            <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon />
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-gray-300"></div>
            <button className="flex flex-1 items-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon />
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
