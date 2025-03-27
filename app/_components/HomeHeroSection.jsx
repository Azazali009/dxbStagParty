import AnimatedHeading from "./AnimatedHeading";
import Button from "./Button";
import { Spotlight } from "./ui/Spotlight";

export default function HomeHeroSection() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10 sm:min-h-screen sm:py-0">
      <Spotlight
        className="left-0 top-0 sm:-top-40 md:-top-0 md:left-60"
        fill="white"
      />
      <AnimatedHeading>Welcome To DXB Stag Parties</AnimatedHeading>
      <p className="text-center text-sm text-neutral-400 sm:text-lg">
        Book an unforgettable Stag Do in Dubai!
      </p>
      <div className="relative z-20 flex items-center gap-4">
        <Button>book now</Button>
        <Button>contact us</Button>
      </div>
    </div>
  );
}
