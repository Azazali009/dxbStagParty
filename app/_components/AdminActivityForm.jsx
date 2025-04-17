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
        console.log(err);
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
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="name"
          placeholder="desert dune buggy..."
        />
      </FormRow>
      <FormRow label={"Activity Price"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="number"
          name="price"
          placeholder="1000"
        />
      </FormRow>
      <FormRow label={"Activity duration"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="duration"
          placeholder="2hr"
        />
      </FormRow>
      <FormRow label={"Min Age"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="number"
          name="minAge"
          placeholder="18"
        />
      </FormRow>
      <FormRow label={"Image"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="file"
          name="image"
        />
      </FormRow>
      <FormRow label={"Destinations"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="destinations"
          placeholder="dubai"
        />
      </FormRow>
      <FormRow label={"Description"}>
        <textarea
          className="rounded bg-navyBlue p-2 outline-none placeholder:text-matalicGold/20 focus:outline-matalicGold"
          cols={10}
          rows={8}
          name="description"
          placeholder="description"
        />
      </FormRow>
      <FormRow label={"Group Size"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
          type="text"
          name="group_size"
          placeholder="4-10"
        />
      </FormRow>
      <FormRow label={"Tags"}>
        <input
          className="h-10 rounded bg-navyBlue p-2 outline-none placeholder:text-sm placeholder:text-softGold/20 focus:outline-matalicGold"
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
