import Image from "next/image";
import LinkButton from "./LinkButton";
import { cinzel, playfairDisplay } from "../layout";
import Link from "next/link";

export default function ActivityCard({ activity }) {
  const { image, name, id, description, duration, price, group_size } =
    activity;

  return (
    // car v1
    // <div className="flex flex-col gap-6 rounded-md bg-white p-4 text-neutral-700 shadow-lg">
    //   <div className="relative h-52 object-cover">
    //     <Image
    //       src={image || "/default-activity-image.jpg"}
    //       fill
    //       alt={name}
    //       className="h-full object-cover"
    //     />
    //   </div>

    //   <div className="border-b border-gray-200 pb-4 text-sm font-semibold">
    //     <h3>{name}</h3>
    //   </div>
    //   <div className="flex items-center justify-between border-b border-tertiary pb-4 text-center">
    //     {" "}
    //     <p className="text-xs">
    //       <strong>Duration:</strong>{" "}
    //       <span className="font-medium">{duration}</span>{" "}
    //     </p>
    //     <p className="text-xs">
    //       <strong>Guest upto:</strong>{" "}
    //       <span className="font-medium">{group_size}</span>{" "}
    //     </p>
    //   </div>

    //   <div className="mt-auto flex items-center justify-between">
    //     <p className="text-sm font-bold text-secondary">{formatToAED(price)}</p>
    //     <div>
    //       <LinkButton size="small" href={`/activities/${id}`} variation="gold">
    //         Book now
    //       </LinkButton>
    //     </div>
    //   </div>
    // </div>
    // card v2
    // <motion.div
    //   className="group grid grid-cols-2 overflow-hidden rounded-md bg-white bg-[url(/cartoon.png)] bg-cover bg-center text-neutral-700 shadow-lg"
    //   initial={{ opacity: 0.0, x: -40 }}
    //   whileInView={{ opacity: 1, x: 0 }}
    //   transition={{
    //     delay: 0.3,
    //     duration: 0.4,
    //   }}
    //   whileHover={{ x: -10 }}
    // >
    //   <div className="relative h-52 overflow-hidden bg-gray-300 object-cover">
    //     <Image
    //       src={image || "/default-activity-image.jpg"}
    //       fill
    //       alt={name}
    //       className="h-full object-cover duration-500 group-hover:scale-110"
    //     />
    //   </div>
    //   <div className="flex flex-col gap-4 p-4 backdrop-blur-md">
    //     <div className="border-b border-gray-200 pb-4 text-sm font-semibold">
    //       <h3>{name}</h3>
    //     </div>
    //     <div className="flex w-full items-center justify-between border-b border-gray-200 pb-4 text-center">
    //       {" "}
    //       <p className="text-xs">
    //         <strong>Duration:</strong>{" "}
    //         <span className="font-medium">{duration}</span>{" "}
    //       </p>
    //       <p className="text-xs">
    //         <strong>Guest upto:</strong>{" "}
    //         <span className="font-medium">{group_size}</span>{" "}
    //       </p>
    //     </div>

    //     <div className="mt-auto flex items-center justify-between">
    //       <p className="text-sm font-bold text-neutral-800">
    //         {formatToAED(price)}
    //       </p>
    //       <div>
    //         <LinkButton
    //           size="small"
    //           href={`/activities/${id}`}
    //           variation="gold"
    //         >
    //           Book now
    //         </LinkButton>
    //       </div>
    //     </div>
    //   </div>
    // </motion.div>
    // card v3
    // <div className="flex flex-col items-start gap-4 rounded-md p-4 text-neutral-700 [&:nth-child(2)]:col-span-2">
    //   <div className="relative h-80 w-full overflow-hidden rounded-md border border-secondary object-cover">
    //     <Image
    //       src={image || "/default-activity-image.jpg"}
    //       fill
    //       alt={name}
    //       className="h-full object-cover"
    //     />
    //   </div>

    //   <div className="text-sm font-semibold">
    //     <h3>{name}</h3>
    //   </div>
    //   {/* <div className="flex items-center justify-between border-b border-tertiary pb-4 text-center">
    //     {" "}
    //     <p className="text-xs">
    //       <strong>Duration:</strong>{" "}
    //       <span className="font-medium">{duration}</span>{" "}
    //     </p>
    //     <p className="text-xs">
    //       <strong>Guest upto:</strong>{" "}
    //       <span className="font-medium">{group_size}</span>{" "}
    //     </p>
    //   </div> */}

    //   <div>
    //     <LinkButton size="small" href={`/activities/${id}`} variation="gold">
    //       Book now
    //     </LinkButton>
    //   </div>
    // </div>
    // card v4
    // <div className="relative overflow-hidden rounded-lg bg-[#2b030c]">
    //   <Image
    //     className="h-64 object-cover"
    //     src={image}
    //     width={500}
    //     height={500}
    //     alt={name}
    //   />
    //   <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
    //     <h2 className={`${cinzel?.className} text-2xl font-bold`}>{name}</h2>
    //     <p className={`${playfairDisplay?.className} leading-[1.6]`}>
    //       {description}
    //     </p>
    //   </div>
    //   <div className="absolute right-2 top-2">
    //     <LinkButton size="small" variation="gold" href={`/activities/${id}`}>
    //       Book Now
    //     </LinkButton>
    //   </div>
    // </div>
    // card v5
    <div className="relative flex h-[500px] items-end justify-center overflow-hidden rounded-sm border border-matalicGold object-cover pb-8">
      <Image src={image} fill alt={name} className="bg-center object-cover" />
      {/* overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-navyBlue"></div>
      <div className="relative z-10 space-y-4 p-4">
        <h2
          className={`${cinzel.className} text-balance text-2xl font-bold text-secondary`}
        >
          {name}
        </h2>
        <p className="line-clamp-1">{description}...</p>
        <Link
          href={`/activities/${id}`}
          className="block w-fit rounded-sm border-2 border-matalicGold bg-transparent px-4 py-2 text-sm uppercase tracking-wider backdrop-blur duration-300 hover:bg-matalicGold hover:text-navyBlue"
        >
          Explore itinerary
        </Link>
      </div>
    </div>
  );
}
