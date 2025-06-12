import SupplierSidebar from "../_components/SupplierSidebar";

export default function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] items-start gap-2 border border-gray-800 p-4">
      <SupplierSidebar />
      <div className="p-2">{children}</div>
    </div>
  );
}
