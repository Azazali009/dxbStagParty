import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/solid";

export default function Paintball({ activity }) {
  const { image, name, id, description } = activity;
  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card relative flex h-[500px] flex-col gap-2 rounded-xl border border-black/[0.1] bg-gray-50 p-6 shadow-shadowOne dark:border-neutral-600 dark:bg-transparent dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
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
            className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:animate-pulse dark:bg-white dark:text-black"
          >
            <span>Book now</span> {<CalendarDaysIcon width={20} />}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
