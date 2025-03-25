"use client";
import ColourfulText from "@/app/_components/ui/colourful-text";
import { BackgroundGradient } from "./ui/background-gradient";
import { allPackages } from "../_lib/packagesData";
export default function RelatedPackages() {
  const filteredPackages = allPackages.filter(
    (pkg) => pkg.keyword === "adventure-action-packed",
  );
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-16">
      <div className="text-center">
        <ColourfulText text="Related Packages" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPackages.slice(0, 4).map((pack) => {
          return (
            <BackgroundGradient
              key={pack.id}
              className="flex h-full flex-col items-start gap-4 rounded-[22px] bg-zinc-900 p-4 sm:p-10"
            >
              <h3 className="mb-2 mt-4 text-balance leading-[1.5] text-neutral-200">
                {pack.title}
              </h3>

              <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>

              <button
                href={"#"}
                className="mt-auto flex items-center space-x-1 rounded-full bg-primary px-4 py-1 text-xs font-bold shadow-shadowOne"
              >
                Buy now
                {/* <span>Buy now </span> */}
                {/* <span className="rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white">
                        $100
                      </span> */}
              </button>
            </BackgroundGradient>
          );
        })}
      </div>
    </div>
  );
}
