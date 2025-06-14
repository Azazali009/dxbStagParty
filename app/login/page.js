"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import SpinnerMini from "../_components/SpinnerMini";
import { useAuth } from "../_context/AuthProvider";
import { login } from "../_lib/userProfileAction";
import EyeIcon from "../svgIcons/EyeIcon";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const [passwordTye, setPasswordType] = useState("password");
  const { refreshUser } = useAuth();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await login(formData);
      // window.location.href = "/verify-login";
      refreshUser();
      if (res?.error) return toast.error(res?.error);
    });
  };
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "signup") {
      toast.success("Your email has been verified successfully!");
    }
  }, [searchParams]);
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">Login to access your area</h1>

      <form
        // onSubmit={handleCredentialsLogin}
        // action={credentialsSignInAction}
        action={(formData) => handleSubmit(formData)}
        // action={login}
        className="w-full space-y-8 rounded-xl border border-gray-800 p-10"
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          className="w-full rounded-md border border-gray-800 bg-primary px-4 py-2 outline-none focus:outline-matalicGold"
          required
        />
        <div className="relative">
          <input
            type={passwordTye}
            placeholder="Password"
            name="password"
            className="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 outline-none focus:outline-matalicGold"
            required
          />
          <button
            type="button"
            onClick={() =>
              setPasswordType((cur) =>
                cur === "password" ? "text" : "password",
              )
            }
            className="absolute right-4 top-1/2 block -translate-y-1/2 fill-sky-600"
          >
            <EyeIcon />
          </button>
        </div>

        <button
          className="flex items-center justify-center gap-2 rounded bg-emerald-700 px-4 py-1.5 text-center font-medium capitalize text-softGold duration-300 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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

      <div className="flex w-full items-center justify-between text-sm">
        <Link
          className="text-sky-600 underline hover:text-white"
          href={"/signup"}
        >
          Create account?
        </Link>{" "}
        <Link
          className="text-sky-600 underline hover:text-white"
          href={"/forgot-password"}
        >
          Forgot password?
        </Link>
      </div>
      {/* <div className="text-gray-500">or</div> */}
      {/* <SignInButton /> */}
    </div>
  );
}
