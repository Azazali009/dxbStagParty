"use client";
import { useRef, useState, useTransition } from "react";
import SpinnerMini from "../_components/SpinnerMini";
import { createUserByAdmin, updateUserByAdmin } from "../_lib/actions";
import FormRow from "../_components/FormRow";
import toast from "react-hot-toast";
import EyeIcon from "../svgIcons/EyeIcon";
import { sendEmail } from "../_lib/sendEmail";

export default function UserForm({ userId = null, user = null }) {
  const [passwordType, setPasswordType] = useState("password");
  const ref = useRef();

  function handleShowPassword() {
    setPasswordType((cur) => (cur === "password" ? "text" : "password"));
  }
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    const role = formData.get("role");
    const email = formData.get("email");
    const password = formData.get("password");

    startTransition(async () => {
      if (userId) {
        const res = await updateUserByAdmin(formData);

        if (res?.error) return toast.error(res?.error);
        toast.success("User updated.");
      } else {
        const res = await createUserByAdmin(formData);
        if (res?.error) return toast.error(res?.error);

        toast.success("User created successfully!");

        // Send Confirmation Email to user
        await sendEmail({
          toEmail: email,
          subject: `You're invited to DXB Stag Party as ${role}`,
          message: `
    <div style="background-color:#0B0E1C; color:#E0B15E; padding:30px; font-family:sans-serif; text-align:center;">
      <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />
      <h1 style="font-size:24px; margin-bottom:20px;">Welcome to DXB Stag Parties!</h1>
      <p style="font-size:16px; margin-bottom:20px;">
        You’ve been invited to join the platform as a <strong>${role}</strong>.
      </p>
      <p style="font-size:15px; margin-bottom:10px;">
        👉 These are your login credentials. Please change your password after first login:
      </p>
      <p style="font-size:15px; margin-bottom:20px; line-height:1.6;">
        <strong>Email:</strong> ${email}<br/>
        <strong>Password:</strong> ${password}
      </p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/login"
         style="display:inline-block; padding:12px 24px; background-color:#E0B15E; color:#0B0E1C; text-decoration:none; font-weight:bold; border-radius:6px;">
        Click here to login
      </a>
      <p style="margin-top:40px; font-size:12px; color:#aaa;">
        If you did not expect this email, you can ignore it.
      </p>
    </div>
  `,
        });
      }
    });
  }

  return (
    <div className="mx-auto flex flex-col gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">
        Add user{" "}
        <span className="inline-block text-base font-medium text-matalicGold">
          (Organiser, Admin)
        </span>
      </h1>

      <form
        action={(formData) => handleSubmit(formData)}
        className="grid w-full grid-cols-1 items-center gap-x-7 gap-y-4 sm:grid-cols-2"
      >
        {userId && <input type="hidden" name="userId" value={userId} />}
        <FormRow label="Name">
          <input
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="name"
            defaultValue={user?.fullName}
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2"
            required
          />
        </FormRow>
        <FormRow label="Email">
          <input
            type="email"
            placeholder="Email"
            defaultValue={user?.email}
            name="email"
            autoComplete="email"
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2"
            required
          />
        </FormRow>
        <FormRow label="Phone">
          <input
            type="tel"
            placeholder="+92 xxxxxxxxx"
            name="phone"
            defaultValue={user?.phone}
            autoComplete="phone"
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2"
            required
          />
        </FormRow>
        <FormRow label="password">
          <div className="relative">
            <input
              ref={ref}
              type={passwordType}
              placeholder="Password"
              name="password"
              className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2"
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 fill-gray-300 hover:fill-gray-500"
            >
              <EyeIcon />
            </button>
          </div>
        </FormRow>
        <FormRow label="Role">
          <select
            name="role"
            id="role"
            defaultValue={user?.role}
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 capitalize"
          >
            <option value="organiser">organiser</option>
            <option value="admin">admin</option>
          </select>
        </FormRow>
        <div style={{ gridColumn: "1/-1" }} className="mt-6">
          <button
            className="flex w-fit items-center justify-center gap-2 rounded border border-matalicGold px-6 py-2.5 text-center font-medium capitalize text-matalicGold duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <SpinnerMini />
                <span>{userId ? "Updating..." : "Creating..."}</span>
              </div>
            ) : (
              <span>{userId ? "Update User" : "Create User"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
