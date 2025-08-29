import {
  Cinzel,
  Playfair_Display,
  Poppins,
  Bebas_Neue,
  Noto_Serif_Georgian,
} from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const HeaderWrapper = dynamic(() => import("./_components/HeaderWrapper"), {
  ssr: false,
});
const FooterWrapper = dynamic(() => import("./_components/FooterWrapper"), {
  ssr: false,
});
const TosterComp = dynamic(() => import("./_components/Toaster"), {
  ssr: false,
});
const PendingBookingDataNotification = dynamic(
  () => import("./_components/PendingBookingDataNotification"),
  { ssr: false },
);

const AuthProvider = dynamic(() => import("./_context/AuthProvider"), {
  ssr: false,
});
const BookingProvider = dynamic(() => import("./_context/bookingProvider"), {
  ssr: false,
});
const ActivityProvider = dynamic(() => import("./_context/ActivityProvider"), {
  ssr: false,
});
const PartyBuilderProvider = dynamic(
  () => import("./_context/PartyBuilderProvider"),
  {
    ssr: false,
  },
);

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
});
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const BebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
export const Georgia = Noto_Serif_Georgian({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
// export const metadata = {
//   title: {
//     template: "%s | DXB Stag Party",
//     default: "DXB Stag Party",
//   },

//   description: "DXB Stag Party",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${poppins.className} overflow-x-hidden bg-primary text-softGold antialiased`}
      >
        <AuthProvider>
          <ActivityProvider>
            <HeaderWrapper />
            <TosterComp />
            <PendingBookingDataNotification />
            <BookingProvider>
              <PartyBuilderProvider>
                <main>{children}</main>
              </PartyBuilderProvider>
            </BookingProvider>
            <FooterWrapper />
          </ActivityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
