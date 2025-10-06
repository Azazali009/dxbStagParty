"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { addActivityAction } from "../_lib/actions";
import FormRow from "./FormRow";
import SubmitButton from "./SubmitButton";
import { getSupplierUsers } from "../_lib/apiSupplier";
import { getCategories } from "../_lib/categoryApi";

export default function AdminActivityForm() {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [activityName, setActivityName] = useState("");
  const [slug, setSlug] = useState("");

  const ref = useRef();

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be less than 1 MB");
      e.target.value = ""; // clear field
    }
  };

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await addActivityAction(formData);
      if (res?.error) return toast.error(res?.error);
      toast.success("Activity added successfully!");
      ref.current?.reset();
    });
  };

  function generateSlug() {
    if (!activityName) return;
    const slug = activityName
      .toLowerCase() // lowercase
      .trim() // remove extra spaces
      .replace(/&/g, "and") // & ko 'and' bana do
      .replace(/[^a-z0-9\s-]/g, "") // special chars remove (except space/dash)
      .replace(/\s+/g, "-") // spaces → dash
      .replace(/-+/g, "-");
    setSlug(slug);
  }

  // Effect to fetch activities,suppliers
  useEffect(() => {
    async function fetchSuppliers() {
      setLoading(true);
      const fetchedSuppliers = await getSupplierUsers();
      setSuppliers(
        fetchedSuppliers.map((sup) => ({
          name: sup.fullName,
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
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="desert dune buggy..."
        />
      </FormRow>
      <FormRow label={"Activity Slug"}>
        <div className="relative w-full">
          <input
            className="h-10 w-full rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
            type="text"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="desert-dune-buggy"
          />
          <button
            type="button"
            onClick={generateSlug}
            className="absolute right-2 top-1/2 inline-block -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 text-matalicGold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
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
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
        />
      </FormRow>
      <FormRow label={"Banner Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          name="bannerImage"
          onChange={handleImageChange}
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
