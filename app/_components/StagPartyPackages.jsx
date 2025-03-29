import { Suspense } from "react";
import PackagesGrid from "../_components/PackagesGrid";
import TextExpander from "../_components/TextExpander";
import { getPackages } from "@/app/_lib/packagesApi";
import Spinner from "./Spinner";

export default async function StagPartyPackages({ filter }) {
  const packages = await getPackages();
  let filteredPackages;
  if (filter === "all" || !filter) filteredPackages = packages;
  if (filter === "small")
    filteredPackages = packages.filter((pack) => {
      const [min, max] = pack.group_size.split("-").map(Number);
      return min <= 4;
    });
  if (filter === "medium")
    filteredPackages = packages.filter((pack) => {
      const [min, max] = pack.group_size.split("-").map(Number);
      return min <= 5 && max >= 7;
    });
  if (filter === "large")
    filteredPackages = packages.filter((pack) => {
      const [min, max] = pack.group_size.split("-").map(Number);
      return min >= 8;
    });

  return (
    <div className="mx-auto flex max-w-6xl flex-col justify-center gap-4 py-24">
      <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
        Our expert built stag party packages
      </h2>
      <div className="max-w-4xl">
        <TextExpander>
          We’ve cracked the code for an epic stag bash, and our all-inclusive
          stag party packages are the express route to stag do greatness. Listen
          up, organizing a stag party can be a mess, but we’ve got your back!
          Our crack team has handcrafted these hassle-free packages, sparing you
          the headache and endless emails back and forth with suppliers.
          Discover the ultimate stag activities, nightlife hotspots, top-notch
          grub, and banging accommodations in prime destinations across Ireland,
          the UK, and Europe! And guess what? You’re not confined by our setup –
          customise your stag party package with extra add-ons, switch things
          up, or even craft your own package from scratch if you’re feeling
          bold. Pick your destination below to kick things off or reach out to
          us for a chat about your stag do plans. Let’s make this last night of
          freedom a legendary one!
        </TextExpander>
      </div>
      <Suspense fallback={<Spinner />}>
        <PackagesGrid packages={filteredPackages} filter={filter} />
      </Suspense>
    </div>
  );
}
