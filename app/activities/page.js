import Activities from "@/app/_components/Activities";
import { Spotlight as SpotlightNew } from "../_components/ui/spotlight-new";
import Spinner from "@/app/_components/Spinner";
import AnimatedHeading from "../_components/AnimatedHeading";
import { Suspense } from "react";

export const revalidate = 0;
export default async function Page() {
  return (
    <div className="min-h-screen space-y-20 px-2 antialiased sm:p-6">
      {/* <SpotlightNew /> */}
      <AnimatedHeading className={"text-nowrap py-16 text-xl sm:text-wrap"}>
        {" "}
        Epic Stag Do Activities
      </AnimatedHeading>

      <Suspense fallback={<Spinner />}>
        <Activities />
      </Suspense>
    </div>
  );
}
