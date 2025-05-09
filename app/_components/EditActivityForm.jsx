"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { editActivityAction } from "../_lib/actions";
import FormRow from "./FormRow";
import SpinnerMini from "./SpinnerMini";
import { getSuppliers } from "../_lib/apiSupplier";

export default function EditActivityForm({ activity }) {
  const {
    id,
    name,
    minAge,
    duration,
    price,
    destinations,
    description,
    group_size,
    tags,
    image,
    bannerImage,
    supplier,
  } = activity;
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [isPending, startTransition] = useTransition();
  const editFormRef = useRef();
  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await editActivityAction(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success("Activity updated successfully!");
      editFormRef.current?.reset();
    });
  };

  // Effect to fetch activities
  useEffect(() => {
    async function fetchSuppliers() {
      setLoading(true);
      const fetchedSuppliers = await getSuppliers();

      setSuppliers(
        fetchedSuppliers.map((sup) => ({
          name: sup.name,
          value: sup.id,
        })),
      );
      setLoading(false);
    }
    fetchSuppliers();
  }, []);
  return (
    <form
      ref={editFormRef}
      // action={editActivityAction}
      action={(formData) => handleSubmit(formData)}
      className="grid grid-cols-2 gap-x-16 gap-y-4 px-10 py-20"
    >
      <FormRow label={"Activity Name"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="name"
          defaultValue={name}
        />
      </FormRow>
      <FormRow label={"Activity Price"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="number"
          name="price"
          defaultValue={price}
        />
      </FormRow>
      <FormRow label={"Activity duration"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="duration"
          defaultValue={duration}
        />
      </FormRow>
      <FormRow label={"Min Age"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="number"
          name="minAge"
          defaultValue={minAge}
        />
      </FormRow>

      <FormRow label={"Destinations"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="destinations"
          defaultValue={destinations}
        />
      </FormRow>

      <FormRow label={"Group Size"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="group_size"
          defaultValue={group_size}
        />
      </FormRow>
      <FormRow label={"Tags"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="tags"
          title="split by commas"
          placeholder="Glam,Beauty,Instagrammable,Photo,Luxury..."
          defaultValue={tags}
        />
      </FormRow>

      <FormRow label={"Card Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="file"
          name="image"
        />
      </FormRow>
      <FormRow label={"Banner Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="file"
          name="bannerImage"
        />
      </FormRow>
      <input type="hidden" name="existingImage" value={image} />
      <input type="hidden" name="existingBannerImage" value={bannerImage} />
      {loading ? (
        <div className="my-4 flex flex-col gap-4">
          <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
          <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
        </div>
      ) : (
        <FormRow label={"Link Supplier"}>
          <select
            name="supplier"
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 text-softGold"
          >
            {supplier && supplier.id ? (
              <option selected value={supplier.id} defaultValue={supplier.name}>
                {supplier.name}
              </option>
            ) : (
              <option disabled selected value="">
                Link supplier
              </option>
            )}
            {suppliers?.map((supplier) => {
              return (
                <option key={supplier.value} value={supplier.value}>
                  {supplier.name}
                </option>
              );
            })}
          </select>
        </FormRow>
      )}
      <FormRow label={"Description"} className={"[grid-column:1/-1]"}>
        <textarea
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          cols={10}
          rows={8}
          name="description"
          defaultValue={description}
        />
      </FormRow>
      <input type="hidden" name="activityId" value={id} />
      <div className="[grid-column:1/-1]">
        <button
          className="flex h-10 items-center gap-2 rounded bg-sky-700 px-6 capitalize tracking-wide duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <SpinnerMini /> <span>updating...</span>
            </div>
          ) : (
            "update activity"
          )}
        </button>
      </div>
    </form>
  );
}
