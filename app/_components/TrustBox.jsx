import Image from "next/image";
import React from "react";
import clock from "../svgIcons/clock.svg";

export default function TrustBox() {
  return (
    <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3">
      <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-[#070b16] px-8 py-4">
        <Image
          src={"/images/security.png"}
          width={15}
          height={15}
          alt="security"
        />
        <div className="space-y-1">
          <h4 className="text-sm font-medium capitalize">
            Secure, split payments
          </h4>
          <p className="text-xs text-neutral-700">
            Everyone pays their own share. No chasing money.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-[#070b16] px-8 py-4">
        <Image src={"/images/mens.png"} width={15} height={15} alt="supplier" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium capitalize">
            curated, direct suppliers
          </h4>
          <p className="text-xs text-neutral-700">
            Handpicked experiences, Dubai approved.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-[#070b16] px-8 py-4">
        <Image src={clock} width={20} height={20} alt="clock" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium capitalize">
            Fast, Concierge Support
          </h4>
          <p className="text-xs text-neutral-700">
            Need help? We are on whatsapp and email.
          </p>
        </div>
      </div>
    </div>
  );
}
