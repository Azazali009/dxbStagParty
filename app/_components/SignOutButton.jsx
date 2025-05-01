"use client";
import Image from "next/image";
import React, { useTransition } from "react";
import { signOutAction } from "../_lib/actions";
import logoutIcon from "../svgIcons/logout.svg";
import { signOut } from "../_lib/userProfileAction";
import SpinnerMini from "./SpinnerMini";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  function handleSubmit(formData) {
    startTransition(async () => {
      try {
        await signOut();
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    });
  }
  return (
    // <form action={signOutAction}>
    <form action={handleSubmit}>
      {isPending ? (
        <SpinnerMini />
      ) : (
        <button className="duration-300 hover:scale-95" title="Logout">
          <Image
            src={logoutIcon}
            height={30}
            width={30}
            alt="logout icon"
            className="inline-block"
          />
        </button>
      )}
    </form>
  );
}
