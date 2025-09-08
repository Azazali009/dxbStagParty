"use client";
import Image from "next/image";
import React, { useTransition } from "react";
import { verifyUser } from "../_lib/userProfileAction";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";

import { useAuth } from "../_context/AuthProvider";
import { supabase } from "../_lib/supabase";

export default function VerifyUserButton({ email, userId }) {
  const { setNonVerifyUsersCount } = useAuth();
  const [isPending, startTransition] = useTransition();
  function handleVerification() {
    if (confirm("Are you sure to verify this user?"))
      startTransition(async () => {
        const res = await verifyUser(userId);
        if (res?.error) return toast.error(res?.error);
        toast.success(
          "User has been successfully verified. A notification will be sent to the registered email address.",
        );
        const { count } = await supabase
          .from("users")
          .select("*", { count: "exact" })
          .eq("isVerified", false);
        setNonVerifyUsersCount(count);
        // Send Confirmation Email to user
        const emailApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`;
        await fetch(emailApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: email,
            subject: `You account for DXB Stag party has been approved.`,
            message: ` <div style="background-color:#0B0E1C; color:#E0B15E; padding:30px; font-family:sans-serif; text-align:center;">
    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />
    
    <h1 style="font-size:24px; margin-bottom:20px;">Welcome to DXB Stag Parties</h1>
    
    <p style="font-size:16px; margin-bottom:30px;">
      Great news! Your account has been approved by the DXB Stag Parties team.<br/>
      You can now log in and explore all the exciting experiences we have to offer.<br/><br/>
     
    </p>
    
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/login"
       style="display:inline-block; padding:10px 20px; background-color:#E0B15E; color:#0B0E1C; text-decoration:none; font-weight:bold; border-radius:6px;">
       Login
    </a>

    <p style="margin-top:40px; font-size:12px; color:#aaa;">
      If you did not expect this email, you may safely ignore it.
    </p>
  </div>
`,
          }),
        });
      });
  }
  return (
    <button onClick={handleVerification} title="Mark user as verified">
      {isPending ? (
        <SpinnerMini />
      ) : (
        <Image
          src={"/images/checkmark.png"}
          width={20}
          height={20}
          alt="checkmark"
        />
      )}
    </button>
  );
}
