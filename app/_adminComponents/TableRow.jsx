export default function TableRow({ children }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-center justify-items-center border border-gray-800 bg-navyBlue px-4 py-3 text-sm font-light last:rounded-b-md">
      {children}
    </div>
  );
}
