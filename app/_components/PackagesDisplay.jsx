import Empty from "./Empty";
import PackageCard from "./PackageCard";

export default function PackagesDisplay({ filteredPackages }) {
  if (!filteredPackages || filteredPackages.length === 0)
    return <Empty name={"Packages"} />;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filteredPackages.map((pack) => {
        return <PackageCard key={pack.id} pack={pack} />;
      })}
    </div>
  );
}
