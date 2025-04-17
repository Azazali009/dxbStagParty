import { editActivityAction } from "../_lib/actions";
import FormRow from "./FormRow";
import SubmitButton from "./SubmitButton";

export default async function EditActivityForm({ activity }) {
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

  return (
    <form
      action={editActivityAction}
      //   action={(formData) => handleSubmit(formData)}
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
        <SubmitButton>
          <span> edit activity</span>
        </SubmitButton>
      </div>
    </form>
  );
}
