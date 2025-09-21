import Link from "next/link";
export default function VipSpotLight() {
  return (
    <section className="relative bg-red-100 p-4 text-navyBlue">
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-[#BE7E23] to-[#BE7E23]" />
      <div className="space-y-2 sm:space-y-6">
        <div className="p-3 sm:p-6 md:w-1/2">
          <h2 className="text-xl font-semibold uppercase leading-[1.3] sm:text-4xl">
            VIP Spotlight - The experience everyone is talking about!
          </h2>
        </div>
        <div className="relative flex h-[250px] flex-col items-start justify-end gap-4 overflow-hidden rounded-lg bg-[url('/images/activity-vip-bg.webp')] bg-cover bg-center bg-no-repeat px-3 py-8 text-softGold sm:h-[400px] sm:p-8 md:h-[700px]">
          {/* overlay */}
          <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-r from-black/40 to-transparent"></div>
          <h2 className="relative z-10 text-base xs:text-lg sm:w-[60%] sm:text-xl sm:leading-[1.7]">
            Cruise Dubai&apos;s coastline on your own private yacht. Free
            flowing drinks, onboard tunes, and epic skyline views.
          </h2>
          <Link
            href="/activities/private-yacht-party"
            className="relative z-10 block rounded-md bg-orange-600 px-4 py-2 text-sm font-medium uppercase text-softGold hover:bg-orange-700 sm:px-6 sm:py-3 sm:text-base"
          >
            {" "}
            view yacht party details
          </Link>
        </div>
      </div>
    </section>
  );
}
