import Image from "next/image";
import React from "react";
import googleIcon from "../svgIcons/google.svg";
import { signInAction } from "../_lib/actions";

export default function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-4 rounded-sm border border-gray-300 px-6 py-2 hover:opacity-85">
        <Image width={20} height={20} alt="google" src={googleIcon} />
        <span className="font-medium">Continue with Google</span>
      </button>
    </form>
  );
}
