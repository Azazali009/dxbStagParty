import HomeHeroSection from "./_components/HomeHeroSection";
import Testimonilas from "./_components/Testimonials";
import HowItWorks from "./_components/HowItWorks";
import HomePackages from "./_components/HomePackages";
import WhyChooseUs from "./_components/WhyChooseUs";
import HomeActivities from "./_components/HomeActivities";
import HomeWhatsAppButton from "./_components/HomeWhatsAppButton";

export const metadata = {
  title: "DXB Stag party",
};
export default function Home() {
  return (
    <div className="mx-auto max-w-full space-y-6">
      <HomeHeroSection />
      <HomeActivities />
      <HowItWorks />
      {/* <HomePackages /> */}
      <Testimonilas />
      {/* <WhyChooseUs /> */}
      {/* <HomeWhatsAppButton /> */}
    </div>
  );
}
