import Image from "next/image";
import { AnimatedTestimonials } from "../_components/ui/animated-testimonials";
import { cinzel } from "../layout";

export default function Testimonilas() {
  const testimonials = [
    {
      quote:
        "Booking our stag party with DXB Stag Parties was the best decision we made. From VIP nightlife access to unforgettable daytime adventures, everything was handled with precision and style. It honestly felt like a once-in-a-lifetime experience — Dubai at its absolute best. The guys still talk about it every week!",
      name: "— James Carter",
      designation: "Best Man",
      src: "/images/testimonilas/testimonila1.webp",
    },
    {
      quote:
        "As the groom-to-be, I wanted something unforgettable but stress-free. DXB Stag Parties took care of everything — from the wild nights to the epic daytime adventures. All I had to do was show up and enjoy with my mates. It was the perfect send-off before married life — truly world-class!",
      name: "— Michael Andrews",
      designation: "Groom-to-Be",
      src: "/images/testimonilas/testimonila2.webp",
    },
    {
      quote:
        "I was the one organizing the whole stag trip, and honestly, I was worried about handling all the details. DXB Stag Parties made it effortless — from bookings to VIP access, everything ran smoothly. The guys thought I had done all the hard work, but it was really the team making me look good. Couldn’t have asked for better!",
      name: "— Daniel Foster",
      designation: "Group Organizer",
      src: "/images/testimonilas/testimonila3.webp",
    },
    {
      quote:
        "I flew in from overseas just for the stag, and it was worth every mile. The whole experience felt like pure VIP treatment — yachts, clubs, adventures, all without a single hiccup. DXB Stag Parties know how to create memories that last a lifetime. I’m already planning my next trip back to Dubai!",
      name: "— Oliver Bennett",
      designation: "International Guest",
      src: "/images/testimonilas/testimonila4.webp",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} cinzel={cinzel} />;
}
