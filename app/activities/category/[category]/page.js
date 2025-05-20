import CategoryChunkLayout from "../../../_components/CategoryChunkLayout";
import CategoryHero from "../../../_components/CategoryHero";
import Empty from "../../../_components/Empty";
import {
  getActivities,
  getActivitiesByCategory,
} from "../../../_lib/data-services";

export const revalidate = 0;

export async function generateStaticParams() {
  const activities = await getActivities();
  const uniqueCategories = [
    ...new Set(activities.map((a) => String(a.category.name))),
  ];
  return uniqueCategories.map((category) => ({ category }));
}

export default async function Page({ params }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const activities = await getActivitiesByCategory(decodedCategory);

  const categoryImage = activities[0]?.category?.image;
  const categoryName = activities[0]?.category?.name;

  if (!activities.length) return <Empty name={"Activities"} />;

  // Chunk the activities into batches of 5
  const chunks = [];
  for (let i = 0; i < activities.length; i += 5) {
    chunks.push(activities.slice(i, i + 5));
  }

  return (
    <section className="-mt-[110px]">
      {/* Hero Section */}
      <CategoryHero categoryImage={categoryImage} categoryName={categoryName} />
      <CategoryChunkLayout activities={activities} />
    </section>
  );
}
