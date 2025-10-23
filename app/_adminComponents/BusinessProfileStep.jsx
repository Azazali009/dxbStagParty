import React from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";
import Image from "next/image";

export default function BusinessProfileStep({ setDeleteUrls, deleteUrls }) {
  const { formData, handleChange, setFormData } = useSupplier();

  const handleImageChange = (index, file) => {
    setFormData((prev) => {
      const newImages = [...prev.images]; // copy
      newImages[index] = file; // replace
      return { ...prev, images: newImages };
    });
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, undefined], // add new empty slot
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1); // remove selected image
      return { ...prev, images: newImages };
    });
  };

  return (
    <>
      <FormRow label="short description">
        <textarea
          name="short_description"
          className="w-full rounded-md border border-neutral-700 bg-primary p-4"
          id="short_description"
          placeholder="Thrilling desert dune rides"
          cols={5}
          rows={5}
          value={formData.short_description}
          onChange={handleChange}
        ></textarea>
      </FormRow>
      <FormRow label="full description">
        <textarea
          name="full_description"
          value={formData.full_description}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary p-4"
          id="full_description"
          placeholder="We offer fully guided off-road..."
          cols={5}
          rows={5}
        ></textarea>
      </FormRow>

      <FormRow label="business type">
        <select
          name="business_type"
          defaultValue=""
          value={formData.business_type}
          onChange={handleChange}
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="" disabled>
            Select business type
          </option>
          <option value="tour_operator">Tour Operator</option>
          <option value="venue">Venue</option>
          <option value="restaurant_catering">Restaurant / Catering</option>
          <option value="outdoor_adventure">Outdoor Adventure</option>
          <option value="transport">Transport</option>
          <option value="event_planner">Event Planner</option>
          <option value="equipment_rental">Equipment Rental</option>
          <option value="other">Other</option>
        </select>
      </FormRow>

      <FormRow label="locations">
        <input
          type="text"
          value={formData.locations}
          onChange={handleChange}
          placeholder="Dubai, Sharjah, ..."
          name="locations"
          autoComplete="address-level2"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
      </FormRow>
      <FormRow label="languages">
        <select
          name="languages"
          defaultValue={""}
          value={formData.languages}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        >
          <option value="">Choose language</option>
          <option value="english">English</option>
          <option value="arabic">Arabic</option>
          <option value="italian">Italian</option>
          <option value="german">German</option>
        </select>
      </FormRow>

      <FormRow label={"Gallery"}>
        {formData.images?.map((_, index) => (
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
            {formData.images.length > 1 && (
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

      {formData?.oldImages?.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {formData?.oldImages.map((url) => (
            <div key={url} className="relative">
              <Image
                width={100}
                height={100}
                src={url}
                alt="Old Image"
                className="aspect-video rounded border object-cover"
              />
              <button
                type="button"
                className="absolute right-1 top-1 rounded bg-red-600 px-2 py-1 text-xs text-white"
                onClick={() => {
                  setDeleteUrls((prev) =>
                    prev.includes(url)
                      ? prev.filter((u) => u !== url) // unselect if clicked again
                      : [...prev, url],
                  );
                }}
              >
                {deleteUrls.includes(url) ? "Undo" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
