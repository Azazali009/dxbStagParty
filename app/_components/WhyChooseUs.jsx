import Image from "next/image";
import { cinzel, playfairDisplay } from "../layout";
import experienceSvg from "../svgIcons/experience.svg";
import trustSvg from "../svgIcons/trust.svg";

export default function WhyChooseUs() {
  return (
    // <div className="mx-auto w-[95%] py-20">
    //   <h2 className="mb-10 bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-4xl">
    //     Why Book With Us
    //   </h2>
    //   <div className="my-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    //     {/* icons box 1 */}

    //     <HomeIconBox title={" 5-Star Reviews"} icon={"/images/stars.png"}>
    //       Our customers consistently rate us 5 stars for our exceptional
    //       service, reliability, and unforgettable experiences.
    //     </HomeIconBox>
    //     {/* icons box 2 */}
    //     <HomeIconBox icon={"/images/map.png"} title={"Local Experts in Dubai"}>
    //       Our Dubai-based team knows the city inside out, ensuring you get the
    //       best recommendations and seamless experiences.
    //     </HomeIconBox>
    //     <HomeIconBox
    //       icon={"/images/ticket.png"}
    //       title={"Exclusive Access to Top Venues"}
    //     >
    //       Skip the lines and enjoy premium access to Dubai’s most sought-after
    //       attractions and experiences.
    //     </HomeIconBox>
    //     <HomeIconBox icon={"/images/secure.png"} title={"Hassle-Free Booking "}>
    //       Secure your spot with an easy, fast, and reliable booking process.
    //     </HomeIconBox>
    //   </div>
    // </div>
    // <div className="bg-reddish px-4 py-10 sm:py-20">
    //   <div className="mx-auto max-w-6xl space-y-12">
    //     <h2
    //       className={`text-[#e0b15e] ${cinzel.className} text-2xl font-bold sm:text-4xl`}
    //     >
    //       what makes us different{" "}
    //     </h2>
    //     <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3 lg:grid-cols-4">
    //       {/* package box */}
    //       <div className="flex flex-col items-center gap-3 text-center">
    //         <Image
    //           src={"/images/directSupplier.png"}
    //           width={100}
    //           height={100}
    //           alt="package"
    //         />
    //         <h3 className={`text-xl font-semibold ${cinzel.className}`}>
    //           Direct Supplier
    //         </h3>
    //         <p className="text-softGold/50 leading-[1.5]">
    //           we work only with the best vendors in dubai
    //         </p>
    //       </div>
    //       {/* Customize box */}
    //       <div className="flex flex-col items-center gap-3 text-center">
    //         <Image
    //           src={"/images/split-payment2.png"}
    //           width={100}
    //           height={100}
    //           alt="package"
    //         />
    //         <h3 className={`text-xl font-semibold ${cinzel.className}`}>
    //           split payment
    //         </h3>
    //         <p className="text-softGold/50 leading-[1.5]">
    //           Guests can pay individually to simplity things
    //         </p>
    //       </div>
    //       {/* Split-Payment box */}
    //       <div className="flex flex-col items-center gap-3 text-center">
    //         <Image
    //           src={"/images/conceirge.png"}
    //           width={100}
    //           height={100}
    //           alt="package"
    //         />
    //         <h3 className={`text-xl font-semibold ${cinzel.className}`}>
    //           premium concierge
    //         </h3>
    //         <p className="text-softGold/50 leading-[1.5]">
    //           Expert support available 24/7 for seamless experience
    //         </p>
    //       </div>
    //       {/* party box */}
    //       <div className="flex flex-col items-center gap-3 text-center">
    //         <Image
    //           src={"/images/curatedLuxury.png"}
    //           width={100}
    //           height={100}
    //           alt="package"
    //         />
    //         <h3 className={`text-xl font-semibold ${cinzel.className}`}>
    //           Curated Luxury
    //         </h3>
    //         <p className="text-softGold/50 leading-[1.5]">
    //           High end vibes with the perfect mix of adventure and party energy
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="relative flex min-h-dvh w-full items-center justify-center object-cover py-14">
      {/* blur overlay */}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-navyBlue/30 backdrop-blur-md"></div>
      <Image
        className="h-full object-cover"
        src={"/images/whyChooseUs-bg.webp"}
        fill
        alt="why choose us"
      />
      <div className="relative z-20 space-y-8 text-center">
        <h2
          className={`${cinzel.className} text-2xl font-semibold text-matalicGold sm:text-3xl md:text-6xl`}
        >
          Why choose dxb <br /> stag parties
        </h2>
        <p
          className={`${playfairDisplay.className} text-xl font-semibold tracking-wider`}
        >
          Elevate Your Celebration to Legendary Status
        </p>
        <p className="mx-auto w-[80%] text-balance leading-[1.6]">
          At DXB Stag Parties, we specialize in curating unforgettable stag
          experiences across Dubai and the UAE.
        </p>
        <div className="!mt-14 w-full space-y-6 text-left">
          <h3
            className={`text-2xl ${cinzel.className} font-semibold text-matalicGold`}
          >
            What Sets Us Apart:
          </h3>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image
                src={experienceSvg}
                width={20}
                height={20}
                alt="experience"
              />
              <h4 className="font-medium">Tailored Experiences</h4>
            </div>
            <p className="font-extralight">
              Every party is customized to your group.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image src={trustSvg} width={20} height={20} alt="experience" />
              <h4 className="font-medium">Exclusive Access</h4>
            </div>
            <p className="font-extralight">
              Entry to Dubai&apos;s top venues and notspots..
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image src={trustSvg} width={20} height={20} alt="experience" />
              <h4 className="font-medium">Comprehensive Planning</h4>
            </div>
            <p className="font-extralight">
              We handle all logistics from start to finish.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <Image src={trustSvg} width={20} height={20} alt="experience" />
              <h4 className="font-medium">Local Expertise</h4>
            </div>
            <p className="font-extralight">
              Your well-being is our top priority.
            </p>
          </div>
        </div>
        <div className="space-y-4 !py-6">
          <p
            className={`text-xl ${playfairDisplay.className} font-light !italic tracking-wider`}
          >
            &quot;DXB Stag Parties turned our celebration into an epic
            adventure. <br />
            Every detail was flawless!&quot;
          </p>
          <p className="font-light">- James 1, London</p>
        </div>
        <p
          className={`text-xl ${playfairDisplay.className} font-light !italic tracking-wider`}
        >
          &quot;From the yacht party to the VIP club access, everything <br />{" "}
          exceeded our expectations.&quot;
        </p>
      </div>
    </div>
  );
}
