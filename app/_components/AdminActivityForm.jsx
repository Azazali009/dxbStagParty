import React from "react";
import FormRow from "./FormRow";
import { addActivityAction } from "../_lib/actions";

export default function AdminActivityForm() {
  return (
    <form
      action={addActivityAction}
      className="grid grid-cols-2 gap-x-16 gap-y-4"
    >
      <FormRow label={"Activity Name"}>
        <input type="text" name="name" />
      </FormRow>
      <FormRow label={"Activity Price"}>
        <input type="number" name="price" />
      </FormRow>
      <FormRow label={"Activity duration"}>
        <input type="text" name="duration" />
      </FormRow>
      <FormRow label={"Min Age"}>
        <input type="number" name="minAge" />
      </FormRow>
      <FormRow label={"Image"}>
        <input type="file" name="image" />
      </FormRow>
      <FormRow label={"Destinations"}>
        <input type="text" name="destinations" />
      </FormRow>
      <FormRow label={"Description"}>
        <input type="text" name="description" />
      </FormRow>
      <FormRow label={"Group Size"}>
        <input type="text" name="group_size" />
      </FormRow>
      <FormRow label={"Tags"}>
        <input
          type="text"
          name="tags"
          title="split by commas"
          placeholder="Glam,Beauty,Instagrammable,Photo,Luxury..."
        />
      </FormRow>
      <button type="submit">add activity</button>
    </form>
  );
}
