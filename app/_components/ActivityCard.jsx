import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export default function Paintball({ activity }) {
  const { image, name, id, description } = activity;
  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card relative flex h-[500px] flex-col gap-2 rounded-xl border border-black/[0.1] border-neutral-600 bg-gray-50 bg-transparent p-6 shadow-shadowOne hover:shadow-2xl hover:shadow-emerald-500/[0.1]">
        <CardItem
          translateZ="50"
          className="bg-gradient-to-r from-neutral-50 to-neutral-400 bg-clip-text text-xl font-bold text-transparent"
        >
          {name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src={image}
            height={500}
            width={500}
            className="rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="mt-auto flex items-center justify-between">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/activities/${id}`}
            target="__blank"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:animate-pulse"
          >
            <span>Book now</span> &rarr;
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
