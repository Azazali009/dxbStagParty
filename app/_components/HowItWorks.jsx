import Image from "next/image";
import MeteorsDemo from "./MeteorsDemo";
import { cinzel } from "../layout";
export default function HowItWorks() {
  return (
    <section
      className={`bg-softGold text-reddish space-y-10 ${cinzel.className} mx-auto w-full py-20`}
    >
      <h2 className="text-center text-2xl font-black sm:text-4xl">
        How it works
      </h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 text-center md:grid-cols-3 lg:grid-cols-4">
        {/* package box */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src={"/images/packageIcon.png"}
            width={100}
            height={100}
            alt="package"
          />
          <p className="font-semibold">Choose Package</p>
        </div>
        {/* Customize box */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src={"/images/Customize.png"}
            width={100}
            height={100}
            alt="package"
          />
          <p className="font-semibold">Customize</p>
        </div>
        {/* Split-Payment box */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src={"/images/Split-Payment.png"}
            width={100}
            height={100}
            alt="package"
          />
          <p className="font-semibold">Split Payment</p>
        </div>
        {/* party box */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src={"/images/party.png"}
            width={100}
            height={100}
            alt="package"
          />
          <p className="font-semibold">Party</p>
        </div>
      </div>
    </section>
  );
}
