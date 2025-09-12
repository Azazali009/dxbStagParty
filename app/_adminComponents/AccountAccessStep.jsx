import React, { useEffect, useState } from "react";
import FormRow from "../_components/FormRow";
import EyeIcon from "../svgIcons/EyeIcon";
import { MultiSelect } from "react-multi-select-component";
import { useSupplier } from "../_context/SupplierProvider";

export default function AccountAccessStep({ supplier }) {
  const [passwordTye, setPasswordType] = useState("password");
  const {
    formData,
    handleChange,
    activities,
    loading,
    setSelectedActivities,
    selectedActivities,
  } = useSupplier();

  useEffect(() => {
    if (supplier?.activityIds?.length > 0 && activities?.length > 0) {
      const preselected = activities.filter((act) =>
        supplier.activityIds.includes(act.value),
      );
      setSelectedActivities(preselected);
    }
  }, [supplier, activities, setSelectedActivities]);

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
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
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
      {loading ? (
        <div className="my-4 flex flex-col gap-4">
          <div className="h-4 w-[50%] animate-pulse rounded-xl bg-navyBlue"></div>
          <div className="h-4 w-full animate-pulse rounded-xl bg-navyBlue"></div>
        </div>
      ) : (
        <FormRow label={"Add Activities"}>
          {/* <MultiSelect
            options={activities}
            value={selectedActivities} // Keep it controlled
            onChange={(selected) => {
              setSelectedActivities([...selected]); // Ensure state update happens outside of render
            }}
            labelledBy="Add Activities"
            className="custom-multi-select"
            hasSelectAll={false}
          /> */}
          <MultiSelect
            options={activities}
            value={selectedActivities} // Controlled input
            onChange={(selected) => {
              setSelectedActivities([...selected]); // Ensure state update happens outside of render
            }}
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
            value={formData.password}
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
    </>
  );
}
