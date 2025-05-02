import Link from "next/link";
import BlogHero from "../_components/BlogHero";
import Blogs from "../_components/Blogs";
import { cinzel, playfairDisplay } from "../layout";
export default function Page() {
  return (
    <div className="space-y-10 py-6">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1
          className={`${cinzel.className} text-5xl font-semibold text-matalicGold`}
        >
          plan like a pro
        </h1>
        <p>Everything you need for a legendary dubai stag.</p>
        <Link
          className={`rounded-md bg-[#694621] px-6 py-2 capitalize tracking-wider ${playfairDisplay.className}`}
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
