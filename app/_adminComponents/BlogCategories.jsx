import { getBlogCategories } from "../_lib/blogApi";
import BlogCategoriesTable from "./BlogCategoriesTable";

export default async function BlogCategories() {
  const categories = await getBlogCategories();

  return <BlogCategoriesTable categories={categories} />;
}
