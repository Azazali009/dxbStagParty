import React from "react";
import DeleteUser from "../_components/DeleteUser";
import VerifyUserButton from "../_adminComponents/VerifyUserButton";
import Image from "next/image";

export default function UserRow({ user, isVerified = false }) {
  return (
    <div
      key={user.id}
      className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-items-center border-b border-white/5 px-2 py-3 text-xs"
    >
      <div className="relative size-12 overflow-hidden rounded-full border border-gray-800 bg-navyBlue">
        <Image
          src={user?.avatar || user?.image || "/images/defaultUser.png"}
          fill
          alt={user?.fullName}
          className="rounded-full object-cover"
        />
      </div>
      <p className="">{user.id.split("-")[0]}</p>
      <p className="text-left">{user?.fullName}</p>
      <p>{user.email}</p>
      <p>{user?.role}</p>
      <div className="flex items-center gap-2">
        {!isVerified && (
          <VerifyUserButton email={user.email} userId={user.id} />
        )}
        <DeleteUser email={user.email} userId={user.id} />
      </div>
    </div>
  );
}
