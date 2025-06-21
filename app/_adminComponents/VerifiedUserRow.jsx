import React from "react";
import DeleteUser from "../_components/DeleteUser";
import Image from "next/image";

export default function VerifiedUserRow({ user }) {
  return (
    <div
      key={user.id}
      className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-items-center border-b border-white/5 px-2 py-3 text-xs"
    >
      <div className="relative size-12 overflow-hidden rounded-full border border-gray-800 bg-navyBlue">
        <Image
          src={
            user?.user_metadata?.avatar_url ||
            user?.image ||
            "/images/defaultUser.png"
          }
          fill
          alt={user?.user_metadata?.full_name || user?.fullName}
          className="rounded-full object-cover"
        />
      </div>
      <p className="">{user.id.split("-")[0]}</p>
      <p className="text-left">
        {user?.user_metadata?.full_name || user?.fullName}
      </p>
      <p>{user.email}</p>
      <p>{user?.user_metadata?.role || user?.role}</p>
      <DeleteUser email={user.email} userId={user.id} />
    </div>
  );
}
