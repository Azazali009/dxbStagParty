"use client";
import DeleteUser from "../_components/DeleteUser";
import { useSupabaseSubscription } from "../_hooks/useSupabaseSubscription";
import EditSupplier from "./EditSupplier";

export default function SupplierRow({ supplier }) {
  useSupabaseSubscription({ table: "supplier", filterKey: supplier.id });
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      <p>#{supplier.id?.split("-")[0]}</p>
      <p>{supplier.fullName} </p>
      <p>{supplier.phone} </p>
      {/* <p>{supplier.activities.name}</p> */}
      <p>{supplier.email}</p>
      <p></p>
      <div className="flex items-center gap-2">
        <DeleteUser email={supplier.email} userId={supplier.id} />
        <EditSupplier supplierId={supplier.id} />
        {/* <Link
          href={`/dashboard/users/edit-user/${supplier.id}`}
          className="fill-blue-500 hover:opacity-80"
        >
          <PencilIcon />
        </Link> */}
      </div>
    </div>
  );
}
