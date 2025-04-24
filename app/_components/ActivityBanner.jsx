import Image from "next/image";
import { auth } from "../_lib/auth";
import { cinzel } from "../layout";
import BookingWindowAndButton from "./BookingWindowAndButton";

export default async function ActivityBanner({ activity, session }) {
  const { name, description, image, bannerImage } = activity;

  return (
    <section className="relative flex min-h-[800px] flex-col justify-center gap-4 object-cover p-4">
      <Image
        src={bannerImage || image}
        fill
        alt={name}
        quality={100}
        className="object-cover"
      />
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-navyBlue/80 to-navyBlue/10"></div>
      <div className="relative z-10 ml-6 max-w-[500px] space-y-4">
        <h1
          className={`text-7xl font-bold tracking-tight text-matalicGold ${cinzel.className}`}
        >
          {name}
        </h1>
        <p className="leading-[1.6]">{description}</p>
        <BookingWindowAndButton session={session} activity={activity} />
      </div>
    </section>
  );
}
