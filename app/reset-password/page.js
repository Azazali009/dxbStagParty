"use client";
import React, { useState, useTransition } from "react";
import FormRow from "../_components/FormRow";
import { resetPassword } from "../_lib/userProfileAction";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";
import EyeIcon from "../svgIcons/EyeIcon";
import { cinzel, playfairDisplay } from "../layout";

export default function ResetPassword() {
  const [passwordTye, setPasswordType] = useState("password");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await resetPassword(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success("Password change successfully.");
    });
  }
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl items-center justify-center">
      <form
        className="w-full space-y-8 rounded-xl border border-gray-800 p-6"
        action={(formData) => handleSubmit(formData)}
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
