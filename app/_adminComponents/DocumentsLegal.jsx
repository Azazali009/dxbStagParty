"use client";
import React, { useState } from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";
import { createClient } from "../_utils/supabase/client";
import { uploadSingleImageToBucket } from "../_lib/helpers";
import SpinnerMini from "../_components/SpinnerMini";
import toast from "react-hot-toast";
import Link from "next/link";

export default function DocumentsLegal() {
  const { formData, setFormData } = useSupplier();
  const [uploading, setUploading] = useState({});
  const [deleting, setDeleting] = useState(false);
  const supabase = createClient();

  // 📤 Upload handler
  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (file?.size > 2000000) return toast.error("File must be less than 2 MB");

    const fieldName = e.target.name;
    if (!file) return;

    setUploading((prev) => ({ ...prev, [fieldName]: true }));

    const res = await uploadSingleImageToBucket(
      supabase,
      file,
      "supplier-docs",
    );

    setUploading((prev) => ({ ...prev, [fieldName]: false }));

    if (res?.error) {
      toast.error(`Upload failed for ${fieldName}: ${res.error.message}`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: res.publicUrl,
    }));
  }

  // 🗑 Delete handler
  async function handleDeleteFile(fieldName) {
    setDeleting(true);
    const fileUrl = formData[fieldName];
    if (!fileUrl) return;

    const pathMatch = fileUrl.split("/supplier-docs/")[1];
    if (!pathMatch) return;

    const { error } = await supabase.storage
      .from("supplier-docs")
      .remove([pathMatch]);

    setDeleting(false);

    if (error) {
      console.error(`Failed to delete ${fieldName}:`, error.message);
      return toast.error("Failed to delete file. Try again.");
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  }

  // Helper: Check if URL is valid and not placeholder
  const isValidUrl = (url) => {
    if (!url) return false;
    // ignore if it’s a base domain without file path
    if (url === "https://dxbstagparties.com" || url.endsWith(".com"))
      return false;
    return url.startsWith("http") && url.includes("/supplier-docs/");
  };

  return (
    <>
      {[
        { label: "Trade License", name: "trade_license" },
        { label: "Insurance Certificate", name: "insurance_certificate" },
        { label: "ID Verification", name: "id_verification" },
        { label: "Contract Agreement", name: "contract_agreement" },
      ].map((doc) => {
        const fileUrl = formData[doc.name];
        const hasValidFile = isValidUrl(fileUrl);

        return (
          <FormRow key={doc.name} label={doc.label}>
            {!hasValidFile ? (
              <>
                <input
                  type="file"
                  name={doc.name}
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
                />
                {uploading[doc.name] && (
                  <p className="mt-1 text-xs text-yellow-400">Uploading...</p>
                )}
              </>
            ) : (
              <div className="flex items-center justify-between rounded-md border border-neutral-700 bg-primary px-4 py-2">
                <Link
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-400 underline"
                >
                  View Uploaded File
                </Link>
                <button
                  onClick={() => handleDeleteFile(doc.name)}
                  type="button"
                  className="text-sm text-red-500 hover:text-red-300"
                >
                  {deleting ? <SpinnerMini /> : "❌"}
                </button>
              </div>
            )}
          </FormRow>
        );
      })}

      <FormRow label="Exclusivity Confirmed">
        <input
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
          name="exclusivity_confirmed"
          placeholder="Confirm your exclusivity"
          value={formData.exclusivity_confirmed || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              exclusivity_confirmed: e.target.value,
            }))
          }
        />
      </FormRow>
    </>
  );
}
