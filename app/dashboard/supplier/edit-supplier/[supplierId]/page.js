import EditSupplierForm from "../../../../_adminComponents/EditSupplierForm";
import { getSupplierById } from "../../../../_lib/apiSupplier";

export default async function Page({ params }) {
  const { supplierId } = params;
  const supplier = await getSupplierById(supplierId);

  return <EditSupplierForm supplier={supplier} />;
}
