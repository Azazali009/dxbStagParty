"use client";
export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <p>{error.message}</p>
      <button
        className="block rounded bg-red-500 px-6 py-2.5 capitalize text-softGold duration-300 hover:translate-y-[2px]"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
