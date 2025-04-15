import Image from "next/image";
import { cinzel } from "../layout";
import HomeIconBox from "./HomeIconBox";

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
    <div className="bg-reddish px-4 py-10 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <h2
          className={`text-[#e0b15e] ${cinzel.className} text-2xl font-bold sm:text-4xl`}
        >
          what makes us different{" "}
        </h2>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3 lg:grid-cols-4">
          {/* package box */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Image
              src={"/images/directSupplier.png"}
              width={100}
              height={100}
              alt="package"
            />
            <h3 className={`text-xl font-semibold ${cinzel.className}`}>
              Direct Supplier
            </h3>
            <p className="text-softGold/50 leading-[1.5]">
              we work only with the best vendors in dubai
            </p>
          </div>
          {/* Customize box */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Image
              src={"/images/split-payment2.png"}
              width={100}
              height={100}
              alt="package"
            />
            <h3 className={`text-xl font-semibold ${cinzel.className}`}>
              split payment
            </h3>
            <p className="text-softGold/50 leading-[1.5]">
              Guests can pay individually to simplity things
            </p>
          </div>
          {/* Split-Payment box */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Image
              src={"/images/conceirge.png"}
              width={100}
              height={100}
              alt="package"
            />
            <h3 className={`text-xl font-semibold ${cinzel.className}`}>
              premium concierge
            </h3>
            <p className="text-softGold/50 leading-[1.5]">
              Expert support available 24/7 for seamless experience
            </p>
          </div>
          {/* party box */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Image
              src={"/images/curatedLuxury.png"}
              width={100}
              height={100}
              alt="package"
            />
            <h3 className={`text-xl font-semibold ${cinzel.className}`}>
              Curated Luxury
            </h3>
            <p className="text-softGold/50 leading-[1.5]">
              High end vibes with the perfect mix of adventure and party energy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
