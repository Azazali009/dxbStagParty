import Image from "next/image";
import ListIcon from "../svgIcons/list.svg";
import gridIcon from "../svgIcons/grid.svg";

export default function GridList({ list, grid, handleList, handleGrid }) {
  return (
    <div className="flex items-center justify-end gap-4 p-4">
      <button
        className={`rounded-sm p-1 duration-300 ${list ? "scale-110 bg-sky-600" : "scale-100 bg-transparent"}`}
        onClick={handleList}
      >
        <Image src={ListIcon} width={20} height={20} alt="list" />
      </button>
      <button
        onClick={handleGrid}
        className={`rounded-sm p-1 duration-300 ${grid ? "scale-110 bg-sky-600" : "scale-100 bg-transparent"}`}
      >
        <Image src={gridIcon} width={20} height={20} alt="list" />
      </button>
    </div>
  );
}
