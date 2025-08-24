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

// ---------------------------------------------
// SLUGS (defaults)
// ---------------------------------------------
export const SLUG = {
  experiences: "/activities",
  packages: "/packages",
  builder: "/builder",
  concierge: "#",
  hen: "#",
  categories: {
    adrenaline: "/activities#adrenaline",
    dayToNight: "/activities#day-to-night",
    chillLuxe: "/activities#chill-and-luxe",
    blog: "/blog", // ok if "coming soon"
    reviews: "/reviews", // ok if "coming soon"
  },
  support: {
    faq: "/faq",
    payments: "/payment-and-deposits",
    cancellations: "/cancellation-policy",
    terms: "/terms-and-conditions",
    privacy: "/privacy-policy",
    cookies: "/cookie-preferences",
    accessibility: "/accessibility",
  },
  work: {
    supplier: "/become-a-supplier",
    supplierLogin: "/supplier",
    careers: "/careers",
    press: "/press",
  },
  contact: {
    wa: "https://wa.me/971000000000",
    email: "mailto:hello@dxbstagparties.com",
    instagram: "#",
    tiktok: "#",
    facebook: "#",
    linkedin: "#",
    sitemap: "/sitemap",
  },
};

// ---------------------------------------------
// Helpers
// ---------------------------------------------
export function buildLinkGroups(S) {
  return [
    {
      title: "Top Categories",
      links: [
        { label: "Adrenaline", href: S.categories.adrenaline },
        { label: "Day to Night", href: S.categories.dayToNight },
        { label: "Chill & Luxe", href: S.categories.chillLuxe },
        { label: "Guides & Blog", href: S.categories.blog },
        { label: "DXB Hen Parties", href: S.hen },
        { label: "Reviews", href: S.categories.reviews },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQs", href: S.support.faq },
        { label: "Payment & Deposits", href: S.support.payments },
        { label: "Cancellation Policy", href: S.support.cancellations },
        { label: "Terms & Conditions", href: S.support.terms },
        { label: "Privacy Policy", href: S.support.privacy },
        { label: "Cookie Preferences", href: S.support.cookies },
        { label: "Accessibility", href: S.support.accessibility },
      ],
    },
    {
      title: "Work With Us",
      links: [
        { label: "Become a Supplier", href: S.work.supplier },
        { label: "Supplier Login", href: S.work.supplierLogin },
        { label: "Careers", href: S.work.careers },
        { label: "Press / Media Kit", href: S.work.press },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "WhatsApp", href: S.contact.wa },
        { label: "Email", href: S.contact.email },
        { label: "Instagram", href: S.contact.instagram },
        { label: "TikTok", href: S.contact.tiktok },
        { label: "Facebook", href: S.contact.facebook },
        { label: "LinkedIn", href: S.contact.linkedin },
        { label: "Sitemap", href: S.contact.sitemap },
      ],
    },
  ];
}

export function buildNavJsonLd(S, groups) {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Build My Stag Party",
      "Need it handled? Request a Concierge",
      "Experiences",
      "Packages",
      "Planner / Builder",
      "DXB Hen Parties",
      ...groups.flatMap((g) => g.links.map((l) => l.label)),
    ],
    url: [
      S.builder,
      S.concierge,
      S.experiences,
      S.packages,
      S.builder,
      S.hen,
      ...groups.flatMap((g) => g.links.map((l) => l.href)),
    ],
  };
}

// ---------------------------------------------
// Bits
// ---------------------------------------------
export function FooterCTA({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
    >
      {children}
    </Link>
  );
}

export function FooterA({ href, children }) {
  return (
    <Link href={href} className="hover:text-white">
      {children}
    </Link>
  );
}

export function Usp({ title, note }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-amber-400">◆</div>
      <div>
        <div className="font-medium">{title}</div>
        {note && <div className="text-neutral-400">{note}</div>}
      </div>
    </div>
  );
}

// ---------------------------------------------
// Variants
// ---------------------------------------------
export function FooterClassic({ SLUG: S }) {
  const year = new Date().getFullYear();
  const groups = buildLinkGroups(S);
  const jsonLd = buildNavJsonLd(S, groups);

  return (
    <footer
      className="border-t border-neutral-800 bg-neutral-950 text-neutral-200"
      aria-labelledby="site-footer"
    >
      {/* USP bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <Usp title="Secure checkout" note="Stripe / Apple Pay" />
          <Usp title="Split payments" note="Pay individually" />
          <Usp title="Concierge available" note="From planning to party" />
          <Usp title="Fast replies" note="Same-day response" />
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr,1fr,1fr,1fr]">
          {/* Brand + CTAs + Quick links + Newsletter */}
          <section aria-label="Brand and actions">
            <h2
              id="site-footer"
              className="text-2xl font-semibold tracking-tight"
            >
              DXB Stag Parties
            </h2>
            <p className="mt-3 text-neutral-400">
              Dubai’s most complete stag party builder. Split payments,
              concierge support, zero faff.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <FooterCTA href={S.builder}>Build My Stag Party</FooterCTA>
              <FooterCTA href={S.concierge}>
                Need it handled? Request a Concierge
              </FooterCTA>
            </div>

            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <FooterA href={S.experiences}>Experiences</FooterA>
              </li>
              <li>
                <FooterA href={S.packages}>Packages</FooterA>
              </li>
              <li>
                <FooterA href={S.builder}>Planner / Builder</FooterA>
              </li>
              <li>
                <FooterA href={S.hen}>DXB Hen Parties</FooterA>
              </li>
            </ul>

            {/* Newsletter (optional hook) */}
            <form className="mt-8" action="/api/subscribe" method="post">
              <label htmlFor="email" className="block text-sm font-medium">
                Stay in the loop
              </label>
              <div className="mt-3 flex gap-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="min-w-0 flex-auto rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="rounded-md bg-neutral-200 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                We’ll never spam. Unsubscribe anytime.
              </p>
            </form>
          </section>

          {/* Link groups */}
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                {g.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <FooterA href={l.href}>{l.label}</FooterA>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <div className="text-xs text-neutral-500">
            © {year} DXB Stag Parties. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-2">◆ Secure checkout</div>
            <div className="flex items-center gap-2">◆ Split payments</div>
            <div className="flex items-center gap-2">◆ Concierge support</div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </footer>
  );
}

export function FooterMinimal({ SLUG: S }) {
  const year = new Date().getFullYear();
  const groups = buildLinkGroups(S);

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <FooterCTA href={S.builder}>Build My Stag Party</FooterCTA>
            <FooterCTA href={S.concierge}>Request a Concierge</FooterCTA>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {groups.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {g.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <FooterA href={l.href}>{l.label}</FooterA>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-400">
            <span>© {year} DXB Stag Parties.</span>
            <div className="flex gap-4">
              <Usp title="Secure checkout" />
              <Usp title="Split payments" />
              <Usp title="Concierge support" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterSplit({ SLUG: S }) {
  const year = new Date().getFullYear();
  const groups = buildLinkGroups(S);
  const [top, support, work, contact] = groups;

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Big center CTA block */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold">
            Plan the ultimate Dubai stag
          </h2>
          <p className="mt-2 text-neutral-400">
            Build your plan in minutes or hand it to our concierge.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <FooterCTA href={S.builder}>Build My Stag Party</FooterCTA>
            <FooterCTA href={S.concierge}>Request a Concierge</FooterCTA>
          </div>
          <div className="mt-4 text-sm">
            <FooterA href={S.experiences}>Browse experiences</FooterA>
            <span className="text-neutral-500"> · </span>
            <FooterA href={S.packages}>See packages</FooterA>
            <span className="text-neutral-500"> · </span>
            <FooterA href={S.hen}>DXB Hen Parties</FooterA>
          </div>
        </div>

        {/* Compact link clusters */}
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {[top, support, work, contact].map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {g.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <FooterA href={l.href}>{l.label}</FooterA>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-500">
          <span>© {year} DXB Stag Parties.</span>
          <span>Secure checkout · Split payments · Concierge support</span>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------
// Main Export (Single entry)
// ---------------------------------------------
export default function Footer({ variant = "classic", slugs }) {
  const merged = { ...SLUG, ...(slugs || {}) };
  if (variant === "minimal") return <FooterMinimal SLUG={merged} />;
  if (variant === "split") return <FooterSplit SLUG={merged} />;
  return <FooterClassic SLUG={merged} />;
}
