import { getBlogs } from "./_lib/blogApi";
import { getActivities } from "./_lib/data-services";
import { getPackages } from "./_lib/packagesApi";

export default async function sitemap() {
  const activities = await getActivities();
  const blogs = await getBlogs();
  const packages = await getPackages();

  const staticRoutes = [
    {
      url: "https://dxbstagparties.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://dxbstagparties.com/activities",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://dxbstagparties.com/packages",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://dxbstagparties.com/contact",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dxbstagparties.com/faqs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dxbstagparties.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dxbstagparties.com/become_a_supplier",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dxbstagparties.com/builder",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dxbstagparties.com/login",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dxbstagparties.com/signup",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dxbstagparties.com/forgot-password",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const activityRoutes = activities.map((a) => ({
    url: `https://dxbstagparties.com/activities/${a.slug}`,
    lastModified: new Date(a.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `https://dxbstagparties.com/blog/${b.slug}`,
    lastModified: new Date(b.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const packagesRoutes = packages.map((p) => ({
    url: `https://dxbstagparties.com/packages/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...activityRoutes, ...blogRoutes, packagesRoutes];
}
