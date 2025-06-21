"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../_context/AuthProvider";
import { updateUserProfileAction } from "../_lib/userProfileAction";
import FormRow from "./FormRow";
import SpinnerMini from "./SpinnerMini";

export default function UpdateProfile({ user }) {
  const { refreshUser } = useAuth();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await updateUserProfileAction(formData);
      refreshUser();
      if (res?.error) toast.error(res?.error);
    });
  }
  return (
    <div className="space-y-5 xs:space-y-10 sm:space-y-20">
      <h1 className="text-gradient bg-gradient-to-r from-matalicGold via-secondary to-matalicGold bg-clip-text text-base font-bold tracking-tight text-transparent drop-shadow-lg xs:text-xl sm:text-2xl lg:text-4xl">
        Let’s freshen up your profile ✨
      </h1>

      <form
        action={async (formData) => handleSubmit(formData)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
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
            accept="image/webp, image/png, image/jpeg, image/jpg"
          />
        </FormRow>
        <input
          type="hidden"
          name="existingAvatar"
          value={user?.user_metadata?.avatar_url}
        />
        <FormRow label="New Password">
          <input
            className="h-10 rounded border border-gray-700 bg-transparent p-2 outline-none focus:outline-matalicGold"
            type="password"
            name="password"
            placeholder="******"
          />
        </FormRow>
        <div>
          <button
            disabled={isPending}
            className="mt-4 w-fit self-end rounded bg-indigo-600 px-4 py-1.5 text-xs capitalize duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 xs:px-6 xs:py-2 xs:text-base"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <SpinnerMini />

                <span>Updating...</span>
              </div>
            ) : (
              "update profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
