"use client";
import BookingPage from "./BookingForm";
import MeteorsDemo from "./MeteorsDemo";
import ModalWindow from "./ModalWindow";
import CheckBadgeIcon from "../svgIcons/CheckBadgeIcon";
import InformationCircleIcon from "../svgIcons/InformationCircleIcon";
import { useState } from "react";
import Button from "./Button";
import LoggedInMessage from "./LoggedInMeesage";
import { formatToAED } from "../_lib/helpers";

export default function SinglePageBookingSection({
  activityId,
  price,
  activityName,
  destinations,
  session,
}) {
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);
  const open = () => setOpenModal(true);
  return (
    <div className="flex flex-col items-start gap-6 rounded-md border border-gray-300 px-4 py-6">
      <h4 className="text-sm font-medium">
        from <strong className="text-2xl">{formatToAED(price)}</strong> per
        person
      </h4>

      {session?.user ? (
        openModal ? (
          <ModalWindow onClose={onClose} ribbontext={price}>
            <BookingPage
              id={activityId}
              price={price}
              activityName={activityName}
              destinations={destinations}
              session={session}
            />
          </ModalWindow>
        ) : (
          <Button variation="gold" onClick={open}>
            Book Now
          </Button>
          // Show this if not logged in but trying to open modal
        )
      ) : (
        <LoggedInMessage />
      )}

      <MeteorsDemo>
        <ul className="space-y-4">
          <li className="flex items-center gap-4">
            <CheckBadgeIcon />
            <p className="text-sm">
              <strong>It&apos;s FREE!:</strong> Build a cart & submit to check
              availability for free & with no commitment
            </p>
          </li>
          <li className="flex items-center gap-4">
            <InformationCircleIcon />
            <p className="text-sm">
              <strong>*From pricing:</strong> Prices may vary depending on your
              group size
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
  );
}
