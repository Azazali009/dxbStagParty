import React from "react";
import Button from "./Button";

export default function FooterCta() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-semibold sm:text-3xl lg:text-4xl">
        Ready to build legendary weekend?
      </h2>
      <p className="text-xs text-neutral-600 xs:text-base">
        Pick your activities, send a vote link and let the leads decide. We will
        handle the rest
      </p>
      <Button
        href={"/builder"}
        className={
          "flex w-fit items-center justify-center gap-2 text-xs xs:text-base"
        }
        variation="gold"
      >
        <span>Start Planning Your Stag Party</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </Button>
    </div>
  );
}
