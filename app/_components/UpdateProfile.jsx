"use client";

import { updateUserProfileAction } from "../_lib/userProfileAction";
import FormRow from "./FormRow";
export default function UpdateProfile({ user }) {
  return (
    <div className="space-y-10">
      <h1 className={`text-2xl font-semibold`}>Your(Organiser) Area</h1>
      <form action={updateUserProfileAction} className="grid grid-cols-2 gap-6">
        <FormRow label="Email">
          <input
            disabled
            className="h-10 rounded border border-gray-700 bg-transparent p-2 outline-none focus:outline-matalicGold disabled:bg-gray-700 disabled:opacity-50"
            type="email"
            defaultValue={user.email}
            name="email"
          />
        </FormRow>
        <FormRow label="FullName">
          <input
            className="h-10 rounded border border-gray-700 bg-transparent p-2 outline-none focus:outline-matalicGold"
            type="text"
            defaultValue={user?.user_metadata?.full_name}
            name="fullName"
          />
        </FormRow>
        <FormRow label="Avatar">
          <input
            className="h-10 rounded-md border border-gray-700 bg-transparent py-1.5 disabled:bg-gray-700 disabled:opacity-50"
            type="file"
            name="avatar"
          />
        </FormRow>
        <FormRow label="New Password">
          <input
            className="h-10 rounded border border-gray-700 bg-transparent p-2 outline-none focus:outline-matalicGold"
            type="password"
            name="password"
            placeholder="******"
          />
        </FormRow>
        <div>
          <button className="mt-4 w-fit self-end rounded bg-sky-600 px-6 py-2 capitalize duration-300 hover:bg-sky-700">
            update profile
          </button>
        </div>
      </form>
    </div>
  );
}
