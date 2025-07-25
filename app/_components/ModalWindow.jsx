"use client";
import { AnimatePresence, motion } from "framer-motion";
import LoggedInMeesage from "./LoggedInMeesage";
import { createPortal } from "react-dom";
import { useBooking } from "../_context/bookingProvider";
import { useParams } from "next/navigation";

export default function ModalWindow({ children, onClose, user }) {
  const params = useParams();
  const activityId = params?.activityId;
  return createPortal(
    <AnimatePresence mode="wait">
      {
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className={`fixed inset-0 z-30 flex h-full w-full items-center justify-center [perspective:800px] [transform-style:preserve-3d]`}
        >
          <Overlay />

          <motion.div
            className={
              "no-scrollbar relative z-50 flex max-h-[calc(100vh-5em)] flex-1 flex-col items-center overflow-y-auto bg-neutral-950 md:max-w-[70%] md:rounded-2xl"
            }
            key="modal"
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon onClose={onClose} />
            {user ? (
              children
            ) : (
              <div className="py-10 sm:py-20">
                <LoggedInMeesage
                  redirectTo={`/login?redirectTo=${encodeURIComponent(`/activities/${activityId}`)}`}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>,
    document.body,
  );
}

const Overlay = ({ className }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 z-50 h-full w-full bg-black bg-opacity-50 ${className}`}
    ></motion.div>
  );
};

export const CloseIcon = ({ onClose }) => {
  const { removeStepQueryFromUrl } = useBooking();

  function handleClick() {
    removeStepQueryFromUrl();
    onClose();
  }
  return (
    <button onClick={handleClick} className="group absolute right-4 top-4 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-white transition duration-200 group-hover:rotate-3 group-hover:scale-125"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};
