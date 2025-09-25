import Image from "next/image";
import Button from "../../../_components/Button";
import { getBlogsByCategoryId } from "../../../_lib/blogApi";
import { getCategories } from "@/app/_lib/categoryApi";

export async function generateStaticParams() {
  const categories = await getCategories();
  const ids = categories.map((cat) => ({
    categoryId: String(cat.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const { categoryId } = params;
  const blogs = await getBlogsByCategoryId(categoryId);

  return (
    <div className="mx-auto grid w-[95%] grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {blogs?.map((blog) => {
        return (
          <div key={blog.id} className="space-y-4">
            <Image
              src={blog.image}
              className="aspect-square rounded-md bg-navyBlue object-cover"
              width={500}
              height={500}
              alt={blog.name}
            />
            <h2 className="text-2xl font-semibold text-matalicGold">
              {blog.name}
            </h2>
            <p>{blog.description}</p>
            <Button
              className={"w-fit py-2"}
              variation="gold"
              href={`/blog/${blog.id}`}
            >
              Read more
            </Button>
          </div>
        );
      })}
    </div>
  );
}
