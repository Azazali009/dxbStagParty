"use client";
import React, { useState } from "react";
import Button from "./Button";

export default function PackageAddons({ addons, price }) {
  const [transporattion, setTransportation] = useState(0);
  const [accessories, setAccessories] = useState(0);
  const totalPrice = Number(transporattion) + Number(accessories) + price;
  return (
    <div className="mt-8 flex flex-col items-center gap-4 pb-20">
      <h3 className="font-semibold sm:text-3xl">Package Add Ons:</h3>
      <h3 className="text-sm sm:text-lg">{addons.join(", ")}</h3>
      <p>&darr;</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="Transportation">
            Select Transportation
          </label>
          <select
            value={transporattion}
            id="Transportation"
            onChange={(e) => setTransportation(e.target.value)}
            className={`bg-whit rounded border-2 px-6 py-3 text-sm shadow-lg duration-500 focus:border-secondary ${transporattion > 0 ? "border-green-500 focus:border-green-500" : "border-transparent"} focus:outline-none`}
          >
            <option value={0}>Select Transportation</option>
            <option value={20}>Private car</option>
            <option value={30}>limo</option>
            <option value={40}>luxury van transfers</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium" htmlFor="accessories">
            Custom party accessories
          </label>
          <select
            id="accessories"
            value={accessories}
            onChange={(e) => setAccessories(e.target.value)}
            className={`rounded border-2 bg-white px-6 py-3 text-sm shadow-lg duration-500 focus:border-secondary focus:outline-none ${accessories > 0 ? "border-green-500 focus:border-green-500" : "border-transparent"} focus:outline-none`}
          >
            <option value={0}>Custom party accessories</option>
            <option value={20}>Matching t-shirts</option>
            <option value={30}>sashes</option>
            <option value={40}>party games</option>
            <option value={50}>decorations</option>
          </select>
        </div>
      </div>
      <div className="mt-8">
        <Button variation="gold" className={"flex items-center gap-2"}>
          <span>Book Now</span>
          {totalPrice > 0 && (
            <span className="space-x-2 text-lg">
              {" "}
              <span>AED</span> {totalPrice}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
