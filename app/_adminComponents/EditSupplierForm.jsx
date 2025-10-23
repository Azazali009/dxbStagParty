import SupplierForm from "./SupplierForm";

export default function EditSupplierForm({ supplier }) {
  return (
    <div className="flex flex-col gap-6 px-4 py-14">
      <h1 className="text-3xl font-semibold">Update supplier</h1>

      <SupplierForm editId={supplier?.user_id} />
    </div>
  );
}
