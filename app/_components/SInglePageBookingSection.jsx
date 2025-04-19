"use client";
import { useState } from "react";
import { formatToAED } from "../_lib/helpers";
import BookingPage from "./BookingForm";
import Button from "./Button";
import LoggedInMessage from "./LoggedInMeesage";
import ModalWindow from "./ModalWindow";

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
    </div>
  );
}
