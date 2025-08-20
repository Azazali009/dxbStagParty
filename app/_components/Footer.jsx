import Image from "next/image";

import clock from "../svgIcons/clock.svg";
import Logo from "./Logo";

import FooterContactAndImportantLinks from "./FooterContactAndImportantLinks";
import FooterCta from "./FooterCta";
export default function Footer() {
  return (
    <footer className="space-y-6 bg-gradient-to-b from-primary via-navyBlue to-navyBlue">
      <div className="space-y-10 px-4 sm:px-8">
        <Logo />
        <FooterCta />
        <FooterContactAndImportantLinks />
        <hr className="border-neutral-800" />

        {/* three support box */}
        <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3">
          <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-[#070b16] px-8 py-4">
            <Image
              src={"/images/security.png"}
              width={15}
              height={15}
              alt="security"
            />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold capitalize">
                Secure, split payments
              </h4>
              <p className="text-xs text-neutral-700">
                Everyone pays their own share. No chasing money.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-[#070b16] px-8 py-4">
            <Image
              src={"/images/mens.png"}
              width={15}
              height={15}
              alt="supplier"
            />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold capitalize">
                curated, direct suppliers
              </h4>
              <p className="text-xs text-neutral-700">
                Handpicked experiences, Dubai approved.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-[#070b16] px-8 py-4">
            <Image src={clock} width={20} height={20} alt="clock" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold capitalize">
                Fast, Concierge Support
              </h4>
              <p className="text-xs text-neutral-700">
                Need help? We are on whatsapp and email.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-neutral-800" />

      {/* copyright  */}
      <div className="flex flex-wrap items-center justify-center gap-4 p-2 text-xs font-medium text-neutral-500 sm:justify-between sm:text-sm">
        <p>&copy;2025 DXB Stag Parties. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={"/images/security.png"}
              width={10}
              height={10}
              alt="security"
              className="grayscale"
            />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>

            <span>Visa &bull; MasterCard</span>
          </div>
        </div>
      </div>
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
