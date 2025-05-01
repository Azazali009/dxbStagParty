"use client";
import { useRef, useState, useTransition } from "react";
import SpinnerMini from "../_components/SpinnerMini";
import { createUserByAdmin } from "../_lib/actions";
import FormRow from "../_components/FormRow";
import toast from "react-hot-toast";
import EyeIcon from "../svgIcons/EyeIcon";

export default function AddUserForm() {
  const [passwordType, setPasswordType] = useState("password");
  const ref = useRef();

  function handleShowPassword() {
    setPasswordType((cur) => (cur === "password" ? "text" : "password"));
  }
  const [isPending, startTransition] = useTransition();
  function handleSubmit(formData) {
    startTransition(async () => {
      try {
        await createUserByAdmin(formData);
        toast.success("User created successfully!");
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong!");
      }
    });
  }
  return (
    <div className="mx-auto flex flex-col gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">Add user</h1>

      <form
        action={(formData) => handleSubmit(formData)}
        className="grid w-full grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-2"
      >
        <FormRow label="Name">
          <input
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="name"
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2"
            required
          />
        </FormRow>
        <FormRow label="Email">
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
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
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 capitalize"
          >
            <option value="user">organiser</option>
            <option value="admin">admin</option>
            <option value="admin">supplier</option>
          </select>
        </FormRow>
        <button
          className="flex w-fit items-center justify-center gap-2 rounded bg-sky-600 px-6 py-2.5 text-center font-medium capitalize text-softGold duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <SpinnerMini /> <span>Creating...</span>
            </div>
          ) : (
            "Create user"
          )}
        </button>
      </form>
    </div>
  );
}
