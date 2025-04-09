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
      <FormRow label={"Min Age"}>
        <input type="file" name="image" />
      </FormRow>
      <button type="submit">add activity</button>
    </form>
  );
}
