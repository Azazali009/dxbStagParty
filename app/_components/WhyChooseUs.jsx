import HomeIconBox from "./HomeIconBox";

export default function WhyChooseUs() {
  return (
    <div className="mx-auto w-[95%] py-20">
      <h2 className="mb-10 bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-4xl">
        Why Book With Us
      </h2>
      <div className="my-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* icons box 1 */}

        <HomeIconBox title={" 5-Star Reviews"} icon={"/images/stars.png"}>
          Our customers consistently rate us 5 stars for our exceptional
          service, reliability, and unforgettable experiences.
        </HomeIconBox>
        {/* icons box 2 */}
        <HomeIconBox icon={"/images/map.png"} title={"Local Experts in Dubai"}>
          Our Dubai-based team knows the city inside out, ensuring you get the
          best recommendations and seamless experiences.
        </HomeIconBox>
        <HomeIconBox
          icon={"/images/ticket.png"}
          title={"Exclusive Access to Top Venues"}
        >
          Skip the lines and enjoy premium access to Dubai’s most sought-after
          attractions and experiences.
        </HomeIconBox>
        <HomeIconBox icon={"/images/secure.png"} title={"Hassle-Free Booking "}>
          Secure your spot with an easy, fast, and reliable booking process.
        </HomeIconBox>
      </div>
    </div>
  );
}
