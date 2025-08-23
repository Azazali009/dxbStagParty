import Link from "next/link";
import { playfairDisplay } from "../layout";
import Button from "./Button";

export default function ContactHero() {
  return (
    <section className="-mt-[110px] flex min-h-[400px] flex-col items-center justify-end gap-4 bg-[url('/images/contact-bg.webp')] bg-cover bg-no-repeat pb-4 xs:min-h-[500px] xs:justify-center xs:pb-0 sm:min-h-[700px]">
      <div className="absolute left-0 top-0 min-h-[700px] w-full bg-gradient-to-b from-transparent to-navyBlue/80"></div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center sm:gap-8">
        <h1
          className={`${playfairDisplay.className} text-balance text-center text-2xl font-semibold capitalize !leading-[1.3] xs:text-4xl sm:text-5xl`}
        >
          your legendary dubai stag <br /> party starts here
        </h1>
        <p className="text-xs xs:text-base">
          Tell us your dream - we well make it a weekend to remember
        </p>
        <div className="flex items-center gap-3 sm:gap-6">
          {/* <Link
            className="flex h-8 items-center gap-1 rounded-md border border-emerald-800 bg-emerald-800 px-4 text-[10px] capitalize duration-300 hover:bg-emerald-950 xs:gap-2 sm:h-10 sm:px-6 sm:text-base"
            href={"https://wa.me/+971568347487"}
          >
            <Image
              src={whiteWhatsapp}
              width={25}
              height={25}
              className="w-3 xs:w-5"
              alt="whatsapp"
            />
            <span>chat on whatsapp</span>
          </Link> */}
          <Button
            variation="gold"
            className={"w-fit rounded-md"}
            href={"/builder"}
          >
            Start Planning Your Stag Party
          </Button>
          <Link
            href={"#enquire"}
            className="flex items-center justify-center rounded-md border border-neutral-600 bg-transparent px-4 py-2 text-[10px] capitalize duration-300 hover:opacity-80 sm:px-6 sm:py-3 sm:text-base"
          >
            send an enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
