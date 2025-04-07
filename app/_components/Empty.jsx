import Image from "next/image";
export default function Empty({ name }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10">
      <Image
        src={"/images/404Icon.svg"}
        width={200}
        height={200}
        alt="Not Found"
      />
      <h1 className="text-center text-lg font-medium">
        No {name} found at the movement <span className="text-white">🤔</span>
      </h1>
    </div>
  );
}
