import HomeHeroSection from "./_components/HomeHeroSection";
import Testimonilas from "./_components/Testimonials";
import HowItWorks from "./_components/HowItWorks";
import HomePackages from "./_components/HomePackages";
import WhyChooseUs from "./_components/WhyChooseUs";
import HomeActivities from "./_components/HomeActivities";
import HomeWhatsAppButton from "./_components/HomeWhatsAppButton";

export default async function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col justify-center space-y-6">
      <HomeHeroSection />
      <HomeActivities />
      <HowItWorks />
      <HomePackages />
      <Testimonilas />
      <WhyChooseUs />
      <HomeWhatsAppButton />
    </div>
  );
}
