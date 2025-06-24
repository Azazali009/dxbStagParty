"use client";
import Link from "next/link";
// import { auth } from "../_lib/auth";
import Image from "next/image";
import { useAuth } from "../_context/AuthProvider";
import SignOutButton from "./SignOutButton";
import SpinnerMini from "./SpinnerMini";

export default function AuthNav() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-end gap-4 px-8">
        <SpinnerMini />
      </div>
    );

  return (
    <div className="flex items-center justify-end gap-4 px-4 py-2 xs:px-8 sm:py-0">
      {user ? (
        <div className="flex items-center gap-4">
          <Link
            href={
              user?.user_metadata?.role === "admin"
                ? "/dashboard"
                : user?.user_metadata?.role === "supplier"
                  ? "/dashboard/activities"
                  : "/account"
            }
            title="Account"
          >
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
            className="inline-block rounded-sm border-2 border-matalicGold bg-matalicGold px-4 py-1 text-sm font-semibold capitalize text-navyBlue duration-300 hover:bg-transparent hover:text-white xs:px-6 xs:py-1.5 xs:text-base"
            href={"/account"}
          >
            Login
          </Link>
          <Link
            className="inline-block rounded-sm border-2 border-sky-600 bg-sky-600 px-4 py-1 text-sm font-semibold capitalize duration-300 hover:bg-transparent hover:text-white xs:px-6 xs:py-1.5 xs:text-base"
            href={"/signup"}
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
