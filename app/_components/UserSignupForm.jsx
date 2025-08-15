"use client";
import Link from "next/link";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../_context/AuthProvider";
import { signup } from "../_lib/userProfileAction";
import SpinnerMini from "./SpinnerMini";
import { sendEmail } from "../_lib/sendEmail";

export default function UserSignupForm() {
  const { refreshUser } = useAuth();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    startTransition(async () => {
      const email = formData.get("email");
      const res = await signup(formData);
      refreshUser();
      if (res?.error) return toast.error(res?.error);
      toast(
        "Your account creation request has been submitted successfully. Please wait for admin approval. You will receive an email notification once your account has been approved.",
        { icon: "🕛" },
      );
      await sendEmail({
        toEmail: email,
        subject: "Account Request Received",
        message: `
  <div style="background-color:#0B0E1C; color:#E0B15E; padding:30px; font-family:sans-serif; text-align:center;">
    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />
    
    <h1 style="font-size:24px; margin-bottom:20px;">Account Request Received ✅</h1>
    
    <p style="font-size:16px; margin-bottom:30px;">
      Thank you for signing up with DXB Stag Parties! 🎉<br/><br/>
      Your account creation request has been sent to our admin team for approval.<br/>
      Once your account is approved, you will receive another email with instructions to log in.
    </p>
    
    <p style="margin-top:30px; font-size:14px; color:#ccc;">
      No further action is required from you at this stage. Please keep an eye on your inbox for our next update.
    </p>

    <p style="margin-top:40px; font-size:12px; color:#aaa;">
      If you did not request an account, you may safely ignore this email.
    </p>
  </div>
`,
      });
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

        {/* <select
          name="role"
          id="role"
          className="w-full rounded-md border border-gray-800 bg-primary px-4 py-2 text-sm capitalize"
        >
          <option selected value="">
            Choose your role
          </option>
          <option value="organiser">organiser</option>
          <option value="supplier">supplier</option>
        </select> */}

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
