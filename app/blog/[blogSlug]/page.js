import Image from "next/image";
import BlogSidebar from "../../_components/BlogSidebar";
import SocialShare from "../../_components/SocialShare";
import { getBlogBySlug, getBlogCategories, getBlogs } from "../../_lib/blogApi";
import { formatDateTime, sanitizeHtml } from "../../_lib/helpers";
import { cinzel } from "../../layout";

// revalidation
export const revalidate = 0;

// meta data
// export const metadata = {
//   title: "DXB Stag Party - Home",
// };

export async function generateMetadata({ params }) {
  const { blogSlug } = params;
  const { name } = await getBlogBySlug(blogSlug);

  return { title: `Blog - ${name}` };
}

// generate static params
export async function generateStaticParams() {
  const blogs = await getBlogs();
  const slugs = blogs.map((curBlog) => ({
    blogSlug: String(curBlog.slug),
  }));

  return slugs;
}

export default async function Page({ params }) {
  const { blogSlug } = params;
  const blog = await getBlogBySlug(blogSlug);
  const { name, blogCategories, image, blogContent, users } = blog;
  const categories = await getBlogCategories();
  const safeHtml = sanitizeHtml(blogContent);

  return (
    <div className=" ">
      <div className="relative flex min-h-[400px] items-center justify-center md:min-h-[700px]">
        {/* overlay */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent via-black/50 to-primary"></div>
        <Image src={image} fill alt={name} className="object-cover" />
        <h1
          className={`relative ${cinzel.className} z-10 text-center text-3xl font-bold capitalize text-matalicGold xs:text-4xl sm:text-7xl`}
        >
          {name}
        </h1>
        <div className="absolute left-8 top-8 w-fit animate-bounce rounded-bl-full rounded-tr-full bg-matalicGold px-6 py-2.5 font-semibold capitalize text-navyBlue">
          {blogCategories.name}
        </div>
      </div>

      <div className="mx-auto mb-4 mt-6 flex w-[95%] flex-wrap items-end justify-center gap-6 py-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 xs:text-base">
          <span>Created at:</span>
          <span>{formatDateTime(blog.created_at)}</span>
        </div>
        <SocialShare
          title={name}
          url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogSlug}`}
        />
      </div>

      <div className="relative mx-auto grid w-[95%] grid-cols-[1fr_0.5rem] items-start gap-20 py-6 xs:grid-cols-[1fr_5rem] lg:grid-cols-[1fr_0.4fr]">
        <div
          className="max-w-4xl space-y-4 prose-h1:text-lg prose-h1:font-semibold prose-h2:text-xl prose-h2:font-semibold prose-p:font-light prose-p:leading-[1.7] prose-strong:font-semibold prose-ul:space-y-3 prose-li:font-light xs:prose-h1:text-3xl xs:prose-h2:text-3xl lg:prose-h1:text-5xl"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />

        <BlogSidebar categories={categories} author={users} />
      </div>
    </div>
  );
}
