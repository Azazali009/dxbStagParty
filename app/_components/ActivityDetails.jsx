import Image from "next/image";
import { auth } from "../_lib/auth";
import BookingWindowAndButton from "./BookingWindowAndButton";
import ActivityBanner from "./ActivityBanner";
import { getCurrentUser } from "../_lib/getCurrentUser";
import ActivityDetailSections from "./ActivityDetailSections";
import ActivitySupportSections from "./ActivitySupportSections";

export default async function ActivityDetails({ activity }) {
  const { name, description, image } = activity;
  const user = await getCurrentUser();
  return (
    // <>
    //   {/* header image banner */}
    //   <ActivityBanner activity={activity} session={session} />
    //   {/* overview section */}
    //   <section className="mx-auto grid w-[95%] max-w-7xl grid-cols-1 items-center justify-items-center gap-8 border-b border-navyBlue/30 py-14 md:grid-cols-2">
    //     <div className="space-y-4">
    //       <h2 className={`${cinzel.className} text-4xl font-bold uppercase`}>
    //         Overview
    //       </h2>
    //       <p className={`leading-[1.9]`}>
    //         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ab
    //         eveniet et nam totam officia iusto. Quo ipsam minus placeat est
    //         obcaecati! Quas, earum sed placeat minima blanditiis sint fuga ullam
    //         ab ducimus velit, nam natus itaque voluptatum recusandae
    //         repellendus, ut dignissimos eum autem! Inventore autem molestiae
    //         consequatur explicabo facere.
    //       </p>
    //     </div>
    //     <Image
    //       src={"/images/food.jpg"}
    //       width={500}
    //       height={500}
    //       alt="food image"
    //       className="aspect-square h-[320px] object-cover"
    //     />
    //   </section>
    //   {/* details section */}
    //   <section className="mx-auto w-[95%] max-w-7xl space-y-8 border-b border-navyBlue/30 py-14">
    //     <h2 className={`${cinzel.className} text-4xl font-bold uppercase`}>
    //       details
    //     </h2>
    //     <div className="grid grid-cols-3 justify-items-start gap-6">
    //       {/* duration box */}
    //       <div className="flex flex-col items-center gap-2">
    //         <div className="flex items-center gap-2">
    //           <Image src={clock} height={25} width={25} alt="clock" />
    //           <span className="text-xl font-semibold uppercase text-matalicGold">
    //             Duration
    //           </span>
    //         </div>
    //         <p>{duration}</p>
    //       </div>
    //       {/* Group size box */}
    //       <div className="flex flex-col items-center gap-2">
    //         <div className="flex items-center gap-2">
    //           <Image src={user} height={25} width={25} alt="clock" />
    //           <span className="text-xl font-semibold uppercase text-matalicGold">
    //             Group size
    //           </span>
    //         </div>
    //         <p>{group_size} people</p>
    //       </div>
    //       {/* includes box */}
    //       <div className="flex flex-col items-center gap-2">
    //         <div className="flex items-center gap-2">
    //           <Image src={includes} height={25} width={25} alt="clock" />
    //           <span className="text-xl font-semibold uppercase text-matalicGold">
    //             includes
    //           </span>
    //         </div>
    //         <p>Multi-course buffet</p>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="mx-auto grid w-[95%] grid-cols-2 gap-16 py-20">
    //     {/*  */}
    //     <div className="relative h-[400px] object-cover">
    //       <Image src={"/images/home-hero-bg.webp"} fill alt="image" />
    //     </div>
    //     <div className="space-y-8">
    //       <h2
    //         className={`${cinzel.className} text-2xl font-bold text-matalicGold sm:text-5xl`}
    //       >
    //         Whats included
    //       </h2>
    //       <ul className="list-inside list-disc space-y-4 text-xl font-extralight capitalize">
    //         <li>multi-course buffet</li>
    //         <li>unlimited drinks</li>
    //         <li>live music or DJ</li>
    //         <li>reserved table</li>
    //       </ul>
    //       <BookingWindowAndButton session={session} activity={activity} />
    //     </div>
    //   </section>
    // </>
    // <div className="grid grid-cols-[2.5fr_1fr]">
    //   <div className="grid grid-cols-[1.5fr_0.5fr] gap-4">
    //     <div className="relative min-h-dvh object-cover">
    //       <Image
    //         src={image}
    //         fill
    //         alt="image"
    //         className="object-cover object-right"
    //       />
    //     </div>
    //     <div className="space-y-4">
    //       <Image
    //         src={"/images/how-it-work.webp"}
    //         height={200}
    //         width={200}
    //         alt="image"
    //         className="rounded-xl"
    //       />

    //       <Image
    //         src={"/images/how-it-work.webp"}
    //         height={200}
    //         width={200}
    //         alt="image"
    //         className="rounded-xl"
    //       />
    //       <Image
    //         src={"/images/how-it-work.webp"}
    //         height={200}
    //         width={200}
    //         alt="image"
    //         className="rounded-xl"
    //       />
    //     </div>
    //   </div>
    //   <div className="space-y-4 p-4">
    //     <h1 className="text-7xl font-bold">{name}</h1>
    //     <p className="text-lg font-medium leading-[1.3]">{description}</p>
    //     {/* <button className="block w-full rounded-md bg-red-600 py-3 text-lg font-semibold text-white duration-300 hover:bg-red-700">
    //       Book now
    //     </button> */}
    //     <BookingWindowAndButton user={user} activity={activity} />
    //     {/* details */}
    //     <div className="space-y-4">
    //       <h2 className="text-2xl font-semibold">Details</h2>
    //       <div className="flex flex-wrap justify-between gap-2 text-lg">
    //         <p>🕧 Duration</p>
    //         <p>⏳ upto 3 hours</p>
    //         <p>🍾 Unlimited drinks</p>
    //       </div>
    //     </div>
    //     {/* addons */}
    //     <div className="space-y-4">
    //       <h2 className="text-2xl font-semibold">Upgrade/Add-On</h2>
    //       <div className="flex flex-col gap-2 text-lg">
    //         <p>+ Bottle Services</p>
    //         <p>+ Private host</p>
    //         <p>+ Golf pro challenge</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="space-y-12 text-softGold">
      <ActivityBanner activity={activity} user={user} />
      <ActivityDetailSections activity={activity} />
      <ActivitySupportSections activity={activity} />
    </div>
  );
}

{
  /* Section - Modules 5-8

2 Options on this also, see which works better with the flow and is in line with the section above etc.                                     Section 5 - Optional add ons - Colour should continue, maybe getting deeper in colour but it needs to feel like it’s still the same activity and not a different page. 
Design Style:
	•	Horizontally scrollable (on mobile) or inline on desktop
	•	Icon + label only — clean, premium, non-cluttered
	•	Soft dividers or gold bullets (no boxy cards)

Contents:
	•	Header: Optional Add-Ons
	•	Items (Icon + Label):
	•	BBQ Feast
	•	Photographer
	•	Drone Footage
	•	Transfers
	•	Hookah Lounge
	•	Ice Chest Upgrade

Style Tip: Use hand-drawn or outlined icons for an “editorial” luxury feel rather than cartoon-style icons.

⸻

SECTION 6: Practical Info

Design Style:
	•	Split into two clear but stylized columns
	•	Think “Luxury Magazine Footer” — soft underlines or subtle icons
	•	Small, digestible sections

Contents:

Left:
	•	Where It Happens
	•	Location name (Al Badayer Desert)
	•	Mini Map (optional)
	•	Distance from Dubai Marina (e.g. “~45 mins drive”)

Right:
	•	What to Bring
	•	Closed shoes
	•	Sunglasses
	•	ID for waiver
	•	Dress Code: Comfortable / activewear
	•	Mobility Note: Optional if needed

⸻

SECTION 7: Reviews / Social Proof

Design Style:
	•	No grid, no boxed Trustpilot blocks
	•	Quote-style carousel or 3–4 bold testimonial snippets
	•	Optional: Instagram-style gallery with soft hover overlay

Contents:
	•	Header: What the Legends Say
	•	Format:
	•	“Best thing we did all weekend. Adrenaline overload!” — Tom, London
	•	“Felt like Mad Max meets Top Gear. Unreal.” — Jay, Manchester
	•	“Even the quiet lad wouldn’t shut up about it.” — Group from Cork

⸻

SECTION 8: Why DXB Stag - already have this used on home 

Design Style:
	•	Horizontal icon bar or clean stacked mini-cards
	•	Like a premium brand feature strip — no cartoon badges

Contents:

Header: Why Book With DXB Stag?

Core Points (icons + label):
	•	Groom Goes Free — On eligible packages
	•	Split Payments — Everyone pays their share
	•	Fully Vetted — We’ve done it, loved it
	•	Concierge Included — Personal touch all the way
	•	Same Price or Less — No markups, ever */
}
