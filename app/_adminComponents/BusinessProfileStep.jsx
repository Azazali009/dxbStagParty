import React from "react";
import FormRow from "../_components/FormRow";
import { useSupplier } from "../_context/SupplierProvider";

export default function BusinessProfileStep() {
  const { formData, handleChange, setFormData } = useSupplier();
  // handle gallery images
  // const handleImageChange = (index, file) => {
  //   const newImages = [...images];
  //   newImages[index] = file;
  //   setImages(newImages);
  // };
  const handleImageChange = (index, file) => {
    setFormData((prev) => {
      const newImages = [...prev.images]; // copy
      newImages[index] = file; // replace
      return { ...prev, images: newImages };
    });
  };

  // handle add image function
  // const handleAddImage = () => {
  //   setImages([...images, undefined]); // placeholder for next image
  // };
  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, undefined], // add new empty slot
    }));
  };

  // handle remove image function

  // const handleRemoveImage = (index) => {
  //   const newImages = [...images];
  //   newImages.splice(index, 1); // Remove the one at `index`
  //   setImages(newImages);
  // };
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
        <input
          type="text"
          placeholder="English, Arabic, ..."
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          autoComplete="on"
          className="w-full rounded-md border border-neutral-700 bg-primary px-4 py-2"
        />
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
    </>
  );
}
