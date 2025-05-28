"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getActivitiesByCategory } from "../_lib/data-services";
import { useActivity } from "../_context/ActivityProvider";

export default function AdrenalineActivities({ category }) {
  const { filteredActivities } = useActivity();

  const filteredByCategoryArr = filteredActivities.filter(
    (activity) => activity?.category?.name === category,
  );

  if (!filteredByCategoryArr.length) return null;
  return (
    // bg-[#694621]
    <section className="bg-[url('/images/adrenaline-bg.webp')] bg-cover bg-no-repeat pb-40 pt-20">
      <div className="mx-auto w-[90%]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-5xl font-semibold uppercase">adrenaline hits</h2>
          <p>Thrills that will make your stag legendary</p>
        </div>
        <div className="mx-auto !mt-20 grid max-w-4xl grid-cols-3 justify-center justify-items-center">
          {filteredByCategoryArr.map((activity, index) => {
            return (
              <div key={activity.id} className="relative h-full w-full">
                {index === 0 && (
                  <svg
                    viewBox="0 0 176 445"
                    className="h-auto w-[250px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath id="clipShape">
                        <path d="M10 0.5H165.268C170.606 0.500259 174.859 4.88644 174.766 10.1582L174.743 10.6709L144.846 433.033C144.434 438.847 138.944 442.899 133.299 441.634L133.03 441.569L7.66016 409.712C3.44847 408.642 0.5 404.849 0.5 400.504V10C0.5 4.7533 4.75329 0.5 10 0.5Z" />
                      </clipPath>
                    </defs>

                    <image
                      href={activity.image}
                      width="176"
                      height="445"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#clipShape)"
                    />

                    <path
                      d="M10 0.5H165.268C170.606 0.500259 174.859 4.88644 174.766 10.1582L174.743 10.6709L144.846 433.033C144.434 438.847 138.944 442.899 133.299 441.634L133.03 441.569L7.66016 409.712C3.44847 408.642 0.5 404.849 0.5 400.504V10C0.5 4.7533 4.75329 0.5 10 0.5Z"
                      fill="none"
                      stroke="black"
                    />
                  </svg>
                )}
                {index === 1 && (
                  <svg
                    viewBox="0 0 245 539"
                    className="h-auto w-[330px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath id="clipShape1">
                        <path d="M232.924 0.5H51.7844C46.5979 0.5 42.2722 4.46528 41.8221 9.6322L1.18659 476.118C0.784214 480.737 3.60982 485.027 8.0125 486.481L154.199 534.767C160.098 536.716 166.327 532.871 167.229 526.725L242.818 11.9528C243.705 5.91634 239.026 0.5 232.924 0.5Z" />
                      </clipPath>
                    </defs>

                    <image
                      href={activity.image}
                      width="245"
                      height="539"
                      preserveAspectRatio="xMidYMid slice"
                      clip-path="url(#clipShape1)"
                    />

                    <path
                      d="M232.924 0.5H51.7844C46.5979 0.5 42.2722 4.46528 41.8221 9.6322L1.18659 476.118C0.784214 480.737 3.60982 485.027 8.0125 486.481L154.199 534.767C160.098 536.716 166.327 532.871 167.229 526.725L242.818 11.9528C243.705 5.91634 239.026 0.5 232.924 0.5Z"
                      fill="none"
                      stroke="black"
                    />
                  </svg>
                )}
                {index === 2 && (
                  <svg
                    viewBox="0 0 284 563"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-auto w-[320px]"
                  >
                    <defs>
                      <clipPath id="clipShape3">
                        <path d="M274 0H86.8085C81.8166 0 77.5893 3.6814 76.9034 8.62597L1.69697 550.767C0.823068 557.067 5.97469 562.571 12.3184 562.115L274.716 543.272C279.948 542.896 284 538.543 284 533.298V10C284 4.47715 279.523 0 274 0Z" />
                      </clipPath>
                    </defs>

                    <image
                      href={activity.image}
                      width="284"
                      height="563"
                      preserveAspectRatio="xMidYMid slice"
                      clip-path="url(#clipShape3)"
                    />

                    <path
                      d="M274 0H86.8085C81.8166 0 77.5893 3.6814 76.9034 8.62597L1.69697 550.767C0.823068 557.067 5.97469 562.571 12.3184 562.115L274.716 543.272C279.948 542.896 284 538.543 284 533.298V10C284 4.47715 279.523 0 274 0Z"
                      fill="none"
                      stroke="black"
                    />
                  </svg>
                )}
                {index === 3 && (
                  <svg
                    width="351"
                    height="360"
                    viewBox="0 0 351 360"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath id="clipShape2">
                        <path d="M0 340V25.848C0 12.7642 12.3556 3.20409 25.0204 6.48838L154.923 40.1751C163.743 42.4625 169.902 50.4227 169.902 59.5348V68.2354C169.902 76.8903 175.469 84.5632 183.697 87.2484L334.359 136.42C343.886 139.529 349.641 149.21 347.821 159.065L329.268 259.522L307.432 344.953C305.169 353.806 297.193 360 288.055 360H20C8.9543 360 0 351.046 0 340Z" />
                      </clipPath>
                    </defs>

                    <image
                      href={activity.image}
                      width="351"
                      height="360"
                      preserveAspectRatio="xMidYMid slice"
                      clip-path="url(#clipShape2)"
                    />

                    <path
                      d="M0 340V25.848C0 12.7642 12.3556 3.20409 25.0204 6.48838L154.923 40.1751C163.743 42.4625 169.902 50.4227 169.902 59.5348V68.2354C169.902 76.8903 175.469 84.5632 183.697 87.2484L334.359 136.42C343.886 139.529 349.641 149.21 347.821 159.065L329.268 259.522L307.432 344.953C305.169 353.806 297.193 360 288.055 360H20C8.9543 360 0 351.046 0 340Z"
                      fill="none"
                      stroke="black"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// {/* <div
//                     className={`relative z-20 w-full ${index === 0 && "h-[550px]"} ${index === 1 && "h-[600px]"} ${index === 2 && "-rotateY-[1deg] h-[600px]"} `}
//                   >
//                     {" "}
//                     {/* Outer container controls spacing */}
//                     <div
//                       key={activity.id}
//                       className={`absolute inset-0 flex items-end overflow-hidden rounded-2xl p-10 [transform-style:preserve-3d] ${
//                         index === 1
//                           ? "origin-top [transform:perspective(300px)_rotateX(2deg)_rotateY(-6deg)]"
//                           : index === 2
//                             ? "origin-top-left [transform:perspective(300px)_rotateX(3deg)_rotateY(1deg)]"
//                             : "origin-top [transform:perspective(400px)_rotateY(-4deg)]"
//                       }`}
//                     >
//                       {/* overlay */}
//                       <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#694621]/20"></div>

//                       {/* button (reverse tilt) */}
//                       <div className="group absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center duration-300 [transform:rotateY(2deg)_rotateX(-2deg)] hover:bg-navyBlue/60">
//                         <Link
//                           className="pointer-events-none invisible translate-y-full rounded-md bg-white px-6 py-2 capitalize text-navyBlue opacity-0 shadow-2xl duration-500 active:translate-y-2 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
//                           href={`/activities/${activity.id}`}
//                         >
//                           Book your slot
//                         </Link>
//                       </div>

//                       {/* image */}
//                       <Image
//                         src={activity.image}
//                         fill
//                         alt={activity.name}
//                         className="object-cover"
//                       />

//                       {/* heading (reverse tilt) */}
//                       <h2 className="absolute bottom-10 left-10 z-30 text-xl font-medium text-white [transform:rotateY(2deg)_rotateX(-2deg)]">
//                         {activity.name}
//                       </h2>
//                     </div>
//                   </div> */}
