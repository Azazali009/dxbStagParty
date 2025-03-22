import AnimatedHeading from "./AnimatedHeading";
import Button from "./Button";
import { Spotlight } from "./ui/Spotlight";

export default function HomeHeroSection() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <Spotlight className="-top-40 left-0 md:-top-0 md:left-60" fill="white" />
      <AnimatedHeading>Welcome To DXB Stag Parties</AnimatedHeading>
      <p className="text-lg text-neutral-400">
        Book an unforgettable Stag Do in Dubai!
      </p>
      <div className="relative z-20 flex items-center gap-8">
        <Button>choose your destinations</Button>
        <Button>Search by dates</Button>
      </div>
    </div>
  );
}
