import React from "react";
import { getPackageById } from "../../../../_lib/packagesApi";
import EditPackageForm from "../../../../_adminComponents/EditPackageForm";
export default async function Page({ params }) {
  const { packageId } = params;
  const Package = await getPackageById(packageId);

  return (
    <div>
      <EditPackageForm Package={Package} />
    </div>
  );
}
