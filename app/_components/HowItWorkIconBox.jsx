import Image from "next/image";
import { cinzel } from "../layout";

export default function HowItWorkIconBox({ image, title, desc }) {
  return (
    <div className="flex items-start gap-6">
      <Image src={image} width={100} height={100} alt="package" />
      <div>
        <h3
          className={`text-2xl ${cinzel.className} font-semibold text-matalicGold`}
        >
          {title}
        </h3>
        <p className="font-light">{desc}</p>
      </div>
    </div>
  );
}
