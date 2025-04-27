"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "../_components/SpinnerMini";
export default function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex h-10 items-center gap-2 rounded bg-sky-700 px-6 font-light capitalize tracking-wide duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
