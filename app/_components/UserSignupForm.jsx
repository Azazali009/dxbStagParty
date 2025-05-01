"use client";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { signUpAction } from "../_lib/actions";
import { signup } from "../_lib/userProfileAction";
import SignInButton from "./SignInButton";
import SpinnerMini from "./SpinnerMini";
import Link from "next/link";

export default function UserSignupForm() {
  const [isPending, startTransition] = useTransition();
  function handleSubmit(formData) {
    startTransition(async () => {
      try {
        await signup(formData);
        toast.success("Account created successfully!");
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong!");
      }
    });
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">Sign up to access your area</h1>

      <form
        // onSubmit={handleCredentialsLogin}
        // action={signUpAction}
        action={(formData) => handleSubmit(formData)}
        // action={signup}
        className="w-full max-w-sm space-y-4 text-navyBlue"
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="name"
          className="w-full rounded-md border px-4 py-2"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          className="w-full rounded-md border px-4 py-2"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full rounded-md border px-4 py-2"
          required
        />

        {/* <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Login with Email
        </button> */}
        <button
          className="flex w-full items-center justify-center gap-2 rounded bg-sky-600 px-6 py-2.5 text-center font-medium capitalize text-softGold duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <SpinnerMini /> <span>Creating...</span>
            </div>
          ) : (
            "Sign up"
          )}
        </button>
      </form>
      <div className="flex items-center gap-4">
        <p>Already have an account? </p>
        <Link
          className="text-sky-600 underline hover:text-white"
          href={"/login"}
        >
          Login
        </Link>{" "}
      </div>
      {/* <div className="text-gray-500">or</div> */}
      {/* <SignInButton /> */}
    </div>
  );
}
