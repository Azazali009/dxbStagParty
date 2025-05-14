import Link from "next/link";
export default function CreateActivityAndSearch({
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between bg-navyBlue p-4 shadow-sm">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search activity,package,blogs..."
        className="h-12 w-2/3 rounded-full bg-primary px-4 outline-none duration-300 placeholder:text-sm placeholder:tracking-wider focus:outline-matalicGold"
      />
      <Link
        className="flex h-10 items-center gap-3 rounded-lg bg-indigo-600 px-6 capitalize shadow-lg duration-300 hover:bg-sky-800 hover:shadow-none"
        href={"/dashboard/activities/create-activity"}
      >
        <span className="text-xl">+</span>
        <span>create activity</span>
      </Link>
    </div>
  );
}
