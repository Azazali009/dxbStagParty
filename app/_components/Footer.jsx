import Image from "next/image";

import Logo from "./Logo";

import FooterContactAndImportantLinks from "./FooterContactAndImportantLinks";
import FooterCta from "./FooterCta";
import TrustBox from "./TrustBox";
import Copyright from "./Copyright";
export default function Footer() {
  return (
    <footer className="space-y-6 bg-gradient-to-b from-primary via-navyBlue to-navyBlue">
      <div className="space-y-10 px-4 sm:px-8">
        <Logo />
        <FooterCta />
        <FooterContactAndImportantLinks />
        <hr className="border-neutral-800" />

        {/* three trust box */}
        <TrustBox />
      </div>
      <hr className="border-neutral-800" />

      {/* copyright  */}
      <Copyright />
      {/* <PreFooter />
      <div className="relative space-y-14 bg-navyBlue px-8 py-16">
        <div className="flex justify-center">
          <Image
            src={"/logo.png"}
            width={200}
            height={200}
            className="w-32 sm:w-44"
            alt="logo"
          />
        </div>
        <div className="h-[2px] w-full bg-neutral-700"></div>

        <ul className="mx-auto flex max-w-2xl flex-wrap gap-8">
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"/activities"}>experiences</Link>
          </li>
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"/packages"}>Packages</Link>
          </li>
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"#"}>dxb hen parties</Link>
          </li>
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"/become_a_supplier"}>become a supplier</Link>
          </li>
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"/faqs"}>faqs</Link>
          </li>
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"/terms-conditions"}>terms and conditions</Link>
          </li>
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"/privacy-policy"}>privacy policy</Link>
          </li>
          <li className="text-sm font-medium uppercase xs:text-lg">
            <Link href={"/careers"}>careers</Link>
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
      </div> */}
    </footer>
  );
}
