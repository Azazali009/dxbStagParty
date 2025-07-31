"use client";
import { Suspense, useState, useTransition } from "react";
import dynamic from "next/dynamic";

import { addPlanning } from "../_lib/actions";
const PlanningFormActivitySelection = dynamic(
  () => import("./PlanningFormActivitySelection"),
  {
    loading: () => <Spinner />,
    ssr: false, // if it's client only
  },
);
import PlanningFormBookingInfoStep from "./PlanningFormBookingInfoStep";
import PlanningFormCTA from "./PlanningFormCTA";
import PlanningFormHeading from "./PlanningFormHeading";
import PlanningFormTimeline from "./PlanningFormTimeline";
import PlanningFormTransport from "./PlanningFormTransport";
import Spinner from "./Spinner";

import toast from "react-hot-toast";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";
import { autoBuildTimeline } from "../_lib/helpers";
import LoggedInMeesage from "./LoggedInMeesage";
import { useAuth } from "../_context/AuthProvider";

export default function UserPlanningForm({
  planningStep,
  activities,
  categories,
  serverUser,
}) {
  const {
    startDate,
    endDate,
    groupSize,
    selectedActivityIds,
    attendees,
    activityBuffers,
    includeTransport,
    transportHours,
  } = usePartyBuilder();

  const { user: clientUser, loading: loadingUser } = useAuth();

  const [isPending, startTransition] = useTransition();

  //   handle submit
  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await addPlanningWithData(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success(
        "🎉 Your plan’s been saved! We’ll use it to make booking easier feel free to update it anytime from your profile.",
      );
    });
  }

  const addPlanningWithData = addPlanning.bind(null, {
    attendees,
    startDate,
    endDate,
    selectedActivityIds,
    includeTransport,
  });

  // timeline logic
  const selectedActivities = selectedActivityIds
    .map((id) => activities.find((a) => a.id === id))
    .filter(Boolean);

  const timeline = autoBuildTimeline(
    selectedActivities,
    startDate,
    activityBuffers,
    includeTransport,
    transportHours,
  );

  if (!loadingUser && (!serverUser || !clientUser)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoggedInMeesage
          redirectTo={`/login?redirectTo=${encodeURIComponent("/builder")}`}
        />
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 rounded-xl border border-gray-800 p-6 sm:p-10">
      <PlanningFormHeading />
      <form
        action={async (formData) => handleSubmit(formData)}
        className="flex flex-col gap-6"
      >
        {/* step 1 */}
        {planningStep === 1 && <PlanningFormBookingInfoStep />}

        {/* step 2 (Activity Selection) */}
        {planningStep === 2 && (
          <Suspense fallback={<Spinner />}>
            <PlanningFormActivitySelection
              activities={activities}
              categories={categories}
            />
          </Suspense>
        )}

        {/* step 3 (Time logic) */}
        {planningStep === 3 && <PlanningFormTimeline timeline={timeline} />}

        {/* step 4 transport */}
        {planningStep === 4 && <PlanningFormTransport timeline={timeline} />}

        {/*Form cta */}
        <PlanningFormCTA planningStep={planningStep} isPending={isPending} />
      </form>
    </div>
  );
}
