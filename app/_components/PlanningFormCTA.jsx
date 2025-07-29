import React from "react";
import SpinnerMini from "./SpinnerMini";
import FormNavigationButton from "./FormNavigationButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PlanningFormCTA({ planningStep, isPending }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // handle pagination
  function goToStep(step) {
    const params = new URLSearchParams(searchParams);
    params.set("planningStep", step.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleNext() {
    goToStep(planningStep + 1);
  }
  function handlePrevious() {
    if (planningStep > 1) goToStep(planningStep - 1);
  }
  return (
    <div className="mt-8 flex items-center justify-between">
      <FormNavigationButton
        disabled={planningStep === 1}
        onClick={handlePrevious}
      >
        Previous
      </FormNavigationButton>
      <div className="flex items-center justify-center gap-4">
        {planningStep < 4 && (
          <FormNavigationButton onClick={handleNext}>Next</FormNavigationButton>
        )}
        {planningStep === 4 && (
          <div>
            <button
              disabled={isPending}
              className="flex min-w-[100px] items-center justify-center rounded-md border border-matalicGold bg-transparent px-6 py-2 text-center font-semibold capitalize text-matalicGold duration-300 hover:bg-matalicGold hover:text-navyBlue hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-matalicGold"
            >
              {isPending ? <SpinnerMini /> : "submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
