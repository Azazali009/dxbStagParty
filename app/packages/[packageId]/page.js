import PackageCTA from "../../_components/PackageCTA";
import PackageDetailSection from "../../_components/PackageDetailSection";
import PackageHero from "../../_components/PackageHero";
import PackageSupport from "../../_components/PackageSupport";
import { getCurrentUser } from "../../_lib/getCurrentUser";
import { getPackageById, getPackages } from "../../_lib/packagesApi";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const Package = await getPackageById(params.packageId);

  return { title: `Package - ${Package.name}` };
}

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
