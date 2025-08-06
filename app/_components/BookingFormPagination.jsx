import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function BookingFormPagination({ currentStep }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goToStep = (step) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", step.toString());
    router.push(`?${params.toString()}`);
  };

  const handleNext = () => {
    goToStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  };
  return (
    <div className="sticky bottom-0 flex w-full items-center justify-between bg-neutral-900 p-4 pb-1 [grid-column:1/-1]">
      <PaginationButton
        disabled={currentStep === 1}
        handleClick={handlePrevious}
      >
        Previous
      </PaginationButton>
      <PaginationButton disabled={currentStep === 4} handleClick={handleNext}>
        Next
      </PaginationButton>
    </div>
  );
}
function PaginationButton({ children, handleClick, disabled }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="rounded-sm bg-matalicGold px-6 py-1 text-sm capitalize text-primary filter duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 disabled:grayscale"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
