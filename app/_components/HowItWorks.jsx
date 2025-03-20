import Image from "next/image";
import MeteorsDemo from "./MeteorsDemo";
import image from "@/public/how_it_works.webp";
import image2 from "@/public/how_it_works2.webp";
import image3 from "@/public/how_it_works3.webp";
export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-[95%] py-20">
      <h2 className="mb-10 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent">
        How it works
      </h2>
      <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 md:grid-cols-3">
        <MeteorsDemo>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={image}
              width={100}
              height={100}
              alt="how it works"
              placeholder="blur"
              quality={80}
            />

            <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-lg font-semibold text-transparent">
              You choose your stag party
            </h3>
            <p className="text-sm leading-[1.7]">
              Build your own stag, choose a ready made package or just book a
              single activity. It&apos;s free to check availability!
            </p>
          </div>
        </MeteorsDemo>
        <MeteorsDemo>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={image2}
              width={100}
              height={100}
              alt="how it works"
              placeholder="blur"
              quality={80}
            />

            <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-lg font-semibold text-transparent">
              We&apos;ll check & let you know
            </h3>
            <p className="text-sm leading-[1.7]">
              Once it&apos;s booked, invite the group to your VIP GroupSite &
              our smart Stag Party Planning System will do all the hard work for
              you.
            </p>
          </div>
        </MeteorsDemo>
        <MeteorsDemo>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={image3}
              width={100}
              height={100}
              alt="how it works"
              placeholder="blur"
              quality={80}
            />

            <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-lg font-semibold text-transparent">
              You relax & party on the day!
            </h3>
            <p className="text-sm leading-[1.7]">
              Maximum flexibility and zero stress means you can focus on the fun
              things like games, pranks, costumes & pints!
            </p>
          </div>
        </MeteorsDemo>
      </div>
    </div>
  );
}
