import ActivityFilters from "../_components/ActivityFilters";
import ActivityHeroSection from "../_components/ActivityHeroSection";
import AdrenalineActivities from "../_components/AdrenalineActivities";
import Competitive from "../_components/Competitive";
import FoodDrink from "../_components/FoodDrink";
import Empty from "../_components/Empty";
import VipSpotLight from "../_components/VipSpotLight";
import { getActivities } from "../_lib/data-services";

export const metadata = {
  title: "Activities | DXB Stag party",
};

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const searchQuery = searchParams?.search ?? "all";
  const groupSize = Number(searchParams?.groupSize ?? 0);

  const ActivitiesArray = await getActivities();
  if (!ActivitiesArray) return <Empty />;
  return (
    <div className="mx-auto min-h-screen w-full antialiased">
      <ActivityHeroSection />

      <ActivityFilters searchQuery={searchQuery} groupSize={groupSize} />
      {/* section 1 */}
      <VipSpotLight />
      {/* section 2 */}
      <AdrenalineActivities category={"Adrenaline"} />
      <Competitive category={"VIP"} />
      <FoodDrink category={"VIP"} />
      {/* section 3 */}
      {/* <BigEnergy ActivitiesArray={ActivitiesArray} /> */}
      {/* section 4 */}
      {/* <ChilAndLuxeActivity category={"Chill & Luxe"} />
      <HomeAndVillaActivities ActivitiesArray={ActivitiesArray} /> */}
    </div>
  );
}
