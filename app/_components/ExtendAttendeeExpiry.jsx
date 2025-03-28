"use client";

import { useState } from "react";
import { extendAttendeeExpiry } from "../_lib/attendeeApi";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function ExtendAttendeeExpiry({
  id,
  hasExtended,
  attendeePayemntStatus,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleExtendExpiry = async () => {
    setLoading(true);
    if (hasExtended)
      return alert("❌ You have already extended your payment link once!");
    try {
      await extendAttendeeExpiry(id);
      alert("✅ Expiry extended by 24 hours!");
      router.refresh();
    } catch (error) {
      //   alert("❌ Unexpected error.");
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return !hasExtended && attendeePayemntStatus === "unpaid" ? (
    <Button variation="gold" onClick={handleExtendExpiry} disabled={loading}>
      {loading ? "Processing..." : "Extend Expiry by 24h"}
    </Button>
  ) : (
    <button className="block w-full cursor-not-allowed rounded-full border-2 border-transparent bg-gray-500 px-6 py-3 font-medium capitalize text-gray-300 opacity-50 grayscale">
      Extend limit reached 😒
    </button>
  );
}
