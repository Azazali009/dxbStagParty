import Image from "next/image";
import Link from "next/link";
import React from "react";
import instaIcon from "../svgIcons/insta.svg";
import tiktok from "../svgIcons/tiktok.svg";
import whatsapp from "../svgIcons/whatsapp.svg";
export default function FooterContactAndImportantLinks() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6 rounded-3xl border border-neutral-800 bg-[#070b16] p-8">
        <h3 className="font-medium">Explore</h3>
        <ul className="grid grid-cols-2 items-center justify-between gap-2 text-[9px] capitalize text-neutral-400 xs:text-base">
          <li>
            <Link
              className="duration-300 hover:text-neutral-700"
              href={"/activities"}
            >
              Activities
            </Link>
          </li>
          <li>
            <Link className="duration-300 hover:text-neutral-700" href={"#"}>
              How it works
            </Link>
          </li>
          <li>
            <Link
              className="duration-300 hover:text-neutral-700"
              href={"/packages"}
            >
              packages
            </Link>
          </li>
          <li>
            <Link className="duration-300 hover:text-neutral-700" href={"#"}>
              content hub
            </Link>
          </li>
          <li>
            <Link
              className="duration-300 hover:text-neutral-700"
              href={"/builder"}
            >
              build my stag party
            </Link>
          </li>
          <li>
            <Link href={"#"}>reviews</Link>
          </li>
        </ul>
      </div>

      <div className="space-y-6 rounded-3xl border border-neutral-800 bg-[#070b16] p-8">
        <h3 className="font-medium">Help & Contact</h3>
        <ul className="grid grid-cols-2 items-center justify-between gap-2 text-[9px] capitalize text-neutral-400 xs:text-base">
          <li>
            <Link
              className="duration-300 hover:text-neutral-700"
              href={"/faqs"}
            >
              Faqs
            </Link>
          </li>
          <li>
            <Link className="duration-300 hover:text-neutral-700" href={"#"}>
              terms
            </Link>
          </li>
          <li>
            <Link
              className="duration-300 hover:text-neutral-700"
              href={"/contact"}
            >
              contact
            </Link>
          </li>
          <li>
            <Link
              className="duration-300 hover:text-neutral-700"
              href={"/privacy-policy"}
            >
              privacy
            </Link>
          </li>
          <li>
            <Link
              className="duration-300 hover:text-neutral-700"
              href={"/login"}
            >
              supplier login
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link href={"#"}>
              <Image src={instaIcon} width={15} height={15} alt="instagram" />
            </Link>
            <Link href={"#"}>
              <Image src={tiktok} width={15} height={15} alt="tiktok" />
            </Link>
            <Link href={"#"}>
              <Image src={whatsapp} width={15} height={15} alt="whatsapp" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
