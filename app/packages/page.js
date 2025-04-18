import PackagesHeroSection from "../_components/PackagesHeroSection";
import StagPartyPackages from "../_components/StagPartyPackages";
import Testimonilas from "../_components/Testimonials";

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const filter = searchParams.groupSize ?? "all";
  return (
    <div className="mx-auto max-w-7xl">
      <PackagesHeroSection />
      <StagPartyPackages filter={filter} />
      <Testimonilas />
    </div>
  );
}
