"use client";

import Link from "next/link";
import { useTransition } from "react";
import toast from "react-hot-toast";
import SignInButton from "../_components/SignInButton";
import SpinnerMini from "../_components/SpinnerMini";
import { credentialsSignInAction } from "../_lib/actions";
import { login } from "../_lib/userProfileAction";

export default function Page() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      try {
        await login(formData);
        window.location.href = "/account";
      } catch (err) {
        console.log(err);
        toast.error("Invalid email or password");
      }
    });
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">Login to access your area</h1>

      <form
        // onSubmit={handleCredentialsLogin}
        // action={credentialsSignInAction}
        action={(formData) => handleSubmit(formData)}
        // action={login}
        className="w-full max-w-sm space-y-4 text-navyBlue"
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          className="w-full rounded-md border px-4 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full rounded-md border px-4 py-2"
          required
        />

        <button
          className="flex w-full items-center justify-center gap-2 rounded bg-sky-600 px-6 py-2.5 text-center font-medium capitalize text-softGold duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <SpinnerMini /> <span>Logging In...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="flex items-center gap-4">
        <p>Don&apos;t have an account? </p>
        <Link
          className="text-sky-600 underline hover:text-white"
          href={"/signup"}
        >
          Create account
        </Link>{" "}
      </div>
      {/* <div className="text-gray-500">or</div> */}
      {/* <SignInButton /> */}
    </div>
  );
}
