import React, { useState } from "react";
import { formatToAED } from "../_lib/helpers";

export default function Summary({
  selectedActivities,
  selectedPackages,
  activityName,
  price,
  totalPrice,
}) {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      {showSummary ? (
        <div
          draggable
          className="no-scrollbar fixed bottom-0 right-0 max-h-[200px] space-y-6 overflow-y-auto bg-navyBlue p-8 shadow-2xl"
        >
          <button
            onClick={() => setShowSummary(false)}
            className="absolute right-2 top-2 block size-8 rounded-full bg-primary text-sm duration-300 hover:scale-95"
          >
            X
          </button>
          {selectedActivities.map((activity) => {
            return (
              <div
                key={activity.value}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="text-matalicGold">{activity.label}:</span>{" "}
                <span className="text-matalicGold">
                  {formatToAED(activity.price)}
                </span>
              </div>
            );
          })}
          {price && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-matalicGold">{activityName}:</span>{" "}
              <span className="text-matalicGold">{formatToAED(price)}</span>
            </div>
          )}
          {selectedPackages.map((pack) => {
            return (
              <div
                key={pack.value}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-matalicGold">{pack.label}:</span>{" "}
                <span className="text-matalicGold">
                  {formatToAED(pack.price)}
                </span>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 border-t border-primary pt-5">
            <h2 className="text-lg font-semibold text-matalicGold">
              Total Price:
            </h2>
            <p className="text-lg font-semibold text-matalicGold">
              {formatToAED(totalPrice)}
            </p>
          </div>
          {/* <p className="text-sm font-light text-matalicGold">
          (Includes 15% Organizer Fee){" "}
        </p> */}
        </div>
      ) : (
        <button
          onClick={() => setShowSummary((show) => !show)}
          className="fixed bottom-4 right-4 rounded-md bg-navyBlue px-6 py-2.5 duration-500 hover:scale-95"
        >
          show summary
        </button>
      )}
    </>
  );
}
