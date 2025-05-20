"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { editActivityAction } from "../_lib/actions";
import FormRow from "./FormRow";
import SpinnerMini from "./SpinnerMini";
import { getSuppliers } from "../_lib/apiSupplier";
import { getCategories } from "../_lib/categoryApi";

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
    dayTime,
    alcoholPermitted,
    photoVideoIncluded,
    coreInclusions,
    optionalAddOns,
    cancellationPolicy,
    depositRequired,
    category,
  } = activity;

  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
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

      const fetchedCategories = await getCategories();
      setCategories(
        fetchedCategories.map((cat) => ({
          name: cat.name,
          value: cat.id,
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
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 capitalize text-softGold"
          >
            {supplier && supplier.id ? (
              <option selected value={supplier.id} defaultValue={supplier.name}>
                {supplier.name}
              </option>
            ) : (
              <option selected value="">
                Link supplier
              </option>
            )}
            {suppliers
              ?.filter((curSupplier) => supplier?.id !== curSupplier.value)
              .map((curSupplier) => (
                <option key={curSupplier.value} value={curSupplier.value}>
                  {curSupplier.name}
                </option>
              ))}
          </select>
        </FormRow>
      )}
      <FormRow label={"Day time"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="dayTime"
          autoComplete="on"
          defaultValue={dayTime}
          placeholder="Evening/Night"
        />
      </FormRow>
      <FormRow label={"alcohol Permitted"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="alcoholPermitted"
          autoComplete="on"
          defaultValue={alcoholPermitted}
          placeholder="Yes (venue dependent)"
        />
      </FormRow>
      <FormRow label={"Photo Video Included"}>
        <select
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          name="photoVideoIncluded"
          id="photoVideoIncluded"
          defaultValue={photoVideoIncluded}
          required
        >
          <option selected value="">
            Select Photo Video Inclusion?
          </option>
          <option value="yes">Yes</option>
          <option value="No, available as add-on">
            No, available as add-on
          </option>
          <option value="optional">Optional</option>
        </select>
      </FormRow>
      <FormRow label={"cancellation Policy"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="cancellationPolicy"
          autoComplete="on"
          defaultValue={cancellationPolicy}
          placeholder="48-hour cancellation"
        />
      </FormRow>
      <FormRow label={"optional Add Ons"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="optionalAddOns"
          autoComplete="on"
          defaultValue={optionalAddOns}
          placeholder="Lighting rig, MC host, smoke machine"
        />
      </FormRow>
      <FormRow label={"core Inclusions"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="coreInclusions"
          title="split by commas"
          defaultValue={coreInclusions}
          placeholder="Professional DJ for 2–3 hrs, full deck setup, curated playlist, sound system..."
        />
      </FormRow>
      <FormRow label={"deposit Required"}>
        <select
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          name="depositRequired"
          defaultValue={depositRequired}
        >
          <option value="">Deposit required</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </FormRow>
      {/* <FormRow label={"category"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="category"
          autoComplete="on"
          defaultValue={"test"}
          placeholder="Vip / Adrenalin / Competitive etc..."
        />
      </FormRow> */}
      {loading ? (
        <div className="my-4 flex flex-col gap-4">
          <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
          <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
        </div>
      ) : (
        <FormRow label={"add category"}>
          <select
            name="categoryId"
            className="w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 capitalize text-softGold"
          >
            {category && category.id ? (
              <option selected value={category.id} defaultValue={category.name}>
                {category.name}
              </option>
            ) : (
              <option selected value="">
                add category
              </option>
            )}
            {categories
              ?.filter((curCategory) => category?.id !== curCategory.value)
              .map((curCategory) => (
                <option key={curCategory.value} value={curCategory.value}>
                  {curCategory.name}
                </option>
              ))}
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
