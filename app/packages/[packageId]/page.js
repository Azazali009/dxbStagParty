import AnimatedHeading from "../../_components/AnimatedHeading";
import PackageAddons from "../../_components/PackageAddons";
import RelatedPackages from "../../_components/RelatedPackages";
import Divider from "../../_components/Divider";
import { getPackages } from "../../_lib/packagesApi";
import { getPackageById } from "../../_lib/packagesApi";
import Image from "next/image";
import PackageHero from "../../_components/PackageHero";
import PackageDetailSection from "../../_components/PackageDetailSection";
import PackageSupport from "../../_components/PackageSupport";
import PackageCTA from "../../_components/PackageCTA";
import { getCurrentUser } from "../../_lib/getCurrentUser";

export const revalidate = 0;
export async function generateStaticParams() {
  const packages = await getPackages();
  const ids = packages.map((pack) => ({
    bookingID: String(pack.id),
  }));

  return ids;
}
export default async function Page({ params }) {
  const Package = await getPackageById(params.packageId);
  const user = await getCurrentUser();
  return (
    <div className="mx-auto flex flex-col justify-center">
      <PackageHero Package={Package} />

      <PackageDetailSection Package={Package} user={user} />
      <PackageSupport Package={Package} />
      <PackageCTA />
    </div>
  );
}
