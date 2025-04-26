// import SignInButton from "../_components/SignInButton";

// export const metadata = {
//   title: "Login",
// };

// export default function Page() {
//   return (
//     <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 px-4 py-14">
//       <h1 className="bg-gradient-to-b from-neutral-500 to-neutral-700 bg-clip-text text-3xl font-semibold text-transparent">
//         Login to access your area
//       </h1>

//       <SignInButton />
//     </div>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInButton from "../_components/SignInButton";
import { credentialsSignInAction } from "../_lib/actions";
import SpinnerMini from "../_components/SpinnerMini";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleCredentialsLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   const res = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false,
  //   });

  //   if (res?.error) {
  //     setError("Invalid email or password");
  //   } else {
  //     router.push("/");
  //   }
  // };
  const handleSubmit = (formData) => {
    startTransition(async () => {
      try {
        await credentialsSignInAction(formData);
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
        className="w-full max-w-sm space-y-4 text-navyBlue"
      >
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
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
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
      <div className="text-gray-500">or</div>
      <SignInButton />
    </div>
  );
}

// function Button() {
//   const { pending } = useFormStatus();
//   return (
//     <button
//       className="flex w-full items-center justify-center gap-2 rounded bg-sky-600 px-6 py-2.5 text-center font-medium capitalize text-softGold duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
//       type="submit"
//       disabled={pending}
//     >
//       {pending ? (
//         <div className="flex items-center gap-2">
//           {" "}
//           <SpinnerMini /> <span>Logging In...</span>
//         </div>
//       ) : (
//         "Login"
//       )}
//     </button>
//   );
// }
