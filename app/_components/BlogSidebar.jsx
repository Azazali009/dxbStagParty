import { getVotingReports } from "../_lib/apiVotingSession";
import BlogMobileSidebar from "./BlogMobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

export default async function BlogSidebar({ categories }) {
  const { results } = await getVotingReports();
  const mostPopular = results.slice(0, 3);
  return (
    <>
      <DesktopSidebar mostPopular={mostPopular} categories={categories} />
      <BlogMobileSidebar mostPopular={mostPopular} categories={categories} />
    </>
  );
}
