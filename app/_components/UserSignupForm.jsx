"use client";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { signUpAction } from "../_lib/actions";
import { signup } from "../_lib/userProfileAction";
import SignInButton from "./SignInButton";
import SpinnerMini from "./SpinnerMini";
import Link from "next/link";
import { useAuth } from "../_context/AuthProvider";

export default function UserSignupForm() {
  const { refreshUser } = useAuth();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await signup(formData);
      refreshUser();
      if (res?.error) toast.error(res?.error);
    });
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">Sign up to access your area</h1>

      <form
        action={(formData) => handleSubmit(formData)}
        className="w-full space-y-8 rounded-xl border border-gray-800 p-10"
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="name"
          className="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 outline-none focus:outline-matalicGold"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          className="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 outline-none focus:outline-matalicGold"
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 outline-none focus:outline-matalicGold"
          required
        />

        <button
          className="flex items-center justify-center gap-2 rounded bg-emerald-700 px-4 py-1.5 text-center font-medium capitalize text-softGold duration-300 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
      <div className="flex items-center gap-4 text-sm">
        <p>Already have an account? </p>
        <Link
          className="text-lg font-medium text-sky-600 underline decoration-matalicGold decoration-[2px] underline-offset-4 hover:text-white"
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
