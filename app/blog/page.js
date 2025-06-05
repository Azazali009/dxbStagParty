import Link from "next/link";
import BlogHero from "../_components/BlogHero";
import Blogs from "../_components/Blogs";
import { cinzel, playfairDisplay } from "../layout";

export const metadata = {
  title: "Top 5 Stag Party Ideas in Dubai | DXB Stag party",
  description:
    "Discover the ultimate stag party ideas to make your Dubai celebration unforgettable.",
};
export default function Page() {
  return (
    <div className="space-y-10 px-2 py-6 xs:px-8">
      <div className="flex flex-col items-center justify-center gap-3 text-center xs:gap-6">
        <h1
          className={`${cinzel.className} text-2xl font-semibold text-matalicGold xs:text-5xl`}
        >
          plan like a pro
        </h1>
        <p className="text-xs xs:text-base">
          Everything you need for a legendary dubai stag.
        </p>
        <Link
          className={`rounded-md bg-[#694621] px-4 py-2 text-sm capitalize tracking-wider xs:px-6 xs:text-base ${playfairDisplay.className}`}
          href={"#"}
        >
          start browsing
        </Link>
      </div>
      <BlogHero />
      <Blogs />
    </div>
  );
}
