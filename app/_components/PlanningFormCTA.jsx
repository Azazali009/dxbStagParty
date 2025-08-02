import React from "react";
import SpinnerMini from "./SpinnerMini";
import FormNavigationButton from "./FormNavigationButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";
import toast from "react-hot-toast";

export default function PlanningFormCTA({ planningStep, isPending }) {
  const { attendees, isAttendeeError, setIsAttendeeError } = usePartyBuilder();

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
    const seenNames = new Set();
    const seenEmails = new Set();

    for (const attendee of attendees || []) {
      const name = attendee.name?.trim().toLowerCase();
      const email = attendee.email?.trim().toLowerCase();

      if (!name || !email) {
        toast.error("Each attendee must have both name and email.");
        setIsAttendeeError(true);
        return; // ❌ prevent moving to next step
      }

      if (seenNames.has(name)) {
        toast.error(`Duplicate name "${attendee.name}" found.`);
        setIsAttendeeError(true);
        return;
      }

      if (seenEmails.has(email)) {
        toast.error(`Duplicate email "${attendee.email}" found.`);
        setIsAttendeeError(true);
        return;
      }

      seenNames.add(name);
      seenEmails.add(email);
    }

    // ✅ Passed validation, move to next step
    setIsAttendeeError(false);
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
              {isPending ? <SpinnerMini /> : "save & pay"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
