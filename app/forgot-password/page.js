"use client";
import React, { useTransition } from "react";
import FormRow from "../_components/FormRow";
import { forgotPassword } from "../_lib/userProfileAction";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";
import { cinzel } from "../layout";

export default function ForgotPassword() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await forgotPassword(formData);
      toast.success("Password reset link is sent to your email");
      if (res?.error) toast.error(res?.error);
    });
  }
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl items-center justify-center gap-4">
      <form
        className="w-full space-y-8 rounded-xl border border-gray-800 p-6"
        action={(formData) => handleSubmit(formData)}
      >
        <h1
          className={`!mb-12 ${cinzel.className} text-center text-4xl font-bold text-matalicGold`}
        >
          Enter your valid email to reset the password.
        </h1>

        <FormRow label="Email">
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            className="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 outline-none focus:outline-matalicGold"
            required
          />
        </FormRow>
        <button
          className="flex items-center justify-center gap-2 rounded bg-emerald-700 px-4 py-2.5 text-center font-medium capitalize text-softGold duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <SpinnerMini /> <span>Sending Link...</span>
            </div>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>
    </div>
  );
}
