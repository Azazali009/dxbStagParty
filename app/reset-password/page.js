"use client";
import React, { useEffect, useState, useTransition } from "react";
import FormRow from "../_components/FormRow";
// import { resetPassword } from "../_lib/userProfileAction";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";
import EyeIcon from "../svgIcons/EyeIcon";
import { cinzel } from "../layout";
// import { supabase } from "../_lib/supabase";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ResetPassword() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [passwordTye, setPasswordType] = useState("password");
  const [isPending, startTransition] = useTransition();
  const [sessionReady, setSessionReady] = useState(false);
  // before
  // function handleSubmit(formData) {
  //   startTransition(async () => {
  //     const res = await resetPassword(formData);
  //     if (res?.error) return toast.error(res?.error);
  //     toast.success("Password changed successfully.");
  //   });
  // }

  // after: without server action: Because hash token are not working with server action
  async function handleSubmit(formData) {
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!password || !confirmPassword)
      return toast.error("Please fill all fields.");
    if (password !== confirmPassword)
      return toast.error("Password should be same.");

    startTransition(async () => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        console.error(error);
        return toast.error(
          error?.message || "Something went wrong! Please try again.",
        );
      }
      toast.success("Password changed successfully.");
      router.push("/login");
    });
  }

  // 🔑 Step 1: capture session from `?code=...`
  useEffect(() => {
    (async () => {
      try {
        if (window.location.search.includes("code=")) {
          await supabase.auth.exchangeCodeForSession(window.location.href);
          // URL cleanup optional:
          window.history.replaceState({}, "", window.location.pathname);
        }
        setSessionReady(true);
      } catch (err) {
        console.error("session capture failed:", err);
        toast.error("Invalid or expired reset link.");
      }
    })();
  }, [supabase]);

  if (!sessionReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Verifying reset link...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl items-center justify-center">
      <form
        className="w-full space-y-8 rounded-xl border border-gray-800 p-6"
        // action={(formData) => handleSubmit(formData)}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.currentTarget));
        }}
      >
        <h1
          className={`!mb-12 ${cinzel.className} text-center text-4xl font-bold text-matalicGold`}
        >
          Enter your new password.
        </h1>
        <FormRow label="New Password">
          <input
            type={passwordTye}
            placeholder="******"
            name="password"
            autoComplete="password"
            className="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 outline-none focus:outline-matalicGold"
            required
          />
        </FormRow>
        <FormRow label="Confirm Password">
          <input
            type={passwordTye}
            placeholder="******"
            name="confirmPassword"
            autoComplete="password"
            className="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 outline-none focus:outline-matalicGold"
            required
          />
        </FormRow>
        <button
          type="button"
          onClick={() =>
            setPasswordType((cur) => (cur === "password" ? "text" : "password"))
          }
          className="flex items-center gap-3 fill-sky-600 text-sky-600 underline hover:no-underline"
        >
          <span>Show password</span> <EyeIcon />
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded bg-emerald-700 px-4 py-2.5 text-center font-medium capitalize text-softGold duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <SpinnerMini /> <span>reseting...</span>
            </div>
          ) : (
            "Change password"
          )}
        </button>
      </form>
    </div>
  );
}
