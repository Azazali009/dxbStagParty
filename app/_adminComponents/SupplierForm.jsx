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

export default function SupplierForm({ isForApply = false }) {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [images, setImages] = useState([undefined]);
  const [bankDetails, setBankDetails] = useState({ bank: "", iban: "" });
  const [passwordTye, setPasswordType] = useState("password");

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

  async function handleSubmit(formData) {
    startTransition(async () => {
      const role = formData.get("role");
      const email = formData.get("email");
      const password = formData.get("password");
      const res = await addAndApplySupplierAction(
        {
          selectedActivities,
          urls: [], // Empty for now
          validateOnly: true,
          isForApply,
        },
        formData,
      );
      if (res?.error) return toast.error(res?.error);
      // Step 3: if no error, now upload images
      const urls = await uploadImagesToSupabaseBucket();
      // Step 4: now send final form with images
      const finalRes = await addAndApplySupplierAction(
        {
          selectedActivities,
          urls,
          bankDetails,
          isForApply,
        },
        formData,
      );

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
    <div className="mx-auto my-8 flex flex-col gap-14 rounded-2xl border border-neutral-700 px-8 py-14">
      <h1 className="text-center text-3xl font-semibold text-matalicGold">
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
        <FormRow label="Password">
          <div className="relative">
            <input
              type={passwordTye}
              placeholder="******"
              name="password"
              autoComplete="on"
              className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            />
            <button
              type="button"
              onClick={() =>
                setPasswordType((cur) =>
                  cur === "password" ? "text" : "password",
                )
              }
              className="absolute right-4 top-1/2 block -translate-y-1/2 fill-sky-600"
            >
              <EyeIcon />
            </button>
          </div>
        </FormRow>

        <FormRow label="short description">
          <textarea
            name="short_description"
            className="w-full rounded-md border border-neutral-700 bg-primary p-4"
            id="short_description"
            placeholder="Thrilling desert dune rides"
            cols={5}
            rows={5}
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

        <FormRow label="min group size">
          <input
            type="number"
            placeholder="	2"
            name="min_group_size"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="max group size">
          <input
            type="number"
            placeholder="12"
            name="max_group_size"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="booking method">
          <input
            type="text"
            placeholder="Manual / Online"
            name="booking_method"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="location type">
          <input
            type="text"
            placeholder="Outdoor / Indoor"
            name="location_type"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="base price">
          <input
            type="number"
            placeholder="200"
            name="base_price"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="discounted price">
          <input
            type="number"
            placeholder="150"
            name="discounted_price"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        {/* <FormRow label="add ons">
          <input
            type="text"
            placeholder="200"
            name="add_ons"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow> */}

        <FormRow label="deposit required">
          <select
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            name="deposit_required"
            id=""
          >
            <option value="">Is deposite required?</option>
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </FormRow>

        <FormRow label="cancellation_terms">
          <input
            type="text"
            placeholder="72 hours in advance"
            name="cancellation_terms"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="commission agreement">
          <input
            type="text"
            placeholder="10% per booking"
            name="commission_agreement"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="payment preferences">
          <input
            type="text"
            placeholder="Bank Transfer"
            name="payment_preferences"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow
          label="bank details"
          className={"space-y-2 ![grid-column:1/-1]"}
        >
          <label>
            Bank Name
            <input
              type="text"
              value={bankDetails.bank}
              className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
              onChange={(e) =>
                setBankDetails({ ...bankDetails, bank: e.target.value })
              }
            />
          </label>

          <label>
            IBAN Number
            <input
              type="text"
              value={bankDetails.iban}
              className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
              onChange={(e) =>
                setBankDetails({ ...bankDetails, iban: e.target.value })
              }
            />
          </label>
        </FormRow>

        <FormRow label="activity tags">
          <input
            type="text"
            placeholder="Adventure, Family, ..."
            name="activity_tags"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="mobility requirements">
          <input
            type="text"
            placeholder="Not wheelchair accessible"
            name="mobility_requirements"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="minimum age">
          <input
            type="number"
            placeholder="18"
            name="minimum_age"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="alcohol included">
          <select
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            name="alcohol_included"
            id=""
          >
            <option value="">alcohol included?</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </FormRow>

        <FormRow label="media friendly">
          <select
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            name="media_friendly"
            id=""
          >
            <option value="">Is media friendly?</option>
            <option value="true">Yes</option>
            <option value="false">NO</option>
          </select>
        </FormRow>

        <FormRow label="safety certifications">
          <input
            type="text"
            placeholder="ISO 9001, Local Tourism Cert, ..."
            name="safety_certifications"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="insurance provided">
          <select
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            name="insurance_provided"
            id=""
          >
            <option value="">insurance provided?</option>
            <option value="true">Yes</option>
            <option value="false">NO</option>
          </select>
        </FormRow>

        <FormRow label="preferred communication channel">
          <input
            type="text"
            placeholder="WhatsApp"
            name="preferred_communication_channel"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="response time expectation">
          <input
            type="text"
            placeholder="Within 24 hours"
            name="response_time_expectation"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="auto reminder triggers">
          <input
            type="text"
            placeholder="24"
            name="auto_reminder_triggers"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="custom booking notes">
          <textarea
            name="custom_booking_notes"
            className="w-full rounded-md border border-neutral-700 bg-primary p-4"
            id="full_description"
            placeholder="Bring ID and wear outdoor shoes ..."
            cols={5}
            rows={5}
          ></textarea>
        </FormRow>

        <FormRow label="trade license">
          <input
            type="text"
            placeholder="URL"
            name="trade_license"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="insurance certificate">
          <input
            type="text"
            placeholder="URL"
            name="insurance_certificate"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="id verification">
          <input
            type="text"
            placeholder="URL"
            name="id_verification"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="contract agreement">
          <input
            type="text"
            placeholder="URL"
            name="contract_agreement"
            autoComplete="on"
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          />
        </FormRow>

        <FormRow label="exclusivity confirmed">
          <select
            className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
            name="exclusivity_confirmed"
            id=""
          >
            <option value="">Is exclusivity confirmed?</option>
            <option value="true">Yes</option>
            <option value="false">NO</option>
          </select>
        </FormRow>

        <div className="[grid-column:1/-1]">
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
              <span>{isForApply ? "Submit Application" : "Add Supplier"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
