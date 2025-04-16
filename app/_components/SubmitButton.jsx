"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "../_components/SpinnerMini";
export default function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex items-center rounded bg-black px-6 py-2.5 capitalize duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          {" "}
          <SpinnerMini /> <span>creating...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
