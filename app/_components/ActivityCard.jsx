import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Paintball({ activity }) {
  const { image, name, id, description, duration, price, group_size } =
    activity;

  return (
    // <CardContainer className="inter-var">
    //   <CardBody className="group/card relative flex flex-col gap-2 rounded-xl border border-black/[0.1] border-neutral-600 bg-gray-50 bg-transparent p-6 shadow-shadowOne duration-500 hover:shadow-2xl hover:shadow-secondary/30 sm:min-h-[500px]">
    //     <CardItem
    //       translateZ="50"
    //       className="bg-gradient-to-r from-neutral-50 to-neutral-400 bg-clip-text text-base font-bold text-transparent sm:text-xl"
    //     >
    //       {name}
    //     </CardItem>
    //     <CardItem
    //       as="p"
    //       translateZ="60"
    //       className="mt-2 max-w-sm text-xs leading-[1.8] text-neutral-500 sm:text-sm dark:text-neutral-300"
    //     >
    //       {description}
    //     </CardItem>
    //     <CardItem translateZ="100" className="mt-4 w-full">
    //       <Image
    //         src={image}
    //         height={300}
    //         width={500}
    //         className="h-[200px] rounded-xl object-cover group-hover/card:shadow-xl"
    //         alt="thumbnail"
    //       />
    //     </CardItem>
    //     <div className="mt-auto flex items-center justify-between">
    //       <CardItem
    //         translateZ={20}
    //         as={Link}
    //         href={`/activities/${id}`}
    //         target="__blank"
    //         className="mt-5 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:animate-pulse"
    //       >
    //         Book now &rarr;
    //       </CardItem>
    //     </div>
    //   </CardBody>
    // </CardContainer>
    <div className="space-y-6 rounded-md bg-white p-4 text-neutral-700 shadow-lg">
      <div className="relative h-52 object-cover">
        <Image src={image} fill alt={name} className="h-full" />
      </div>

      <div className="border-b border-tertiary pb-4 font-bold">
        <h3>{name}</h3>
      </div>
      <div className="flex items-center justify-between border-b border-tertiary pb-4 text-center">
        {" "}
        <p>
          <strong>Duration:</strong> <span>{duration}</span>{" "}
        </p>
        <p>
          <strong>Guest upto:</strong> <span>{group_size}</span>{" "}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-secondary">AED {price}</p>
        <div>
          <Link
            className="block w-full rounded-full bg-gradient-to-r from-secondary to-[#604e18] px-4 py-3 text-xs font-semibold capitalize text-white duration-300 hover:scale-95 hover:bg-gradient-to-l sm:px-8 sm:text-base"
            href={`/activities/${id}`}
            variation="gold"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
}
