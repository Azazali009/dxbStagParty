"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getActivities } from "../_lib/data-services";
import { DAYS } from "../_lib/helpers";

const SupplierContext = createContext();

export default function SupplierProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  //   const [images, setImages] = useState([undefined]);
  //   const [bankDetails, setBankDetails] = useState({ bank: "", iban: "" });
  const [range, setRange] = useState();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    // bankDetails: { bank: "", iban: "" },
    images: [undefined],
    short_description: "",
    business_type: "",
    locations: "",
    languages: "",
    available_hours: "",
    lead_time_required: "",
    min_group_size: 0,
    max_group_size: 0,
    booking_method: "",
    location_type: "",
    base_price: 0,
    discounted_price: 0,
    deposit_required: null,
    cancellation_terms: "",
    commission_agreement: "",
    payment_preferences: "",
    activity_tags: "",
    mobility_requirements: "",
    minimum_age: 0,
    alcohol_included: null,
    media_friendly: null,
    insurance_provided: null,
    preferred_communication_channel: "",
    response_time_expectation: "",
    auto_reminder_triggers: "",
    custom_booking_notes: "",
    trade_license: "",
    insurance_certificate: "",
    id_verification: "",
    contract_agreement: "",
    exclusivity_confirmed: null,
  });
  const [hours, setHours] = useState(
    formData.available_hours
      ? JSON.parse(formData.available_hours)
      : Object.fromEntries(
          DAYS.map((d) => [d.key, { open: false, start: "", end: "" }]),
        ),
  );

  const handleChange = (e) => {
    const { name, type, value, checked, multiple, options } = e.target;

    let newValue;

    if (multiple) {
      // agar multiple select hai → sab selected options array banao
      newValue = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
    } else if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // fetch all activities
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);

      try {
        const activities = await getActivities();
        setActivities(
          activities?.map((act) => ({
            label: act.name,
            value: act.id,
          })),
        );
        setLoading(false);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setFormData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchActivities();
  }, []);

  // Jab supplier ka data load ho, hours ko set karo
  useEffect(() => {
    if (formData?.available_hours) {
      try {
        setHours(JSON.parse(formData.available_hours));
      } catch (e) {
        console.error("Invalid available_hours JSON", e);
      }
    }
  }, [formData?.available_hours]);

  return (
    <SupplierContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        loading,
        activities,
        setActivities,
        selectedActivities,
        setSelectedActivities,
        setLoading,
        range,
        setRange,
        hours,
        setHours,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}

export function useSupplier() {
  const context = useContext(SupplierContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
