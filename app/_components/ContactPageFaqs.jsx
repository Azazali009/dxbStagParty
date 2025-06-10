"use client";
import React, { useState } from "react";
import { cinzel } from "../layout";
import { motion, AnimatePresence } from "framer-motion";
import { faqsArr } from "../_lib/helpers";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if clicked again
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-xl bg-neutral-900 p-6">
      <h1 className={`${cinzel.className} text-3xl font-semibold`}>
        quick questions?
      </h1>
      {faqsArr.map((faq, index) => (
        <div key={index} className="border-b border-neutral-800">
          <button
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-center justify-between py-3 text-left"
          >
            {faq.question}
            <span>{openIndex === index ? "-" : "+"}</span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: "auto", opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="pb-3 text-neutral-500">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
