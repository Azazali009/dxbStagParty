"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InclusionsComponent({ inclusions = [] }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const lastItemRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && contentRef.current) {
      // Get exact scrollHeight for animation
      setHeight(contentRef.current.scrollHeight);

      // Scroll to last item after content is visible
      setTimeout(() => {
        if (lastItemRef.current) {
          lastItemRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300); // delay to allow height animation first
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className="space-y-6 pb-16">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-sm border border-matalicGold bg-matalicGold px-6 py-2.5 font-medium text-navyBlue duration-300 hover:bg-transparent hover:text-softGold"
      >
        Secure your spot
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="inclusions"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="space-y-4">
              <h3 className="text-xl font-medium capitalize text-matalicGold">
                Your reign includes:
              </h3>
              <ul className="space-y-2 tracking-wider">
                {inclusions.map((inc, i) => (
                  <li
                    key={i}
                    className="block font-extralight"
                    ref={i === inclusions.length - 1 ? lastItemRef : null}
                  >
                    {i + 1}). {inc}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
