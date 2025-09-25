import BlogHero from "../_components/BlogHero";
import Blogs from "../_components/Blogs";

export const metadata = {
  title: "DXB Stag party - Top 5 Stag Party Ideas in Dubai",
  description:
    "Discover the ultimate stag party ideas to make your Dubai celebration unforgettable.",
};
export default function Page() {
  return (
    <div className="space-y-10 px-2 py-6 xs:px-8">
      <BlogHero />
      <Blogs />
    </div>
  );
}
