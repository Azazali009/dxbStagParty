"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const confirmPayment = async () => {
      const email = searchParams.get("email");

      if (!email) {
        alert("Invalid payment confirmation.");
        router.push("/");
        return;
      }

      // ✅ Call API to Confirm Payment
      const confirmRes = await fetch(`/api/confirm-payment?email=${email}`);
      const confirmData = await confirmRes.json();
      console.log(confirmData);
      if (!confirmData.success) {
        alert("❌ Payment confirmation failed.");
        router.push("/");
        return;
      }

      // ✅ Redirect to Complete Booking Page
      router.push("/complete-booking");
    };

    confirmPayment();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-semibold">Verifying Payment...</p>
    </div>
  );
}
