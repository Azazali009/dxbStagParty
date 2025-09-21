"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  cinzel,
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <section className="mx-auto w-[95%] p-8 py-10 font-sans antialiased sm:p-3 sm:py-20">
      <h3
        className={`mb-10 text-xl capitalize xs:text-2xl ${cinzel.className} font-bold text-matalicGold sm:text-4xl`}
      >
        What Our Clients Say
      </h3>
      <div className="relative grid grid-cols-1 gap-20 sm:gap-20 md:grid-cols-2 lg:gap-28">
        <div className="relative min-h-96 w-full 2xl:h-[700px]">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 h-[400px] origin-bottom rounded-lg bg-matalicGold p-4 pb-10 sm:pb-20 2xl:h-[500px]"
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-[300px] w-full rounded-lg object-cover object-center 2xl:h-[400px]"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6 py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className={`text-2xl ${cinzel.className} font-bold`}>
              <span className="text-matalicGold">—</span>{" "}
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-neutral-500">
              {testimonials[active].designation}
            </p>
            <p className="text-2xl text-[#FCD53F]">★★★★★</p>
            <motion.p className="mt-8 text-sm sm:text-lg">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="mt-auto flex gap-4 xs:pt-12 md:pt-0 2xl:mt-10">
            <button
              onClick={handlePrev}
              className="rounded-md border border-matalicGold bg-transparent px-4 py-2.5 text-sm font-semibold capitalize text-matalicGold duration-300 hover:scale-95 sm:px-6 sm:text-base"
            >
              previous legend
              {/* <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" /> */}
            </button>
            <button
              onClick={handleNext}
              className="rounded-md border border-matalicGold bg-transparent px-4 py-2.5 text-sm font-semibold capitalize text-matalicGold duration-300 hover:scale-95 sm:px-6 sm:text-base"
            >
              {/* <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" /> */}
              Next legend
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
