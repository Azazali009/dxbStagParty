import Image from "next/image";

export default function StatsCard({ title, count = 0, icon, bgColor }) {
  return (
    <div className="space-y-4 rounded bg-navyBlue p-4 shadow-xl">
      <figure
        className={`relative flex size-12 items-center justify-center rounded-full p-3`}
        style={{ backgroundColor: `${bgColor}` }}
      >
        <Image src={icon} width={40} height={40} alt="icon" />
      </figure>
      <h2 className="text-lg font-semibold capitalize">{title}</h2>
      <p className="font-medium">
        Total:{" "}
        <span className="font-normal text-matalicGold">{count}</span>{" "}
      </p>
    </div>
  );
}
