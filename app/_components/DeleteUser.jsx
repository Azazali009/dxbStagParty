"use client";
import React, { useTransition } from "react";
import TrashIcon from "../svgIcons/TrashIcon";
import { deleteUserAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";

export default function DeleteUser({ email, userId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete this user?"))
      startTransition(async () => {
        const res = await deleteUserAction(userId);
        if (res?.error) return toast.error(res?.error);
        // Send Confirmation Email to user
        const emailApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`;
        await fetch(emailApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: email,
            subject: `You are no longer the part of DXB Stag party`,
            message: ` <div style="background-color:#0B0E1C; color:#E0B15E; padding:30px; font-family:sans-serif; text-align:center;">
    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />
    
    <h1 style="font-size:24px; margin-bottom:20px;">We're sad to see you go 😔</h1>
    
    <p style="font-size:16px; margin-bottom:30px;">
      Your account has been removed from DXB Stag Parties based on our internal policies and terms.<br/>
      If you believe this was done in error, feel free to contact us.
    </p>
    
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact"
       style="display:inline-block; padding:10px 20px; background-color:#E0B15E; color:#0B0E1C; text-decoration:none; font-weight:bold; border-radius:6px;">
       Contact Support
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
    <button onClick={handleDelete} className="fill-red-600">
      {isPending ? <SpinnerMini /> : <TrashIcon />}
    </button>
  );
}
