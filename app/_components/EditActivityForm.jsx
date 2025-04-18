"use client";
import { useRef, useTransition } from "react";
import { editActivityAction } from "../_lib/actions";
import FormRow from "./FormRow";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";

export default function EditActivityForm({ activity }) {
  const {
    id,
    name,
    minAge,
    duration,
    price,
    destinations,
    description,
    group_size,
    tags,
    image,
  } = activity;
  const [isPending, startTransition] = useTransition();
  const editFormRef = useRef();
  const handleSubmit = (formData) => {
    startTransition(async () => {
      try {
        await editActivityAction(formData);
        toast.success("Activity updated successfully!");
        editFormRef.current?.reset();
      } catch (err) {
        console.log(err);
        toast.error(err?.message);
      }
    });
  };
  return (
    <form
      ref={editFormRef}
      // action={editActivityAction}
      action={(formData) => handleSubmit(formData)}
      className="grid grid-cols-2 gap-x-16 gap-y-4"
    >
      <FormRow label={"Activity Name"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="name"
          defaultValue={name}
        />
      </FormRow>
      <FormRow label={"Activity Price"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="number"
          name="price"
          defaultValue={price}
        />
      </FormRow>
      <FormRow label={"Activity duration"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="duration"
          defaultValue={duration}
        />
      </FormRow>
      <FormRow label={"Min Age"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="number"
          name="minAge"
          defaultValue={minAge}
        />
      </FormRow>
      <FormRow label={"Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="file"
          name="image"
        />
      </FormRow>
      <input type="hidden" name="existingImage" value={image} />
      <FormRow label={"Destinations"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="destinations"
          defaultValue={destinations}
        />
      </FormRow>
      <FormRow label={"Description"}>
        <textarea
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          cols={10}
          rows={8}
          name="description"
          defaultValue={description}
        />
      </FormRow>
      <FormRow label={"Group Size"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="group_size"
          defaultValue={group_size}
        />
      </FormRow>
      <FormRow label={"Tags"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="tags"
          title="split by commas"
          placeholder="Glam,Beauty,Instagrammable,Photo,Luxury..."
          defaultValue={tags}
        />
      </FormRow>
      <input type="hidden" name="activityId" value={id} />
      <div className="[grid-column:1/-1]">
        <button
          className="flex items-center gap-2 rounded bg-black/80 px-6 py-2.5 capitalize duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <SpinnerMini /> <span>updating...</span>
            </div>
          ) : (
            "update activity"
          )}
        </button>
      </div>
    </form>
  );
}
