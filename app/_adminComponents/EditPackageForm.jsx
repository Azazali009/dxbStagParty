"use client";

import { MultiSelect } from "react-multi-select-component";
import FormRow from "../_components/FormRow";
import SpinnerMini from "../_components/SpinnerMini";
import { updatePackage } from "../_lib/packagesAction";
import { useEffect, useRef, useState, useTransition } from "react";
import { getActivities } from "../_lib/data-services";
import toast from "react-hot-toast";

export default function EditPackage({ Package }) {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await updatePackageWithData(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success("Package Updated successfully!");
    });
  };

  const updatedPackageData = { selected, packageId: Package.id };
  const updatePackageWithData = updatePackage.bind(null, updatedPackageData);
  // Effect to fetch activities
  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      const fetchedActivities = await getActivities();

      setActivities(
        fetchedActivities.map((act) => ({
          label: act.name,
          value: act.id,
          price: act.price,
        })),
      );
      setLoading(false);
    }
    fetchActivities();
  }, []);

  useEffect(() => {
    if (activities.length && Package.inclusions?.length) {
      const prefilledSelected = activities.filter((activity) =>
        Package.inclusions.includes(activity.label),
      );
      setSelected(prefilledSelected);
    }
  }, [activities, Package]);

  return (
    <form
      action={(formData) => handleSubmit(formData)}
      className="grid grid-cols-2 gap-x-16 gap-y-4 p-10"
    >
      <FormRow label={"Package Name"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="name"
          placeholder="the yacht king..."
          defaultValue={Package.name}
        />
      </FormRow>
      <FormRow label={"Price Band"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="number"
          name="price_band"
          placeholder="1000"
          defaultValue={Package.price_band}
        />
      </FormRow>
      <FormRow label={"Add Ons"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="add_ons"
          title="split by commas"
          placeholder="DJ & Sax, Custom Cake, Onboard Bartender..."
          defaultValue={Package.add_ons}
        />
      </FormRow>
      {loading ? (
        <div className="my-4 flex flex-col gap-4">
          <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
          <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
        </div>
      ) : (
        <FormRow label={"Include Activities"}>
          <MultiSelect
            options={activities}
            value={selected} // Keep it controlled
            onChange={(selected) => {
              setSelected([...selected]); // Ensure state update happens outside of render
            }}
            labelledBy="Select Activities"
            className="custom-multi-select2"
          />
        </FormRow>
      )}

      <FormRow label={"Group Size"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="group_size"
          placeholder="4-10"
          defaultValue={Package.group_size}
        />
      </FormRow>
      <FormRow label={"Tags"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="tags"
          title="split by commas"
          placeholder="Glam,Beauty,Instagrammable,Photo,Luxury..."
          defaultValue={Package.tags}
        />
      </FormRow>

      <FormRow label={"Package Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="file"
          name="image"
        />
      </FormRow>
      <input type="hidden" value={Package.image} name="oldImage" />
      <FormRow label={"Blurb"} className={"[grid-column:1/-1]"}>
        <textarea
          className="rounded bg-navyBlue p-2 outline-none placeholder:text-matalicGold/20 focus:outline-matalicGold"
          cols={10}
          rows={8}
          name="blurb"
          placeholder="description"
          defaultValue={Package.blurb}
        />
      </FormRow>
      <div className="[grid-column:1/-1]">
        <button
          className="flex h-10 items-center gap-2 rounded bg-sky-700 px-6 font-light capitalize tracking-wide duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <SpinnerMini /> <span>update...</span>
            </div>
          ) : (
            "Update package"
          )}
        </button>
      </div>
    </form>
  );
}
