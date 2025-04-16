import Image from "next/image";
import { auth } from "../_lib/auth";
import { cinzel } from "../layout";
import BookingWindowAndButton from "./BookingWindowAndButton";

export default async function ActivityBanner({ activity }) {
  const { name, description, image } = activity;
  const session = await auth();
  return (
    <section className="relative flex min-h-[100vh] flex-col justify-center gap-4 object-cover p-4">
      <Image
        src={image}
        fill
        alt={name}
        quality={100}
        className="object-cover object-top"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-navyBlue to-navyBlue/20"></div>
      <div className="relative z-10 ml-6 max-w-[500px] space-y-4">
        <h1 className={`text-7xl font-bold tracking-tight ${cinzel.className}`}>
          {name}
        </h1>
        <p className="leading-[1.6]">{description}</p>
        <BookingWindowAndButton session={session} activity={activity} />
      </div>
    </section>
  );
}
