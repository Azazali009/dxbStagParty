import { Suspense } from "react";
import AdminStats from "../_components/AdminStats";
import Spinner from "../_components/Spinner";
export default async function page() {
  return (
    <div className="">
      <Suspense fallback={<Spinner />}>
        <AdminStats />
      </Suspense>
    </div>
  );
}
