"use client";
import React, { useState, useRef } from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";
import { createClient } from "../_utils/supabase/client";
import { uploadSingleImageToBucket } from "../_lib/helpers";
import SpinnerMini from "../_components/SpinnerMini";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Insurance() {
  const { formData, setFormData } = useSupplier();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const supabase = createClient();
  const fileInputRef = useRef(null);

  const certifications = formData.insurance_provided || [];

  // 📤 Upload Handler
  async function handleFiles(files) {
    if (!files?.length) return;
    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      if (file.size > 2_000_000) {
        toast.error(`${file.name} is larger than 2 MB`);
        continue;
      }

      const res = await uploadSingleImageToBucket(
        supabase,
        file,
        "supplier-docs",
      );

      if (res?.error) {
        toast.error(`Upload failed for ${file.name}`);
        continue;
      }

      uploadedUrls.push(res.publicUrl);
    }

    setUploading(false);

    if (uploadedUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        insurance_provided: [
          ...(prev.insurance_provided || []),
          ...uploadedUrls,
        ],
      }));
    }
  }

  // 🗂️ Handle Drop Events
  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  // 🧹 Delete Handler
  async function handleDeleteFile(url) {
    setDeleting(true);
    const pathMatch = url.split("/supplier-docs/")[1];
    if (!pathMatch) return;

    const { error } = await supabase.storage
      .from("supplier-docs")
      .remove([pathMatch]);

    setDeleting(false);

    if (error) {
      console.error("Delete failed:", error.message);
      return toast.error("Failed to delete file");
    }

    setFormData((prev) => ({
      ...prev,
      insurance_provided: prev.insurance_provided.filter((u) => u !== url),
    }));
  }

  return (
    <FormRow label="insurance provided">
      <div className="space-y-3">
        {/* Drag & Drop Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative flex flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-8 text-center transition ${
            isDragging
              ? "border-matalicGold bg-neutral-800"
              : "border-neutral-700 bg-primary"
          }`}
        >
          <p className="text-sm text-gray-300">
            Drag & drop your files here or{" "}
            <span
              className="cursor-pointer text-matalicGold underline"
              onClick={() => fileInputRef.current.click()}
            >
              browse
            </span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="application/pdf,image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Uploading Indicator */}
        {uploading && (
          <p className="flex items-center gap-2 text-xs text-yellow-400">
            <SpinnerMini /> Uploading...
          </p>
        )}

        {/* Uploaded Files */}
        {certifications.length > 0 && (
          <ul className="space-y-2">
            {certifications.map((url, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between rounded-md border border-neutral-700 bg-primary px-4 py-2 text-xs"
              >
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline"
                >
                  View Certificate {idx + 1}
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(url)}
                  className="text-red-500 hover:text-red-300"
                >
                  {deleting ? <SpinnerMini /> : "❌"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FormRow>
  );
}
