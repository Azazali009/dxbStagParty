"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import FormNavigationButton from "../_components/FormNavigationButton";
import SpinnerMini from "../_components/SpinnerMini";
import { useSupplier } from "../_context/SupplierProvider";
import { getSupplierBySUpplierId } from "../_lib/apiSupplier";
import { omit, uploadSingleImageToBucket } from "../_lib/helpers";
import {
  addAndApplySupplierAction,
  updateSupplierAction,
} from "../_lib/supplierAction";
import { createClient } from "../_utils/supabase/client";
import AccountAccessStep from "./AccountAccessStep";
import ActivityMetaDataStep from "./ActivityMetaDataStep";
import AvailabilityOperationStep from "./AvailabilityOperationStep";
import BookingAlert from "./BookingAlert";
import BusinessProfileStep from "./BusinessProfileStep";
import DocumentsLegal from "./DocumentsLegal";
import PricingCommissionStep from "./PricingCommissionStep";

export default function SupplierForm({ isForApply = false, editId = null }) {
  const {
    formData,
    setFormData,
    selectedActivities,
    setSelectedActivities,
    range,
    setRange,
    avatar,
  } = useSupplier();

  const { images, role, email, password } = formData;
  const [isPending, startTransition] = useTransition();
  const [deleteUrls, setDeleteUrls] = useState([]);
  const [supplier, setSupplier] = useState({});

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeStep = Number(searchParams.get("step") ?? 1);

  function handleNext() {
    const params = new URLSearchParams(searchParams);
    params.set("step", activeStep + 1);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function handlePrev() {
    if (activeStep > 1) {
      const params = new URLSearchParams(searchParams);
      params.set("step", activeStep - 1);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }
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

    return urls; // ✅ Return array from function
  }

  function getStoragePathFromUrl(url) {
    if (!url) return null;
    const parts = url.split("/user-avatar/");
    return decodeURIComponent(parts[1]);
  }

  async function handleSubmit() {
    const supabase = createClient();
    const safeFormData = omit(formData, ["images", "selectedActivities"]);
    startTransition(async () => {
      // Agar update karna ho
      if (editId) {
        // 1) Agar new file hai to upload karo
        if (avatar) {
          // (a) Pehle old avatar delete karo
          if (formData.avatar) {
            const oldPath = getStoragePathFromUrl(formData.avatar);

            const { error } = await supabase.storage
              .from("user-avatar")
              .remove([oldPath]);
            if (error) return console.log("error", error);
          }
        }
        let newUrls = [];
        const bucketRes = await uploadSingleImageToBucket(
          supabase,
          avatar,
          "user-avatar",
        );
        const publicUrl = bucketRes?.publicUrl;
        if (bucketRes?.error) return toast.error(bucketRes.error);
        // Only upload if new images exist
        if (images && images.length > 0) {
          newUrls = await uploadImagesToSupabaseBucket();
        }

        const finalRes = await updateSupplierAction({
          id: supplier.id,
          newUrls,
          deleteUrls,
          ...safeFormData,
          selectedActivities,
          range,
          userId: supplier?.user_id,
          publicUrl,
        });

        if (finalRes?.error) return toast.error(finalRes?.error);

        toast.success("Supplier updated successfully");
        return;
      }
      // 1) Validate only check
      const res = await addAndApplySupplierAction({
        urls: [], // Empty for now
        validateOnly: true,
        isForApply,
        ...safeFormData,
        selectedActivities,
        range,
      });
      if (res?.error) return toast.error(res?.error);
      // Step 2: if no error, now upload images
      const urls = await uploadImagesToSupabaseBucket();
      // Step 3: now send final form with images

      const finalRes = await addAndApplySupplierAction({
        urls,
        isForApply,
        ...safeFormData,
        selectedActivities,
        range,
      });

      if (finalRes?.error) return toast.error(finalRes?.error);

      // send invite mail to user
      const emailApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`;
      await fetch(emailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: email,
          subject: `${!isForApply ? "Invitation to join DXB Stag Party as Supplier" : "Your supplier application has been submitted successfully"}`,
          message: !isForApply
            ? `
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
        `
            : `
          <div style="background-color:#0B0E1C; color:#E0B15E; padding:30px; font-family:sans-serif; text-align:center;">
            <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="DXB Stag Parties Logo" style="width:120px; margin-bottom:20px;" />
            <h1 style="font-size:24px; margin-bottom:20px;">Thank you for applying!</h1>
            <p style="font-size:16px; margin-bottom:20px;">
             Your request has been submitted successfully.
            </p>
            <p style="font-size:15px; margin-bottom:10px;">
             Thank you for submitting your application. You’re on the way to becoming a valued part of our company. Your application has been successfully received and is now under review by our admin team. Once approved, you will receive a confirmation email with instructions to log in and manage your details accordingly.
            </p>
  
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}"
               style="display:inline-block; padding:12px 24px; background-color:#E0B15E; color:#0B0E1C; text-decoration:none; font-weight:bold; border-radius:6px;">
              Visit website
            </a>
            <p style="margin-top:40px; font-size:12px; color:#aaa;">
              If you did not expect this email, you can ignore it.
            </p>
          </div>
        `,
        }),
      });
    });
  }

  useEffect(() => {
    async function fetchSupplier() {
      const data = await getSupplierBySUpplierId(editId);
      setSupplier(data);
    }
    fetchSupplier();
  }, [editId]);

  // effect for pre-fetching some fields
  useEffect(() => {
    if (supplier && Object.keys(supplier).length > 0) {
      // Autofill all fields from supplier data
      setFormData((prev) => ({
        ...prev,
        bankDetails: supplier.bank_details || prev.bankDetails,
        ...supplier, // merge supplier fields into formData
        oldImages: supplier.gallery || [],
      }));

      // Pre-fill blackout range
      if (supplier.blackout_start && supplier.blackout_end) {
        setRange({
          from: new Date(supplier.blackout_start),
          to: new Date(supplier.blackout_end),
        });
      }

      // If supplier already has selectedActivities, set them
      if (supplier.selectedActivities) {
        setSelectedActivities(supplier.selectedActivities);
      }

      // If supplier already has range
      if (supplier.range) {
        setRange(supplier.range);
      }
    }
  }, [supplier, setFormData, setSelectedActivities, setRange]);

  return (
    <div className="mx-auto my-8 flex flex-col gap-14 rounded-2xl border border-neutral-700 px-8 py-14">
      {!editId && (
        <h1 className="text-center text-3xl font-semibold text-matalicGold">
          {isForApply ? "Apply to become a supplier" : "Add supplier"}
        </h1>
      )}

      <form
        action={handleSubmit}
        className="grid w-full grid-cols-1 items-center gap-x-7 gap-y-8 sm:grid-cols-2"
      >
        {activeStep === 1 && (
          <AccountAccessStep isEdit={!!editId} supplier={supplier} />
        )}

        {activeStep === 2 && (
          <BusinessProfileStep
            setDeleteUrls={setDeleteUrls}
            deleteUrls={deleteUrls}
          />
        )}

        {activeStep === 3 && <AvailabilityOperationStep />}

        {activeStep === 4 && <PricingCommissionStep />}

        {activeStep === 5 && <ActivityMetaDataStep />}

        {activeStep === 6 && <BookingAlert />}

        {activeStep === 7 && <DocumentsLegal />}
        {/* <button
          className="flex w-fit items-center justify-center gap-2 rounded border border-matalicGold bg-transparent px-6 py-2.5 text-center font-medium capitalize text-matalicGold duration-300 hover:opacity-80 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <SpinnerMini /> <span>Processing...</span>
            </div>
          ) : (
            <span>
              {editId
                ? "Update Supplier"
                : isForApply
                  ? "Submit Application"
                  : "Add Supplier"}
            </span>
          )}
        </button> */}
        <div className="flex items-center justify-between [grid-column:1/-1]">
          <FormNavigationButton
            onClick={handlePrev}
            disabled={activeStep === 1}
          >
            Prev
          </FormNavigationButton>
          {activeStep === 7 ? (
            <div>
              <button
                className="flex w-fit items-center justify-center gap-2 rounded border border-matalicGold bg-transparent px-6 py-2.5 text-center font-medium capitalize text-matalicGold duration-300 hover:opacity-80 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    {" "}
                    <SpinnerMini /> <span>Processing...</span>
                  </div>
                ) : (
                  <span>
                    {editId
                      ? "Update Supplier"
                      : isForApply
                        ? "Submit Application"
                        : "Add Supplier"}
                  </span>
                )}
              </button>
            </div>
          ) : (
            <FormNavigationButton
              onClick={handleNext}
              disabled={activeStep === 7}
            >
              Next
            </FormNavigationButton>
          )}
        </div>
      </form>
    </div>
  );
}
