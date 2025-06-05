import React from "react";
import { playfairDisplay } from "../layout";
import FormRow from "./FormRow";
import { preferredDatesArr } from "../_lib/helpers";
export default function ContactForm() {
  return (
    <div className="relative z-30 mx-auto flex flex-col items-center justify-center gap-3 px-4 py-10 sm:max-w-[70%] sm:gap-6 md:px-0 md:py-0">
      <h2
        className={`${playfairDisplay.className} text-center text-3xl font-semibold capitalize xs:text-4xl`}
      >
        send an enquiry
      </h2>
      <p className="text-center text-xs font-light leading-[1.5] xs:text-base sm:w-[60%]">
        Tell us a little about your dream stag - we will get back fast.
      </p>
      <form
        action=""
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-4 text-sm sm:gap-x-10 md:mt-0"
      >
        <FormRow label="First Name">
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            placeholder="Jhon"
            className="h-8 rounded-md border border-neutral-700 bg-transparent px-3 focus:outline-none focus:outline-matalicGold"
          />
        </FormRow>
        <FormRow label="Last Name">
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Doe"
            required
            className="h-8 rounded-md border border-neutral-700 bg-transparent px-3 focus:outline-none focus:outline-matalicGold"
          />
        </FormRow>
        <FormRow label="Email address">
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="jhondoe@example.com"
            autoComplete="email"
            className="h-8 rounded-md border border-neutral-700 bg-transparent px-3 focus:outline-none focus:outline-matalicGold"
          />
        </FormRow>
        <FormRow label="whatsapp number(optional)">
          <input
            type="text"
            name="whatsapp"
            id="whatsapp"
            autoComplete="tel"
            placeholder="+97123456789"
            className="h-8 rounded-md border border-neutral-700 bg-transparent px-3 focus:outline-none focus:outline-matalicGold"
          />
        </FormRow>
        <FormRow label="Group Size">
          <input
            type="text"
            name="groupSize"
            placeholder="4-10"
            id="groupSize"
            className="h-8 rounded-md border border-neutral-700 bg-transparent px-3 focus:outline-none focus:outline-matalicGold"
          />
        </FormRow>
        <FormRow label="preferred dates">
          <input
            type="date"
            name="prefferedDates"
            className="h-8 rounded-md border border-neutral-700 bg-transparent px-3 focus:outline-none focus:outline-matalicGold"
          />
        </FormRow>
        <FormRow label="where are you based?">
          <select
            className="h-8 rounded-md border border-neutral-700 bg-transparent px-3 backdrop-blur focus:outline-none focus:outline-matalicGold"
            name="based"
            id="based"
          >
            {preferredDatesArr.map((date) => (
              <option className="bg-navyBlue" key={date.id} value={date.value}>
                {date.name}
              </option>
            ))}
          </select>
        </FormRow>
        <FormRow label="what are you ineterested in?">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="interested"
              className="size-4 accent-matalicGold"
              id="interested"
            />
            <label> Yacht Party</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="interested"
              className="size-4 accent-matalicGold"
              id="interested"
            />
            <label> Night</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="interested"
              className="size-4 accent-matalicGold"
              id="interested"
            />
            <label> Adrenaline</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="interested"
              className="size-4 accent-matalicGold"
              id="interested"
            />
            <label> Full Weekend</label>
          </div>
        </FormRow>
        <button className="block rounded-md border border-neutral-700 bg-transparent px-6 py-2.5 text-base font-medium capitalize backdrop-blur-sm duration-300 [grid-column:1/-1] hover:scale-95">
          send message
        </button>
      </form>
    </div>
  );
}
