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
      <div className="flex items-center divide-x divide-gray-800 rounded-sm border border-gray-800">
        <button
          onClick={() => handleFilter("all")}
          className={`px-5 ${activeFilter === "all" && "bg-navyBlue text-white"} py-2 capitalize duration-300 hover:bg-navyBlue hover:text-white`}
        >
          all
        </button>
        <button
          onClick={() => handleFilter("completed")}
          className={`px-5 ${activeFilter === "completed" && "bg-navyBlue text-white"} py-2 capitalize duration-300 hover:bg-navyBlue hover:text-white`}
        >
          completed
        </button>
        <button
          onClick={() => handleFilter("pending")}
          className={`px-5 ${activeFilter === "pending" && "bg-navyBlue text-white"} py-2 capitalize duration-300 hover:bg-navyBlue hover:text-white`}
        >
          pending
        </button>
        <button
          onClick={() => handleFilter("cancelled")}
          className={`px-5 ${activeFilter === "cancelled" && "bg-navyBlue text-white"} py-2 capitalize duration-300 hover:bg-navyBlue hover:text-white`}
        >
          cancelled
        </button>
      </div>
    </div>
  );
}
