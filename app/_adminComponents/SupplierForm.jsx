"use client";
import { useTransition } from "react";
import toast from "react-hot-toast";
import FormRow from "../_components/FormRow";
import SpinnerMini from "../_components/SpinnerMini";
import { addSupplierAction } from "../_lib/supplierAction";

export default function SupplierForm({ isForApply = false }) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData) {
    startTransition(async () => {
      if (!isForApply) {
        const res = await addSupplierAction(formData);
        if (res?.error) return toast.error(res?.error);
        toast.success("New Supplier added successfully");
      }
    });
  }

  return (
    <div className="mx-auto flex flex-col gap-14 px-4 py-14">
      <h1 className="text-3xl font-semibold text-matalicGold">
        {isForApply ? "Apply to become a supplier" : "Add supplier"}
      </h1>

      <form
        action={(formData) => handleSubmit(formData)}
        className="grid w-full grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-2"
      >
        <FormRow label="Activity Provider Name">
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
        <FormRow label="Phone">
          <input
            type="tel"
            placeholder="+01234...."
            name="phone"
            autoComplete="tel"
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2"
            required
          />
        </FormRow>
        {/* {loading ? (
          <div className="my-4 flex flex-col gap-4">
            <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
            <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
          </div>
        ) : (
          <FormRow label={"Include Activities"}>
            <select
              name="activity"
              className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 text-softGold"
            >
              <option disabled selected value="">
                Select activity
              </option>
              {activities?.map((activity) => {
                return (
                  <option key={activity.value} value={activity.value}>
                    {activity.label}
                  </option>
                );
              })}
            </select>
          </FormRow>
        )} */}
        <div className="[grid-column:1/-1]">
          <button
            className="flex w-fit items-center justify-center gap-2 rounded bg-sky-600 px-6 py-2.5 text-center font-medium capitalize text-softGold duration-300 hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                {" "}
                <SpinnerMini /> <span>Adding...</span>
              </div>
            ) : (
              <span>{isForApply ? "Submit Application" : "Add Supplier"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
