"use client";

import { useState } from "react";
import BookingPage from "./BookingForm";
import ModalWindow from "./ModalWindow";

export default function BookingWindowAndButton({ user, activity }) {
  const { id, price, name, destinations, group_size, duration } = activity;
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);
  const open = () => setOpenModal(true);

  return (
    <div>
      {openModal ? (
        <ModalWindow user={user} onClose={onClose} ribbontext={price}>
          <BookingPage
            id={id}
            price={price}
            activityName={name}
            destinations={destinations}
            groupSize={group_size}
            user={user}
            duration={duration}
          />
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
