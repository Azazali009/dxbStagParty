import ActivityFilters from "../_components/ActivityFilters";
import ActivityHeroSection from "../_components/ActivityHeroSection";
import AdrenalineActivities from "../_components/AdrenalineActivities";
import Competitive from "../_components/Competitive";
import FoodDrink from "../_components/FoodDrink";
import ThemeEvents from "../_components/ThemeEvents";
import ChillRecovery from "../_components/ChillRecovery";
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

  if (!ActivitiesArray || ActivitiesArray.length === 0)
    return <Empty name="Activities" />;
  return (
    <div className="mx-auto min-h-screen w-full antialiased">
      <ActivityHeroSection />

      <ActivityFilters />
      <VipSpotLight />
      <AdrenalineActivities category={"adrenaline"} />
      <Competitive category={"competitive"} />
      <FoodDrink category={"food-&-drink"} />
      <ThemeEvents category={"theme-events"} />
      <ChillRecovery category={"chill-&-luxe"} />
    </div>
  );
}
