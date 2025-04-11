import Image from "next/image";
import LinkButton from "./LinkButton";

export default function PackageCard({ pack }) {
  return (
    <div
      key={pack.id}
      className="flex h-full flex-col items-start overflow-hidden rounded-[22px] border-2 border-secondary bg-white text-neutral-700 shadow-md"
    >
      {/* Image */}

      <div className="relative h-60 object-cover">
        <Image
          src={pack?.image || "/default-activity-image.jpg"}
          alt={pack?.name}
          width={500}
          className="h-full rounded object-cover"
          height={500}
        />
      </div>
      <div className="flex flex-col items-start gap-4 p-4">
        <h3 className="mb-2 mt-4 text-balance font-semibold leading-[1.5]">
          {pack.name}
        </h3>
        {/* blurb */}
        <div className="space-x-2 text-sm">
          <span>{pack?.blurb}</span>
        </div>

        <div className="space-x-2 text-sm">
          <strong className="text-secondary">Group Size:</strong>{" "}
          <span>{pack?.group_size} Guests</span>
        </div>

        {/* inclusions */}
        <div className="space-x-2 text-sm">
          <strong className="text-secondary">Inclusions:</strong>{" "}
          <span>{pack?.inclusions?.join(", ")}</span>
        </div>

        <LinkButton
          href={`/packages/${pack.id}`}
          className={"flex items-center gap-2"}
        >
          <span>Buy now</span>
          <span className="rounded-full bg-gray-200 px-1 text-sm">
            {pack?.price_band}
          </span>
        </LinkButton>
      </div>
    </div>
  );
}
