"use client";
import Link from "next/link";
// import { auth } from "../_lib/auth";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import { createClient } from "../_utils/supabase/client";
import { useEffect, useState } from "react";
import SpinnerMini from "./SpinnerMini";

export default function AuthNav() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      setUser(data?.user || null);
      setLoading(false);
    }
    getUser();
  }, [setUser, setLoading]);

  if (loading)
    return (
      <div>
        <SpinnerMini />
      </div>
    );

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
              className="size-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <Link
          className="inline-block rounded-sm border-2 border-matalicGold bg-matalicGold px-6 py-1.5 font-semibold capitalize text-navyBlue duration-300 hover:bg-transparent hover:text-white"
          href={"/account"}
        >
          Login
        </Link>
      )}
    </div>
  );
}
