import Image from "next/image";
import { formatToAED } from "../_lib/helpers";
import LinkButton from "./LinkButton";
export default function Paintball({ activity }) {
  const { image, name, id, description, duration, price, group_size } =
    activity;

  return (
    <div className="flex flex-col gap-6 rounded-md bg-white p-4 text-neutral-700 shadow-lg">
      <div className="relative h-52 object-cover">
        <Image src={image} fill alt={name} className="h-full object-cover" />
      </div>

      <div className="border-b border-gray-200 pb-4 text-sm font-semibold">
        <h3>{name}</h3>
      </div>
      <div className="flex items-center justify-between border-b border-tertiary pb-4 text-center">
        {" "}
        <p className="text-xs">
          <strong>Duration:</strong>{" "}
          <span className="font-medium">{duration}</span>{" "}
        </p>
        <p className="text-xs">
          <strong>Guest upto:</strong>{" "}
          <span className="font-medium">{group_size}</span>{" "}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <p className="text-sm font-bold text-secondary">{formatToAED(price)}</p>
        <div>
          <LinkButton size="small" href={`/activities/${id}`} variation="gold">
            Book now
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
