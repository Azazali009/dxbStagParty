"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { addActivityAction } from "../_lib/actions";
import FormRow from "./FormRow";
import SubmitButton from "./SubmitButton";
import { getSuppliers } from "../_lib/apiSupplier";
import { getCategories } from "../_lib/categoryApi";

export default function AdminActivityForm() {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPending, startTransition] = useTransition();
  const ref = useRef();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await addActivityAction(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success("Activity added successfully!");
      ref.current?.reset();
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
      action={(formData) => handleSubmit(formData)}
      className="grid grid-cols-2 gap-x-16 gap-y-4"
      ref={ref}
    >
      <FormRow label={"Activity Name"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="name"
          placeholder="desert dune buggy..."
        />
      </FormRow>
      <FormRow label={"Activity Price"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="number"
          name="price"
          placeholder="1000"
        />
      </FormRow>
      <FormRow label={"Activity duration"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="duration"
          placeholder="2hr"
        />
      </FormRow>
      <FormRow label={"Min Age"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="number"
          name="minAge"
          placeholder="18"
        />
      </FormRow>

      <FormRow label={"Destinations"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="destinations"
          placeholder="dubai"
        />
      </FormRow>

      <FormRow label={"Group Size"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="group_size"
          placeholder="4-10"
        />
      </FormRow>
      <FormRow label={"Tags"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="tags"
          title="split by commas"
          placeholder="Glam,Beauty,Instagrammable,Photo,Luxury..."
        />
      </FormRow>

      <FormRow label={"Card Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="file"
          name="image"
        />
      </FormRow>
      <FormRow label={"Banner Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="file"
          name="bannerImage"
        />
      </FormRow>
      {loading ? (
        <div className="my-4 flex flex-col gap-4">
          <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
          <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
        </div>
      ) : (
        <FormRow label={"Link Supplier"}>
          <select
            name="supplier"
            className="h-10 w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 text-softGold"
          >
            <option selected value="">
              Select supplier
            </option>
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
      <FormRow label={"Day time"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="dayTime"
          autoComplete="on"
          placeholder="Evening/Night"
        />
      </FormRow>
      <FormRow label={"alcohol Permitted"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="alcoholPermitted"
          autoComplete="on"
          placeholder="Yes (venue dependent)"
        />
      </FormRow>
      <FormRow label={"Photo Video Included"}>
        <select
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          name="photoVideoIncluded"
          id="photoVideoIncluded"
          required
        >
          <option selected value="">
            Select Photo Video Inclusion?
          </option>
          <option value="yes">Yes</option>
          <option value="No">No, available as add-on</option>
          <option value="optional">Optional</option>
        </select>
      </FormRow>
      <FormRow label={"cancellation Policy"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="cancellationPolicy"
          autoComplete="on"
          placeholder="48-hour cancellation"
        />
      </FormRow>
      <FormRow label={"optional Add Ons"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="optionalAddOns"
          autoComplete="on"
          placeholder="Lighting rig, MC host, smoke machine"
        />
      </FormRow>
      <FormRow label={"core Inclusions"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="coreInclusions"
          title="split by commas"
          placeholder="Professional DJ for 2–3 hrs, full deck setup, curated playlist, sound system..."
        />
      </FormRow>
      <FormRow label={"deposit Required"}>
        <select
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          name="depositRequired"
        >
          <option selected value="">
            Deposit required
          </option>
          <option value="yes">yes</option>
          <option value="no">No</option>
        </select>
      </FormRow>
      {/* <FormRow label={"category"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="category"
          autoComplete="on"
          placeholder="Vip / Adrenalin / Competitive etc..."
        />
      </FormRow> */}
      {loading ? (
        <div className="my-4 flex flex-col gap-4">
          <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
          <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
        </div>
      ) : (
        <FormRow label={"Add category"}>
          <select
            name="categoryId"
            className="h-10 w-full rounded-md border border-neutral-700 bg-navyBlue px-4 py-2 text-softGold"
          >
            <option selected value="">
              Select category
            </option>
            {categories?.map((category) => {
              return (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </FormRow>
      )}
      <FormRow label={"Description"} className={"[grid-column:1/-1]"}>
        <textarea
          className="rounded bg-navyBlue p-2 outline-none placeholder:text-matalicGold/20 focus:outline-matalicGold"
          cols={10}
          rows={8}
          name="description"
          placeholder="description"
        />
      </FormRow>
      <div className="[grid-column:1/-1]">
        <SubmitButton>
          <span className="text-lg">+</span>
          <span> add activity</span>
        </SubmitButton>
      </div>
    </form>
  );
}
