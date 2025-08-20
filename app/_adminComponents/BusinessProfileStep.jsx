import React from "react";
import FormRow from "../_components/FormRow";

export default function BusinessProfileStep({ images, setImages }) {
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
    </>
  );
}
