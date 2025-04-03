import HomeHeroSection from "./_components/HomeHeroSection";
// import HomeStagPartyGrids from "./_components/HomeStagPartyGrids";
import Testimonilas from "./_components/Testimonials";
import HowItWorks from "./_components/HowItWorks";
import HomePackages from "@/app/_components/HomePackages";
import WhyChooseUs from "@/app/_components/WhyChooseUs";
import HomeActivities from "@/app/_components/HomeActivities";
import { getPackages } from "./_lib/packagesApi";
// import Map from "@/app/_components/Map";

export const revalidate = 0;
export default async function Home() {
  const packages = await getPackages();
  return (
    <div className="flex flex-col justify-center space-y-6">
      <HomeHeroSection />
      <HomeActivities />
      <HomePackages packages={packages} />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonilas />
    </div>
  );
}
