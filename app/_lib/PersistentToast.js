import toast from "react-hot-toast";

export function PersistentToast(message) {
  toast.custom(
    (t) => (
      <div className="flex w-full max-w-sm items-center justify-between rounded bg-white px-4 py-2 text-black shadow">
        <span>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 text-xl font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#dc2626"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-red-600 transition duration-200 group-hover:rotate-3 group-hover:scale-125"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    ),
    {
      duration: Infinity,
    },
  );
}
