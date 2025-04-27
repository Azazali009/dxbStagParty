import Link from "next/link";
import { playfairDisplay } from "../layout";
import Image from "next/image";
import whiteWhatsapp from "../svgIcons/whiteWhatsapp.svg";
export default function ContactHero() {
  return (
    <section className="-mt-[110px] flex min-h-[700px] flex-col items-center justify-center gap-4 bg-[url('/images/contact-bg.webp')] bg-cover bg-no-repeat">
      <div className="absolute left-0 top-0 min-h-[700px] w-full bg-gradient-to-b from-transparent to-navyBlue/80"></div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <h1
          className={`${playfairDisplay.className} text-balance text-center text-5xl font-semibold capitalize leading-[1.3]`}
        >
          your legendary dubai stag <br /> party starts here
        </h1>
        <p>Tell us your dream - we well make it a weekend to remember</p>
        <div className="flex items-center gap-6">
          <Link
            className="flex h-10 items-center gap-2 rounded-md border border-emerald-800 bg-emerald-800 px-6 capitalize duration-300 hover:bg-emerald-950"
            href={"https://wa.me/+971568347487"}
          >
            <Image src={whiteWhatsapp} width={25} height={25} alt="whatsapp" />
            <span>chat on whatsapp</span>
          </Link>
          <Link
            href={"#enquire"}
            className="flex h-10 items-center justify-center rounded-md border border-neutral-600 bg-transparent px-6 capitalize duration-300 hover:opacity-80"
          >
            send an enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
