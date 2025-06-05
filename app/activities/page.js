import Image from "next/image";
import Link from "next/link";
import ActivityFilters from "../_components/ActivityFilters";
import ActivityHeroSection from "../_components/ActivityHeroSection";
import AdrenalineActivities from "../_components/AdrenalineActivities";
import ChilAndLuxeActivity from "../_components/ChilAndLuxeActivity";
import HomeAndVillaActivities from "../_components/HomeAndVillaActivities";
import { getActivities } from "../_lib/data-services";
import { BebasNeue } from "../layout";
import VipSpotLight from "../_components/VipSpotLight";
import BigEnergy from "../_components/BigEnergy";

export const metadata = {
  title: "Activities | DXB Stag party",
};

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const searchQuery = searchParams?.search ?? "all";
  const groupSize = Number(searchParams?.groupSize ?? 0);

  const ActivitiesArray = await getActivities();

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] antialiased">
      <ActivityHeroSection />

      <ActivityFilters searchQuery={searchQuery} groupSize={groupSize} />
      {/* section 1 */}
      <VipSpotLight />
      {/* section 2 */}
      <AdrenalineActivities category={"Adrenaline"} />
      {/* section 3 */}
      <BigEnergy ActivitiesArray={ActivitiesArray} />
      {/* section 4 */}
      <ChilAndLuxeActivity category={"Chill & Luxe"} />
      <HomeAndVillaActivities ActivitiesArray={ActivitiesArray} />
    </div>
  );
}
