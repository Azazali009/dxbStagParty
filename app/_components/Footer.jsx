// import Image from "next/image";

// import Logo from "./Logo";

// import FooterContactAndImportantLinks from "./FooterContactAndImportantLinks";
// import FooterCta from "./FooterCta";
// import TrustBox from "./TrustBox";
// import Copyright from "./Copyright";
// import Link from "next/link";
// export default function Footer() {
//   return (
//     <footer className="space-y-6 border-t border-neutral-800 bg-gradient-to-b from-primary via-navyBlue to-navyBlue pt-6">
//       <div className="space-y-10 px-4 sm:px-8">
//         <Logo />
//         <FooterCta />
//         <FooterContactAndImportantLinks />
//         <hr className="border-neutral-800" />

//         {/* three trust box */}
//         <TrustBox />
//       </div>
//       <hr className="border-neutral-800" />

//       {/* copyright  */}
//       <Copyright />
//       {/* <PreFooter />
//       <div className="relative space-y-14 bg-navyBlue px-8 py-16">
//         <div className="flex justify-center">
//           <Image
//             src={"/logo.png"}
//             width={200}
//             height={200}
//             className="w-32 sm:w-44"
//             alt="logo"
//           />
//         </div>
//         <div className="h-[2px] w-full bg-neutral-700"></div>

//         <ul className="mx-auto flex max-w-2xl flex-wrap gap-8">
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"/activities"}>experiences</Link>
//           </li>
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"/packages"}>Packages</Link>
//           </li>
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"#"}>dxb hen parties</Link>
//           </li>
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"/become_a_supplier"}>become a supplier</Link>
//           </li>
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"/faqs"}>faqs</Link>
//           </li>
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"/terms-conditions"}>terms and conditions</Link>
//           </li>
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"/privacy-policy"}>privacy policy</Link>
//           </li>
//           <li className="text-sm font-medium uppercase xs:text-lg">
//             <Link href={"/careers"}>careers</Link>
//           </li>
//         </ul>

//         <div className="flex items-center justify-center gap-6">
//           <Image
//             src={instaIcon}
//             width={100}
//             height={100}
//             alt="instagram"
//             className="w-6 hover:opacity-70"
//           />
//           <Image
//             src={tiktok}
//             width={100}
//             height={100}
//             alt="tiktok"
//             className="w-6 hover:opacity-70"
//           />
//           <Image
//             src={whatsapp}
//             width={100}
//             height={100}
//             alt="whatsapp"
//             className="w-8 hover:opacity-70"
//           />
//         </div>
//       </div> */}
//     </footer>
//   );
// }

import Link from "next/link";
import FooterCategories from "./FooterCategories";
import FooterBuildLinks from "./FooterBuildLinks";
import FooterSupport from "./FooterSupport";
import FooterContact from "./FooterContact";
import TrustBox from "./TrustBox";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="relative space-y-6 border-t border-neutral-800 bg-black px-4">
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-transparent via-transparent to-primary" />
      <div className="relative z-10 grid grid-cols-1 gap-8 px-4 py-6 sm:grid-cols-[1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        {/* col 1 */}
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              {/* <div className="size-8 rounded-full bg-matalicGold" /> */}
              <div>
                <h2 className="text-2xl font-medium">DXB Stag Parties</h2>
                <p className="text-sm text-neutral-500">
                  Dubai premium stag weekend builder
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              Plan an unforgettable Dubai send-off with curated activities, slit
              payments, and a concierge level experience - all in a few clicks.
            </p>
          </div>

          <Link
            href={"/builder"}
            className="flex items-center justify-center gap-2 rounded-lg border border-matalicGold bg-matalicGold py-2 font-medium capitalize text-navyBlue duration-300 hover:bg-transparent hover:text-matalicGold"
          >
            <span>Build my stag party</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          <Link
            href={"#"}
            className="flex items-center justify-center gap-2 rounded-lg border border-matalicGold bg-matalicGold py-2 font-medium capitalize text-navyBlue duration-300 hover:bg-transparent hover:text-matalicGold"
          >
            <span>Request a concierge</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>

          <p className="text-xs font-medium text-neutral-500">
            Get the <span className="text-matalicGold"> DXB Stag Playbook</span>{" "}
            (free PDF) - top venues, timing and budget tips.
          </p>

          <form className="flex items-center gap-2">
            <input
              type="text"
              className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-2 py-1.5 placeholder:text-xs"
              placeholder="Your email"
            />
            <button className="rounded-md bg-matalicGold px-4 py-2 font-semibold text-navyBlue">
              Got it
            </button>
          </form>
          <p className="text-xs text-stone-500">
            No spam, just clever planning tips. Unsubscribe anytime.
          </p>
        </div>

        {/* col 2 */}
        <FooterBuildLinks />

        {/* col 3 */}

        <FooterCategories />

        <FooterSupport />
        <FooterContact />
      </div>
      <hr className="border-neutral-800" />
      <TrustBox />
      <hr className="border-neutral-800" />
      <Copyright />
    </footer>
  );
}
