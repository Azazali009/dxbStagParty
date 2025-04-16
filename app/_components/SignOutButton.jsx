import Image from "next/image";
import React from "react";
import { signOutAction } from "../_lib/actions";
import logoutIcon from "../svgIcons/logout.svg";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="duration-300 hover:scale-95" title="Logout">
        <Image
          src={logoutIcon}
          height={30}
          width={30}
          alt="logout icon"
          className="inline-block"
        />
      </button>
    </form>
  );
}
