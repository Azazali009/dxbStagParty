import Activities from "@/app/_components/Activities";
import { Spotlight as SpotlightNew } from "../_components/ui/spotlight-new";
import Spinner from "@/app/_components/Spinner";
import AnimatedHeading from "../_components/AnimatedHeading";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="space-y-20 px-2 py-10 antialiased sm:p-6">
      {/* <SpotlightNew /> */}
      <AnimatedHeading className={"text-nowrap text-xl sm:text-wrap"}>
        {" "}
        Epic Stag Do Activities
      </AnimatedHeading>

      <Suspense fallback={<Spinner />}>
        <Activities />
      </Suspense>
    </div>
  );
}
