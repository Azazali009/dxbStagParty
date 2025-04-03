import Image from "next/image";
import React from "react";
import HomeIconBox from "@/app/_components/HomeIconBox";
import starIcon from "@/public/images/stars.png";
import mapIcon from "@/public/images/map.png";
import ticketIcon from "@/public/images/ticket.png";
import secureIcon from "@/public/images/secure.png";

export default function WhyChooseUs() {
  return (
    <div className="mx-auto w-[95%] py-20">
      <h2 className="mb-10 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-4xl">
        Why Book With Us
      </h2>
      <div className="my-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* icons box 1 */}

        <HomeIconBox title={" 5-Star Reviews"} icon={starIcon}>
          Our customers consistently rate us 5 stars for our exceptional
          service, reliability, and unforgettable experiences.
        </HomeIconBox>
        {/* icons box 2 */}
        <HomeIconBox icon={mapIcon} title={"Local Experts in Dubai"}>
          Our Dubai-based team knows the city inside out, ensuring you get the
          best recommendations and seamless experiences.
        </HomeIconBox>
        <HomeIconBox icon={ticketIcon} title={"Exclusive Access to Top Venues"}>
          Skip the lines and enjoy premium access to Dubai’s most sought-after
          attractions and experiences.
        </HomeIconBox>
        <HomeIconBox icon={secureIcon} title={"Hassle-Free Booking "}>
          Secure your spot with an easy, fast, and reliable booking process.
        </HomeIconBox>
      </div>
    </div>
  );
}
