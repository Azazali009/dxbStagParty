import Image from "next/image";
import image from "@/public/paintball.jpg";
import {
  CheckBadgeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import BookingPage from "../_components/BookingForm";

export default async function Page() {
  return (
    <div className="space-y-6 px-6 py-8 text-neutral-900">
      <h1 className="text-3xl font-bold">
        Pallas Outdoor Paintball Plus, Stag Party Athlone
      </h1>
      <div className="relative grid grid-cols-[2fr_1.1fr] items-start gap-8">
        {/* Left Container */}
        <div className="rounded-md border border-neutral-200 px-4 py-6">
          <Image
            className="rounded-md"
            src={image}
            alt="Paintball"
            placeholder="blur"
            quality={100}
          />

          <div className="mt-4">
            <h2 className="text-2xl font-bold">Quick Info</h2>
            <div className="mt-2 flex w-fit gap-8">
              <div>
                <strong>Duration:</strong> <span>120 Mins</span>{" "}
              </div>
              <div>
                <strong>Min. Nums:</strong> <span>8</span>{" "}
              </div>
              <div>
                <strong>Min. Age:</strong> <span>18</span>{" "}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">What&apos;s included?</h2>
              <ul className="mt-2 list-inside list-disc">
                <li>Note: 54 km (approx 45 mins) from Athlone Town</li>
                <li>Transport not included</li>
                <li>Expert instructor</li>
                <li>All equipment provided</li>
                <li>300 paintballs each</li>
              </ul>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Why Book it?</h2>
              <p>
                Paintball, a stag party classic! Many a stag has been seen
                running around a field in a tutu avoiding hoards of paintballs
                coming straight for him. The pain is good practice for marriage,
                actually so is the tutu, he won&apos;t be wearing the trousers
                for much longer either!
              </p>
              <p className="mt-4">
                The stag party will be fully loaded and with 300 paintballs you
                can afford to spray the field in the hope of hitting someone or
                be a sneaky bugger and hide in the trees and snipe, either way
                your stag party is guaranteed some laughs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Container */}
        <div className="sticky top-4 flex flex-col items-start gap-6 rounded-md border border-neutral-200 px-4 py-6">
          <h4 className="text-sm font-medium">
            from <strong className="text-2xl">$200</strong> per person
          </h4>
          <button className="w-full rounded-full bg-blue-600 px-8 py-2 font-semibold text-white">
            Add to cart
          </button>
          <BookingPage />
          <div className="rounded-md bg-blue-100/50 px-4 py-6">
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <CheckBadgeIcon width={30} height={30} color="#2563EB" />
                <p className="text-sm">
                  <strong>It&apos;s FREE!:</strong> Build a cart & submit to
                  check availability for free & with no commitment
                </p>
              </li>
              <li className="flex items-center gap-4">
                <InformationCircleIcon width={22} height={22} color="#2563EB" />
                <p className="text-sm">
                  <strong>*From pricing:</strong> Prices may vary depending on
                  your group size
                </p>
              </li>
            </ul>
          </div>
          <div className="space-y-4 rounded-md bg-orange-100 px-4 py-6 text-center text-sm">
            <h4 className="font-semibold">Did you know?</h4>
            <p>
              You can easily build a full stag do package Check out the best
              places to stay and things to do in Athlone
            </p>
            <button className="rounded-full border-2 border-orange-600 bg-transparent px-8 py-2 font-semibold capitalize text-orange-600 hover:bg-orange-600 hover:text-white">
              View all items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
