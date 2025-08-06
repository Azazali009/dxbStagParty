"use client";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import FormRow from "../_components/FormRow";
import SpinnerMini from "../_components/SpinnerMini";
import { addSupplierAction, applySupplierAction } from "../_lib/supplierAction";
import { getActivities } from "../_lib/data-services";
import { MultiSelect } from "react-multi-select-component";
import { createClient } from "../_utils/supabase/client";

export default function SupplierForm({ isForApply = false }) {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [images, setImages] = useState([undefined]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  async function uploadImagesToSupabaseBucket() {
    const supabase = createClient();
    const urls = []; // ✅ Temporary array to collect all URLs

    for (let file of images) {
      if (!file) continue;

      const imageName = `${Math.random()}-${file.name}`;
      const imagePath = `gallery/${imageName}`;

      const { data, error } = await supabase.storage
        .from("supplier-images")
        .upload(imagePath, file);

      if (error) {
        console.error("Image Upload error:", error);
        continue;
      }

      const url = supabase.storage
        .from("supplier-images")
        .getPublicUrl(data.path).data.publicUrl;

      urls.push(url); // ✅ Push to local array
    }

    setUploadedImageUrls(urls); // ✅ Update state (optional)
    return urls; // ✅ Return array from function
  }

  // handle submit
  async function handleSubmit(formData) {
    startTransition(async () => {
      if (!isForApply) {
        const res = await addSupplierAction(formData);
        if (res?.error) return toast.error(res?.error);
        toast.success("New Supplier added successfully");
      } else {
        // Step 1: validate form data locally
        const res = await applySupplierAction(
          {
            selectedActivities,
            urls: [], // Empty for now
          },
          formData,
        );

        // Step 2: check for validation error (from server)
        if (res?.error) {
          return toast.error(res?.error);
        }

        // Step 3: if no error, now upload images
        const urls = await uploadImagesToSupabaseBucket();

        // Step 4: now send final form with images
        const finalRes = await applySupplierAction(
          {
            selectedActivities,
            urls,
          },
          formData,
        );

        if (finalRes?.error) return toast.error(finalRes?.error);
        toast.success(
          "Your form has been submitted. Please wait for admin approval.",
        );
      }
    });
  }

  // const applySupplierWithData = applySupplierAction.bind(null, {
  //   selectedActivities,
  //   uploadedImageUrls,
  // });

  // handle gallery images
  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  // handle add image function
  const handleAddImage = () => {
    setImages([...images, undefined]); // placeholder for next image
  };

  // handle remove image function

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1); // Remove the one at `index`
    setImages(newImages);
  };
  // fetch all activities
  useEffect(() => {
    setLoading(true);
    async function fetchActivities() {
      const activities = await getActivities();
      setActivities(
        activities?.map((act) => ({
          label: act.name,
          value: act.id,
        })),
      );
      setLoading(false);
    }
    fetchActivities();
  }, []);

  return (
    <div className="mx-auto flex flex-col gap-14 px-4 py-14">
      <h1 className="text-3xl font-semibold text-matalicGold">
        {isForApply ? "Apply to become a supplier" : "Add supplier"}
      </h1>

      <form
        action={(formData) => handleSubmit(formData)}
        className="grid w-full grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2"
      >
        <FormRow label="Supplier Name">
          <input
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="name"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>
        <FormRow label="Email">
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>
        <FormRow label="Phone">
          <input
            type="tel"
            placeholder="+01234...."
            name="phone"
            autoComplete="tel"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>
        {loading ? (
          <div className="my-4 flex flex-col gap-4">
            <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
            <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
          </div>
        ) : (
          <FormRow label={"Add Activities"}>
            <MultiSelect
              options={activities}
              value={selectedActivities} // Keep it controlled
              onChange={(selected) => {
                setSelectedActivities([...selected]); // Ensure state update happens outside of render
              }}
              labelledBy="Add Activities"
              className="custom-multi-select"
              hasSelectAll={false}
            />
          </FormRow>
        )}
        <FormRow label="Role">
          <input
            type="text"
            placeholder="supplier"
            name="role"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>
        <FormRow label="short description">
          <textarea
            name="short_description"
            className="w-full rounded-md border border-neutral-700 bg-primary p-4"
            id="short_description"
            placeholder="Thrilling desert dune rides"
          ></textarea>
        </FormRow>
        <FormRow label="full description">
          <textarea
            name="full_description"
            className="w-full rounded-md border border-neutral-700 bg-primary p-4"
            id="full_description"
            placeholder="We offer fully guided off-road..."
            cols={5}
            rows={5}
          ></textarea>
        </FormRow>

        <FormRow label="business type">
          <input
            type="text"
            placeholder="Tour Operator"
            name="business_type"
            autoComplete="organization"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="locations">
          <input
            type="text"
            placeholder="Dubai, Sharjah, ..."
            name="locations"
            autoComplete="address-level2"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>
        <FormRow label="languages">
          <input
            type="text"
            placeholder="English, Arabic, ..."
            name="languages"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label={"Gallery"}>
          {images.map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="file"
                className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleImageChange(index, e.target.files[0])
                }
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="flex size-6 items-center justify-center rounded bg-red-600 text-lg text-white hover:bg-red-700"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="w-fit rounded bg-indigo-600 px-4 py-2 text-white"
          >
            Add Image
          </button>
        </FormRow>

        <FormRow label="available hours">
          <input
            type="text"
            placeholder="mon: 10-18, fri: 12-22, ..."
            name="available_hours"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>
        <FormRow label="blackout dates">
          <input
            type="text"
            placeholder="2025-12-25, 2025-01-01 ..."
            name="blackout_dates"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>
        <FormRow label="lead time">
          <input
            type="text"
            placeholder="	48 (hours)"
            name="lead_time_required"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <div className="[grid-column:1/-1]">
          <button
            className="flex w-fit items-center justify-center gap-2 rounded border border-matalicGold bg-transparent px-6 py-2.5 text-center font-medium capitalize text-matalicGold duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                {" "}
                <SpinnerMini /> <span>Processing...</span>
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
