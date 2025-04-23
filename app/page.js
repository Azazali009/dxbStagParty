import Divider from "./_components/Divider";
import HomeActivities from "./_components/HomeActivities";
import HomeEpicExperiences from "./_components/HomeEpicExperiences";
import HomeHeroSection from "./_components/HomeHeroSection";
import HowItWorks from "./_components/HowItWorks";
import Testimonilas from "./_components/Testimonials";
import HomeFeaturedPackage from "./_components/HomeFeaturedPackage";
import WhyChooseUs from "./_components/WhyChooseUs";

export const metadata = {
  title: "DXB Stag party",
};
export default function Home() {
  return (
    <div className="mx-auto max-w-full space-y-6">
      <HomeHeroSection />
      <HomeActivities />
      <HowItWorks />
      <HomeEpicExperiences />
      <Divider />
      <Testimonilas />
      <HomeFeaturedPackage />
      <WhyChooseUs />
      {/* <HomeWhatsAppButton /> */}
    </div>
  );
}
