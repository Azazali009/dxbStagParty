export default function Table({ headers, data, RowComponent }) {
  return (
    <div>
      {/* Table Header */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center justify-items-center rounded-t-md border border-b-0 border-gray-800 bg-navyBlue px-4 py-3 font-semibold">
        {headers.map((header, index) => (
          <p className="capitalize" key={index}>
            {header}
          </p>
        ))}
      </div>

      {/* Table Body */}
      <div className="no-scrollbar max-h-[350px] overflow-y-auto">
        {!data?.length ? (
          <p className="py-4 text-center">No records found</p>
        ) : (
          data.map((item) => <RowComponent key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}
