import Image from "next/image";
import { cinzel } from "../layout";

export default function HowItWorkIconBox({ image, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <Image
        src={image}
        width={100}
        height={100}
        alt="package"
        className="size-20"
      />
      <div>
        <h3
          className={`text-lg sm:text-2xl ${cinzel.className} font-semibold text-matalicGold`}
        >
          {title}
        </h3>
        <p className="text-xs font-light md:text-base">{desc}</p>
      </div>
    </div>
  );
}
