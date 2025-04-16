"use client";
import Image from "next/image";
import { addActivityAction } from "../_lib/actions";
import plusIcon from "../svgIcons/plus.svg";
import FormRow from "./FormRow";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";
import { useRef, useTransition } from "react";
export default function AdminActivityForm() {
  const [isPending, startTransition] = useTransition();
  const ref = useRef();
  const handleSubmit = (formData) => {
    startTransition(async () => {
      try {
        await addActivityAction(formData);
        toast.success("Activity added successfully!");
        ref.current?.reset();
      } catch (err) {
        toast.error(err?.message);
      }
    });
  };

  return (
    <form
      action={(formData) => handleSubmit(formData)}
      className="grid grid-cols-2 gap-x-16 gap-y-4"
      ref={ref}
    >
      <FormRow label={"Activity Name"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="name"
        />
      </FormRow>
      <FormRow label={"Activity Price"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="number"
          name="price"
        />
      </FormRow>
      <FormRow label={"Activity duration"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="duration"
        />
      </FormRow>
      <FormRow label={"Min Age"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="number"
          name="minAge"
        />
      </FormRow>
      <FormRow label={"Image"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="file"
          name="image"
        />
      </FormRow>
      <FormRow label={"Destinations"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="destinations"
        />
      </FormRow>
      <FormRow label={"Description"}>
        <textarea
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          cols={10}
          rows={8}
          name="description"
        />
      </FormRow>
      <FormRow label={"Group Size"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="group_size"
        />
      </FormRow>
      <FormRow label={"Tags"}>
        <input
          className="rounded bg-navyBlue p-2 outline-none focus:outline-matalicGold"
          type="text"
          name="tags"
          title="split by commas"
          placeholder="Glam,Beauty,Instagrammable,Photo,Luxury..."
        />
      </FormRow>
      <div className="[grid-column:1/-1]">
        <SubmitButton>
          <Image src={plusIcon} width={20} height={20} alt="add" />
          <span> add activity</span>
        </SubmitButton>
      </div>
    </form>
  );
}
