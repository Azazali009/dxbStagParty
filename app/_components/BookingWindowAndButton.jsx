"use client";

import { useState } from "react";
import BookingPage from "./BookingForm";
import ModalWindow from "./ModalWindow";

export default function BookingWindowAndButton({
  user,
  activity = {},
  Package = {},
}) {
  const { id, price, name, destinations, group_size, duration } = activity;
  const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const bookingProps = !isEmptyObject(activity)
    ? {
        id,
        price,
        activityName: name,
        destinations,
        groupSize: group_size,
        user,
        duration,
      }
    : !isEmptyObject(Package)
      ? {
          id: Package.id,
          price: Package.price_band,
          activityName: Package.name,
          groupSize: Package.group_size,
          user,
          duration: Package.duration,
        }
      : null;
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);
  const open = () => setOpenModal(true);

  return (
    <div>
      {openModal ? (
        <ModalWindow user={user} onClose={onClose}>
          {bookingProps && <BookingPage {...bookingProps} />}
        </ModalWindow>
      ) : (
        <button
          onClick={open}
          className="block h-8 w-full rounded-md border border-[#947a27] bg-[#947a27] capitalize text-white duration-300 hover:!bg-transparent xs:h-10"
        >
          book now
        </button>
      )}
    </div>
  );
}
