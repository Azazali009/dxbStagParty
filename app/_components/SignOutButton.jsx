import Image from "next/image";
import React from "react";
import { signOutAction } from "../_lib/actions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="duration-300 hover:scale-95">
        <Image
          src={"/images/logout.png"}
          height={25}
          width={25}
          alt="logout icon"
          className="inline-block"
        />
      </button>
    </form>
  );
}
