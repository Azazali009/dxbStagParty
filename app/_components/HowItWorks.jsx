import Image from "next/image";
import MeteorsDemo from "./MeteorsDemo";
export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-[95%] py-10 sm:py-20">
      <h2 className="mb-10 bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-4xl">
        How it works
      </h2>
      <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2 lg:grid-cols-3">
        <MeteorsDemo>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={"/how_it_works.webp"}
              width={100}
              height={100}
              alt="how it works"
              quality={80}
            />

            <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-base font-semibold text-transparent sm:text-lg">
              You choose your stag party
            </h3>
            <p className="text-xs leading-[1.7] sm:text-sm">
              Build your own stag, choose a ready made package or just book a
              single activity. It&apos;s free to check availability!
            </p>
          </div>
        </MeteorsDemo>
        <MeteorsDemo>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={"/how_it_works2.webp"}
              width={100}
              height={100}
              alt="how it works"
              quality={80}
            />

            <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-base font-semibold text-transparent sm:text-lg">
              We&apos;ll check & let you know
            </h3>
            <p className="text-xs leading-[1.7] sm:text-sm">
              Once it&apos;s booked, invite the group to your VIP GroupSite &
              our smart Stag Party Planning System will do all the hard work for
              you.
            </p>
          </div>
        </MeteorsDemo>
        <MeteorsDemo>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={"/how_it_works3.webp"}
              width={100}
              height={100}
              alt="how it works"
              quality={80}
            />

            <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-base font-semibold text-transparent sm:text-lg">
              You relax & party on the day!
            </h3>
            <p className="text-xs leading-[1.7] sm:text-sm">
              Maximum flexibility and zero stress means you can focus on the fun
              things like games, pranks, costumes & pints!
            </p>
          </div>
        </MeteorsDemo>
      </div>
    </section>
  );
}
