"use client";
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
