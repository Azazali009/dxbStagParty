import React, { useEffect, useState } from "react";
import FormRow from "../_components/FormRow";
import EyeIcon from "../svgIcons/EyeIcon";
import { MultiSelect } from "react-multi-select-component";
import { useSupplier } from "../_context/SupplierProvider";
import { createClient } from "../_utils/supabase/client";
import toast from "react-hot-toast";

export default function AccountAccessStep({ supplier, isEdit }) {
  const [activityLoading, setActivityLoading] = useState(false);
  const supabase = createClient();
  const [passwordTye, setPasswordType] = useState("password");
  const {
    formData,
    setAvatar,
    handleChange,
    activities,
    loading,
    setSelectedActivities,
    selectedActivities,
  } = useSupplier();

  // 🔹 Fetch supplier's currently assigned activities
  useEffect(() => {
    const fetchAssignedActivities = async () => {
      if (!supplier?.user_id || activities.length === 0) return;

      const { data, error } = await supabase
        .from("activities")
        .select("id")
        .eq("userId", supplier.user_id);

      if (error) {
        console.error("Error fetching supplier activities:", error);
        return;
      }

      // mark those as selected in dropdown
      const assigned = activities.filter((act) =>
        data.some((a) => a.id === act.value),
      );
      setSelectedActivities(assigned);
    };

    fetchAssignedActivities();
  }, [supplier?.user_id, activities, setSelectedActivities, supabase]);

  // 🔹 Handle dropdown changes
  const handleActivityChange = async (selected) => {
    setActivityLoading(true);
    setSelectedActivities(selected);

    const selectedIds = selected.map((s) => s.value);

    try {
      // 1️⃣ Unassign all activities currently owned by this supplier
      await supabase
        .from("activities")
        .update({ userId: null })
        .eq("userId", supplier.user_id);

      // 2️⃣ Assign selected activities to this supplier
      if (selectedIds.length > 0) {
        await supabase
          .from("activities")
          .update({ userId: supplier.user_id, supplier: supplier.user_id })
          .in("id", selectedIds);
      }

      toast.success("Supplier activities updated successfully");
    } catch (error) {
      toast.error("Error updating supplier activities:");
    } finally {
      setActivityLoading(false);
    }
  };
  return (
    <>
      <FormRow label="Supplier Name">
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>
      <FormRow label="Email">
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isEdit}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:opacity-70"
        />
      </FormRow>
      <FormRow label="Phone">
        <input
          type="tel"
          placeholder="+01234...."
          name="phone"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>
      {loading || activityLoading ? (
        <div className="my-4 flex flex-col gap-4">
          <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
          <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
        </div>
      ) : (
        <FormRow label={"Add Activities"}>
          <MultiSelect
            key={JSON.stringify(selectedActivities)}
            options={activities}
            value={selectedActivities} // Controlled input
            onChange={handleActivityChange}
            labelledBy="Add Activities"
            className="custom-multi-select"
            hasSelectAll={false}
          />
        </FormRow>
      )}

      <FormRow label="Password">
        <div className="relative">
          <input
            type={passwordTye}
            placeholder="******"
            name="password"
            value={formData?.password}
            onChange={handleChange}
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
      <FormRow label={"Photo"}>
        <input
          type="file"
          name="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>
    </>
  );
}
