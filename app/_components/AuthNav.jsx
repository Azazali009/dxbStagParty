"use client";
import Link from "next/link";
// import { auth } from "../_lib/auth";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import { createClient } from "../_utils/supabase/client";
import { useEffect, useState } from "react";
import SpinnerMini from "./SpinnerMini";
import { useAuth } from "../_context/AuthProvider";

export default function AuthNav() {
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) return <SpinnerMini />;

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4">
          <Link href={"/account"} title="Account">
            <Image
              src={user?.user_metadata?.avatar_url || "/images/defaultUser.png"}
              width={100}
              height={100}
              alt={user?.user_metadata?.full_name}
              // alt={"text"}
              className="size-10 rounded-full bg-gray-600 object-cover"
              referrerPolicy="no-referrer"
            />
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            className="inline-block rounded-sm border-2 border-matalicGold bg-matalicGold px-6 py-1.5 font-semibold capitalize text-navyBlue duration-300 hover:bg-transparent hover:text-white"
            href={"/account"}
          >
            Login
          </Link>
          <Link
            className="inline-block rounded-sm border-2 border-sky-600 bg-sky-600 px-6 py-1.5 font-semibold capitalize duration-300 hover:bg-transparent hover:text-white"
            href={"/signup"}
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
