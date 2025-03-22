import Image from "next/image";

import BookingPage from "../../_components/BookingForm";
import { getActivities, getActivity } from "../../_lib/data-services";
import MeteorsDemo from "../../_components/MeteorsDemo";
import CheckBadgeIcon from "@/app/svgIcons/CheckBadgeIcon";
import InformationCircleIcon from "@/app/svgIcons/InformationCircleIcon";

export async function generateStaticParams() {
  const activities = await getActivities();
  const ids = activities.map((curActivity) => ({
    activityId: String(curActivity.id),
  }));
  return ids;
}
export default async function Page({ params }) {
  const activity = await getActivity(params.activityId);

  const { id, name, price, image, duration, minAge, destinations } = activity;

  return (
    <div className="space-y-6 px-6 py-8 text-neutral-900 dark:text-white">
      <h1 className="text-3xl font-bold">{name}</h1>
      <div className="relative grid h-full grid-cols-[2fr_1.1fr] items-start gap-8">
        {/* Left Container */}
        <div className="sticky top-12 rounded-md border border-neutral-200 px-4 py-6 dark:border-neutral-700">
          <Image
            className="rounded-md"
            src={image}
            alt="Paintball"
            width={1000}
            height={1000}
            quality={100}
          />

          <div className="mt-4">
            <h2 className="text-2xl font-bold">Quick Info</h2>
            <div className="mt-2 flex w-fit gap-8">
              <div>
                <strong>Duration:</strong> <span>{duration} Mins</span>{" "}
              </div>
              <div>
                <strong>Min. Nums:</strong> <span>8</span>{" "}
              </div>
              <div>
                <strong>Min. Age:</strong> <span>{minAge}</span>{" "}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">What&apos;s included?</h2>
              <ul className="mt-2 list-inside list-disc space-y-2">
                <li>Note: 54 km (approx 45 mins) from Athlone Town</li>
                <li>Transport not included</li>
                <li>Expert instructor</li>
                <li>All equipment provided</li>
                <li>300 paintballs each</li>
              </ul>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Why Book it?</h2>
              <p className="font-light leading-[1.7]">
                Paintball, a stag party classic! Many a stag has been seen
                running around a field in a tutu avoiding hoards of paintballs
                coming straight for him. The pain is good practice for marriage,
                actually so is the tutu, he won&apos;t be wearing the trousers
                for much longer either!
              </p>
              <p className="mt-4 font-light leading-[1.7]">
                The stag party will be fully loaded and with 300 paintballs you
                can afford to spray the field in the hope of hitting someone or
                be a sneaky bugger and hide in the trees and snipe, either way
                your stag party is guaranteed some laughs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Container */}
        <div className="flex flex-col items-start gap-6 rounded-md border border-neutral-200 px-4 py-6 dark:border-neutral-700">
          <h4 className="text-sm font-medium">
            from <strong className="text-2xl">${price}</strong> per person
          </h4>
          <button className="w-full rounded-full bg-gradient-to-r from-[#735d1d] via-secondary to-[#735d1d] px-8 py-3 font-semibold text-white duration-300 hover:scale-90 hover:border-blue-600 hover:bg-gradient-to-l">
            Add to cart
          </button>
          <BookingPage
            id={id}
            price={price}
            activityName={name}
            destinations={destinations}
          />

          <MeteorsDemo>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <CheckBadgeIcon />
                <p className="text-sm">
                  <strong>It&apos;s FREE!:</strong> Build a cart & submit to
                  check availability for free & with no commitment
                </p>
              </li>
              <li className="flex items-center gap-4">
                <InformationCircleIcon />
                <p className="text-sm">
                  <strong>*From pricing:</strong> Prices may vary depending on
                  your group size
                </p>
              </li>
            </ul>
          </MeteorsDemo>
          <MeteorsDemo>
            <div className="space-y-4 text-center text-sm">
              <h4 className="font-semibold">Did you know?</h4>
              <p>
                You can easily build a full stag do package Check out the best
                places to stay and things to do in Athlone
              </p>

              <button className="rounded-lg border border-gray-500 px-4 py-1 text-gray-300">
                View all items
              </button>
            </div>
          </MeteorsDemo>
        </div>
      </div>
    </div>
  );
}
