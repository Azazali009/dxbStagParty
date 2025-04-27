"use client";
import React, { useState } from "react";
import { cinzel } from "../layout";
import { motion, AnimatePresence } from "framer-motion";
const faqs = [
  {
    question: "How fast will you reply?",
    answer: "Usually within a few hours – often faster on WhatsApp.",
  },
  {
    question: "Can you create custom stag packages?",
    answer: "Absolutely – tell us your dream, we’ll make it happen.",
  },
  {
    question: "Can you help with last-minute plans?",
    answer: "Yes! Dubai is built for quick legends.",
  },
  {
    question: "How do payments work?",
    answer: "We’ll send you easy, secure options based on your package.",
  },
];
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
      {faqs.map((faq, index) => (
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
