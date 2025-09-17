"use client";
import { useTransition } from "react";

import { addPlanning } from "../_lib/actions";
import PlanningFormBookingInfoStep from "./PlanningFormBookingInfoStep";
import PlanningFormCTA from "./PlanningFormCTA";
import PlanningFormHeading from "./PlanningFormHeading";
import PlanningFormTimeline from "./PlanningFormTimeline";
import PlanningFormTransport from "./PlanningFormTransport";

import toast from "react-hot-toast";
import { useAuth } from "../_context/AuthProvider";
import { usePartyBuilder } from "../_context/PartyBuilderProvider";
import { autoBuildTimeline } from "../_lib/helpers";
import LoggedInMeesage from "./LoggedInMeesage";
import PlanningFormActivitySelection from "./PlanningFormActivitySelection";
import PlanningSUmmaryPanel from "./PlanningSUmmaryPanel";

export default function UserPlanningFormAndSummary({
  planningStep,
  activities,
  categories,
  serverUser,
}) {
  const {
    startDate,
    endDate,
    selectedActivityIds,
    attendees,
    activityBuffers,
    includeTransport,
    transportHours,
  } = usePartyBuilder();

  const { user: clientUser, loading: loadingUser } = useAuth();

  const [isPending, startTransition] = useTransition();

  const user = clientUser || serverUser;

  // handle booking function
  const handleBooking = async () => {
    const toastId = toast.loading("Processing...");

    try {
      // fetch selected activides from actividyIds
      const selectedActivities = activities.filter((activity) =>
        selectedActivityIds.includes(activity.id),
      );

      // get all prices from activities and add them
      const prices = selectedActivities
        ?.map((act) => act.price)
        ?.reduce((acc, cur) => acc + cur, 0);

      const totalPrice = prices * (attendees?.length || 1);

      // Calculate Organizer's 15% Payment
      const organizerAmount = Math.round(totalPrice * 0.15);

      // Save booking data to localStorage for use after redirect
      localStorage.setItem(
        "bookingData",
        JSON.stringify({
          activities: [
            ...selectedActivities.map((act) => ({
              name: act.name,
              price: act.price,
              image: act.image,
            })),
          ],
          userId: user.id,
          totalPrice,
          attendees: [
            ...attendees.map((a) => ({
              email: a.email,
              name: a.name,
            })),
            {
              email: user?.email,
              name: user?.user_metadata?.full_name,
            },
          ],
          organizerEmail: user.email,
          bookingDate: startDate,
          end_date: endDate,
          paidAmount: organizerAmount,
        }),
      );

      // ✅ Request Organizer Payment Link
      const organizerPaymentRes = await fetch("/api/create-organizer-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          amount: organizerAmount,
          activities: selectedActivities,
        }),
      });

      const organizerPaymentData = await organizerPaymentRes.json();

      if (!organizerPaymentData.success) {
        toast.error("Error generating organizer payment link.", {
          id: toastId,
        });
        return;
      }

      //   // ✅ Redirect Organizer to Stripe Checkout for Payment
      window.location.href = organizerPaymentData.paymentLink;
      localStorage.setItem("bookingInProgress", "true");
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Error processing payment.", { id: toastId });
    }
  };

  // handle submit
  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await addPlanningWithData(formData);
      if (res?.error) return toast.error(res?.error);
      handleBooking();
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
    <div className="grid min-h-screen grid-cols-[1fr_0.7fr] gap-2 divide-x divide-neutral-700 sm:grid-cols-[1fr_0.5fr] sm:gap-10">
      <div className="mx-auto w-full space-y-10 rounded-xl border border-gray-800 p-3 sm:p-10">
        <PlanningFormHeading />

        <form
          action={async (formData) => handleSubmit(formData)}
          className="flex flex-col gap-6"
        >
          {/* step 1 */}
          {planningStep === 1 && <PlanningFormBookingInfoStep />}

          {/* step 2 (Activity Selection) */}
          {planningStep === 2 && (
            <PlanningFormActivitySelection
              activities={activities}
              categories={categories}
            />
          )}

          {/* step 3 (Time logic) */}
          {planningStep === 3 && <PlanningFormTimeline timeline={timeline} />}

          {/* step 4 transport */}
          {planningStep === 4 && <PlanningFormTransport timeline={timeline} />}

          {/*Form cta */}
          <PlanningFormCTA planningStep={planningStep} isPending={isPending} />
        </form>
      </div>
      <PlanningSUmmaryPanel selectedActivities={selectedActivities} />
    </div>
  );
}
