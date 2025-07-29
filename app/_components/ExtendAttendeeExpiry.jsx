"use client";

import { useState } from "react";
import { extendAttendeeExpiry } from "../_lib/attendeeApi";
import Button from "./Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ExtendAttendeeExpiry({
  id,
  hasExtended,
  attendeePayemntStatus,
  bookingPaymentStatus,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleExtendExpiry = async () => {
    const toastId = toast.loading("Processing...");
    setLoading(true);
    if (hasExtended)
      return toast.error("You have already extended your payment link once!", {
        id: toastId,
      });
    try {
      await extendAttendeeExpiry(id);
      toast.success("Expiry extended by 24 hours!", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error(error?.message, {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return !hasExtended &&
    attendeePayemntStatus === "unpaid" &&
    bookingPaymentStatus !== "cancelled" ? (
    <Button
      variation="gold"
      onClick={handleExtendExpiry}
      disabled={loading || bookingPaymentStatus === "cancelled"}
      className="whitespace-nowrap px-4 py-2.5 !text-xs font-medium"
    >
      {loading ? "Processing..." : "Extend by 24h"}
    </Button>
  ) : (
    <button className="block w-full cursor-not-allowed whitespace-nowrap rounded-full border-2 border-transparent bg-gray-500 px-4 py-2.5 text-sm font-medium capitalize text-gray-300 opacity-50 grayscale">
      Extend limit reached
    </button>
  );
}
