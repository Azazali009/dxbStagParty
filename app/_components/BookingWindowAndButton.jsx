"use client";

import { useState } from "react";
import BookingPage from "./BookingForm";
import ModalWindow from "./ModalWindow";

export default function BookingWindowAndButton({ user, activity }) {
  const { id, price, name, destinations } = activity;
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
            user={user}
          />
        </ModalWindow>
      ) : (
        // <button
        //   className="block rounded border-2 border-softGold border-t-matalicGold bg-navyBlue px-8 py-3 capitalize duration-700 hover:border-b-matalicGold hover:border-t-softGold"
        //   variation="gold"
        //   onClick={open}
        // >
        //   Book Now
        // </button>
        <button
          onClick={open}
          className="block w-full rounded-md border border-[#947a27] bg-[#947a27] py-2.5 text-white duration-300 hover:bg-[#6c591b]"
        >
          Add to my weekend
        </button>
      )}
    </div>
  );
}
