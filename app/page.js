import HomeActivities from "./_components/HomeActivities";
import HomeEpicExperiences from "./_components/HomeEpicExperiences";
import HomeHeroSection from "./_components/HomeHeroSection";
import HowItWorks from "./_components/HowItWorks";
import Testimonilas from "./_components/Testimonials";
import Divider from "./_components/Divider";

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
      <HomeEpicExperiences />
      <Divider />
      <Testimonilas />
      {/* <WhyChooseUs /> */}
      {/* <HomeWhatsAppButton /> */}
    </div>
  );
}
