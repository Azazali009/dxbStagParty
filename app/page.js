import Divider from "./_components/Divider";
import HomeActivities from "./_components/HomeActivities";
import HomeBlogSection from "./_components/HomeBlogSection";
import HomeEpicExperiences from "./_components/HomeEpicExperiences";
import HomeFeaturedPackage from "./_components/HomeFeaturedPackage";
import HomeHeroSection from "./_components/HomeHeroSection";
import HowItWorks from "./_components/HowItWorks";
import Testimonilas from "./_components/Testimonials";
import WhyChooseUs from "./_components/WhyChooseUs";

export const metadata = {
  title: "DXB Stag party",
  description:
    "At DXB Stag Parties, we specialize in curating unforgettable stag experiences across Dubai and the UAE. What Sets Us Apart: experience. Tailored Experiences.",
};

export default function Home() {
  return (
    <div className="space-y-6">
      <HomeHeroSection />
      <HomeActivities />
      <HowItWorks />
      <HomeEpicExperiences />
      <Divider />
      <Testimonilas />
      <HomeFeaturedPackage />
      <WhyChooseUs />
      <HomeBlogSection />
    </div>
  );
}
