"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BookingFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("paymentStatus") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("paymentStatus", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex justify-end">
      <div className="flex items-center divide-x divide-gray-300 rounded-sm border border-gray-300">
        <button
          onClick={() => handleFilter("all")}
          className={`px-5 ${activeFilter === "all" && "bg-tertiary text-white"} py-2 capitalize duration-300 hover:bg-tertiary hover:text-white`}
        >
          all
        </button>
        <button
          onClick={() => handleFilter("confirmed")}
          className={`px-5 ${activeFilter === "confirmed" && "bg-tertiary text-white"} py-2 capitalize duration-300 hover:bg-tertiary hover:text-white`}
        >
          Confirmed
        </button>
        <button
          onClick={() => handleFilter("pending")}
          className={`px-5 ${activeFilter === "pending" && "bg-tertiary text-white"} py-2 capitalize duration-300 hover:bg-tertiary hover:text-white`}
        >
          pending
        </button>
        <button
          onClick={() => handleFilter("cancelled")}
          className={`px-5 ${activeFilter === "cancelled" && "bg-tertiary text-white"} py-2 capitalize duration-300 hover:bg-tertiary hover:text-white`}
        >
          cancelled
        </button>
      </div>
    </div>
  );
}
