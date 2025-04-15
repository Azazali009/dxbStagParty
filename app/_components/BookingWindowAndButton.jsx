"use client";

import { useState } from "react";
import BookingPage from "./BookingForm";
import LoggedInMeesage from "./LoggedInMeesage";
import ModalWindow from "./ModalWindow";
export default function BookingWindowAndButton({ session, activity }) {
  const { id, price, activityName, destinations } = activity;
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);
  const open = () => setOpenModal(true);
  return (
    <>
      {session?.user ? (
        openModal ? (
          <ModalWindow onClose={onClose} ribbontext={price}>
            <BookingPage
              id={id}
              price={price}
              activityName={activityName}
              destinations={destinations}
              session={session}
            />
          </ModalWindow>
        ) : (
          <button
            className="bg-navyBlue border-t-matalicGold border-softGold hover:border-b-matalicGold hover:border-t-softGold block rounded border-2 px-8 py-3 capitalize duration-700"
            variation="gold"
            onClick={open}
          >
            Book Now
          </button>
          // Show this if not logged in but trying to open modal
        )
      ) : (
        <LoggedInMeesage />
      )}
    </>
  );
}
