import Image from "next/image";
import Link from "next/link";
import instaIcon from "../svgIcons/insta.svg";
import tiktok from "../svgIcons/tiktok.svg";
import whatsapp from "../svgIcons/whatsapp.svg";
import PreFooter from "./PreFooter";
export default function Footer() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <PreFooter />
      <footer className="relative space-y-14 bg-navyBlue px-8 py-16">
        <div className="flex justify-center">
          <Image src={"/logo.png"} width={200} height={200} alt="logo" />
        </div>
        <div className="h-[2px] w-full bg-neutral-700"></div>

        <ul className="mx-auto flex max-w-2xl flex-wrap gap-8">
          <li className="text-lg font-medium uppercase">
            <Link href={"#"}>experiences</Link>
          </li>
          <li className="text-lg font-medium uppercase">
            <Link href={"#"}>Packages</Link>
          </li>
          <li className="text-lg font-medium uppercase">
            <Link href={"#"}>dxb hen parties</Link>
          </li>
          <li className="text-lg font-medium uppercase">
            <Link href={"#"}>become a supplier</Link>
          </li>
          <li className="text-lg font-medium uppercase">
            <Link href={"#"}>faqs</Link>
          </li>
          <li className="text-lg font-medium uppercase">
            <Link href={"/terms-conditions"}>terms and conditions</Link>
          </li>
          <li className="text-lg font-medium uppercase">
            <Link href={"/privacy-policy"}>privacy policy</Link>
          </li>
          <li className="text-lg font-medium uppercase">
            <Link href={"#"}>careers</Link>
          </li>
        </ul>

        <div className="flex items-center justify-center gap-6">
          <Image
            src={instaIcon}
            width={100}
            height={100}
            alt="instagram"
            className="w-6 hover:opacity-70"
          />
          <Image
            src={tiktok}
            width={100}
            height={100}
            alt="tiktok"
            className="w-6 hover:opacity-70"
          />
          <Image
            src={whatsapp}
            width={100}
            height={100}
            alt="whatsapp"
            className="w-8 hover:opacity-70"
          />
        </div>
      </footer>
    </div>
  );
}
