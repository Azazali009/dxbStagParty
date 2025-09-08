"use client";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import FormRow from "../_components/FormRow";
import SpinnerMini from "../_components/SpinnerMini";
import {
  addAndApplySupplierAction,
  addSupplierAction,
  applySupplierAction,
} from "../_lib/supplierAction";
import { getActivities } from "../_lib/data-services";
import { MultiSelect } from "react-multi-select-component";
import { createClient } from "../_utils/supabase/client";
import EyeIcon from "../svgIcons/EyeIcon";
import AccountAccessStep from "./AccountAccessStep";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BusinessProfileStep from "./BusinessProfileStep";
import AvailabilityOperationStep from "./AvailabilityOperationStep";
import PricingCommissionStep from "./PricingCommissionStep";
import ActivityMetaDataStep from "./ActivityMetaDataStep";
import BookingAlert from "./BookingAlert";
import DocumentsLegal from "./DocumentsLegal";
import FormNavigationButton from "../_components/FormNavigationButton";
import { useSupplier } from "../_context/SupplierProvider";
import { omit } from "../_lib/helpers";

export default function SupplierForm({ isForApply = false }) {
  const { formData, selectedActivities, range } = useSupplier();
  const { images, role, email, password } = formData;
  const [isPending, startTransition] = useTransition();

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

  // handle submit
  // async function handleSubmit(formData) {
  //   startTransition(async () => {
  //     if (!isForApply) {
  //       const res = await addSupplierAction(
  //         {
  //           selectedActivities,
  //           urls: [], // Empty for now
  //           validateOnly: true,
  //         },
  //         formData,
  //       );
  //       if (res?.error) return toast.error(res?.error);
  //       // Step 3: if no error, now upload images
  //       const urls = await uploadImagesToSupabaseBucket();
  //       // Step 4: now send final form with images
  //       const finalRes = await addSupplierAction(
  //         {
  //           selectedActivities,
  //           urls,
  //           bankDetails,
  //         },
  //         formData,
  //       );

  //       if (finalRes?.error) return toast.error(finalRes?.error);
  //       toast.success("New Supplier added successfully");
  //     } else {
  //       // Step 1: validate form data locally
  //       const res = await applySupplierAction(
  //         {
  //           selectedActivities,
  //           urls: [], // Empty for now
  //           validateOnly: true,
  //         },
  //         formData,
  //       );

  //       // Step 2: check for validation error (from server)
  //       if (res?.error) {
  //         return toast.error(res?.error);
  //       }

  //       // Step 3: if no error, now upload images
  //       const urls = await uploadImagesToSupabaseBucket();

  //       // Step 4: now send final form with images
  //       const finalRes = await applySupplierAction(
  //         {
  //           selectedActivities,
  //           urls,
  //           bankDetails,
  //         },
  //         formData,
  //       );

  //       if (finalRes?.error) return toast.error(finalRes?.error);
  //       toast.success(
  //         "Your form has been submitted. Please wait for admin approval.",
  //       );
  //     }
  //   });
  // }

  async function handleSubmit() {
    const safeFormData = omit(formData, ["images"]);
    startTransition(async () => {
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

      toast.success(
        !isForApply
          ? "New Supplier added successfully"
          : "Your form has been submitted. Please wait for admin approval.",
      );
      // send invite mail to user
      const emailApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`;
      await fetch(emailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: email,
          subject: `You're invited to DXB Stag Party as ${role}`,
          message: `
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
        `,
        }),
      });
    });
  }

  // const applySupplierWithData = applySupplierAction.bind(null, {
  //   selectedActivities,
  //   uploadedImageUrls,
  // });

  return (
    <div className="mx-auto my-8 flex flex-col gap-14 rounded-2xl border border-neutral-700 px-8 py-14">
      <h1 className="text-center text-3xl font-semibold text-matalicGold">
        {isForApply ? "Apply to become a supplier" : "Add supplier"}
      </h1>

      <form
        action={handleSubmit}
        className="grid w-full grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2"
      >
        {activeStep === 1 && <AccountAccessStep />}

        {activeStep === 2 && <BusinessProfileStep />}

        {activeStep === 3 && <AvailabilityOperationStep />}

        {activeStep === 4 && <PricingCommissionStep />}

        {activeStep === 5 && <ActivityMetaDataStep />}

        {activeStep === 6 && <BookingAlert />}

        {activeStep === 7 && <DocumentsLegal />}

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
                    {isForApply ? "Submit Application" : "Add Supplier"}
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
