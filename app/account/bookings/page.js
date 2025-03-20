import React from "react";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My bookings</h1>
      <div className="space-y-4">
        {/* 1 */}
        <div className="flex border border-primary">
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
                  <strong className="text-lg font-semibold text-amber-500">
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
          <div className="flex flex-col items-center justify-center gap-2 border-l border-primary">
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon className="text-indigo-600" width={15} />{" "}
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-primary"></div>
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon className="text-indigo-600" width={15} />{" "}
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
        {/* 2 */}
        <div className="flex border border-primary">
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
                  <strong className="text-lg font-semibold text-amber-500">
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
          <div className="flex flex-col items-center justify-center gap-2 border-l border-primary">
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon className="text-indigo-600" width={15} />{" "}
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-primary"></div>
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon className="text-indigo-600" width={15} />{" "}
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
        {/* 3 */}
        <div className="flex border border-primary">
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
                  <strong className="text-lg font-semibold text-amber-500">
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
          <div className="flex flex-col items-center justify-center gap-2 border-l border-primary">
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon className="text-indigo-600" width={15} />{" "}
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-primary"></div>
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon className="text-indigo-600" width={15} />{" "}
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
        {/* 4 */}
        <div className="flex border border-primary">
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
                  <strong className="text-lg font-semibold text-amber-500">
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
          <div className="flex flex-col items-center justify-center gap-2 border-l border-primary">
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon className="text-indigo-600" width={15} />{" "}
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-primary"></div>
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon className="text-indigo-600" width={15} />{" "}
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
        {/* 5 */}
        <div className="flex border border-primary">
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
                  <strong className="text-lg font-semibold text-amber-500">
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
          <div className="flex flex-col items-center justify-center gap-2 border-l border-primary">
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <PencilIcon className="text-indigo-600" width={15} />{" "}
              <span>edit</span>{" "}
            </button>
            {/* divider */}
            <div className="h-px w-full bg-primary"></div>
            <button className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-medium capitalize hover:opacity-70">
              {" "}
              <TrashIcon className="text-indigo-600" width={15} />{" "}
              <span>delete</span>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
