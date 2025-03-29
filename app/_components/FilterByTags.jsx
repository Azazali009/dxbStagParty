export default function FilterByTags({ tabs, filter, setFilter }) {
  return (
    <ul className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold capitalize">
        Filter by tags &darr;
      </h2>
      {tabs.map((tab) => (
        <li key={tab} className="snap-start">
          <button
            onClick={() => setFilter(tab)}
            className={`flex w-full min-w-max justify-center whitespace-nowrap rounded-full border-2 border-secondary px-6 py-2 text-sm capitalize transition-all duration-300 ${
              filter === tab ? "bg-secondary" : "bg-transparent"
            } hover:bg-secondary`}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
}
