"use client";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import FormRow from "../_components/FormRow";
import SpinnerMini from "../_components/SpinnerMini";
import { getActivities } from "../_lib/data-services";
import { addSupplierAction, updateSupplier } from "../_lib/supplierAction";

export default function EditSupplierForm({ supplier }) {
  //   const [loading, setLoading] = useState(false);
  //   const [activities, setActivities] = useState([]);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData) {
    startTransition(async () => {
      const res = await updateSupplier(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success(" Supplier updated successfully");
    });
  }

  // Effect to fetch activities
  //   useEffect(() => {
  //     async function fetchActivities() {
  //       setLoading(true);
  //       const fetchedActivities = await getActivities();

  //       setActivities(
  //         fetchedActivities.map((act) => ({
  //           label: act.name,
  //           value: act.id,
  //           price: act.price,
  //         })),
  //       );
  //       setLoading(false);
  //     }
  //     fetchActivities();
  //   }, []);
  return (
    <div className="mx-auto flex flex-col gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">Update supplier</h1>

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
            defaultValue={supplier.name}
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
            defaultValue={supplier.email}
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
            defaultValue={supplier.phone}
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2"
            required
          />
        </FormRow>
        <input type="hidden" name="supplierId" value={supplier.id} />
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
                <SpinnerMini /> <span>Updating...</span>
              </div>
            ) : (
              "Update supplier"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
