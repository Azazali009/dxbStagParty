"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../_lib/helpers";

// Group by type
const groupedFaqs = faqs.reduce((acc, faq) => {
  if (!acc[faq.type]) acc[faq.type] = [];
  acc[faq.type].push(faq);
  return acc;
}, {});

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto my-10 max-w-5xl space-y-6 rounded-xl border border-neutral-700 p-6">
      {Object.entries(groupedFaqs).map(([type, items]) => (
        <div key={type}>
          {/* Section Heading */}
          <h2 className="mb-4 mt-8 text-lg font-semibold text-matalicGold xs:text-2xl">
            {type}
          </h2>

          {items.map((faq, index) => {
            const uniqueIndex = `${type}-${index}`;
            return (
              <div key={uniqueIndex} className="border-b border-neutral-800">
                <button
                  onClick={() => toggleFAQ(uniqueIndex)}
                  className="flex w-full items-center justify-between py-3 text-left text-xs text-neutral-200 xs:text-sm"
                >
                  {faq.question}
                  <span>{openIndex === uniqueIndex ? "-" : "+"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === uniqueIndex && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { height: "auto", opacity: 1 },
                        collapsed: { height: 0, opacity: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden text-xs leading-6 xs:text-sm"
                    >
                      <div className="pb-3 text-neutral-500">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
