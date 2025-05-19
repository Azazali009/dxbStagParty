import React from "react";
import SignOutButton from "../_components/SignOutButton";
import Link from "next/link";
import Image from "next/image";

export default function UserInfo({ user }) {
  return (
    <div className="flex items-center justify-end gap-4 self-stretch px-4 py-2">
      <Link href={"/dashboard/me"}>
        <Image
          src={user?.user_metadata?.avatar_url || "/images/defaultUser.png"}
          width={30}
          height={300}
          alt={user?.user_metadata?.full_name}
          className="size-10 rounded-full object-cover"
        />
      </Link>
      <div>
        <h3 className="text-xl font-medium capitalize">
          {user?.user_metadata?.full_name?.split(" ")[0]}
        </h3>
        <p className="text-sm font-light capitalize text-gray-400">
          {user?.user_metadata.role}
        </p>
      </div>
      <SignOutButton />
    </div>
  );
}
