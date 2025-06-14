import {
  Cinzel,
  Playfair_Display,
  Poppins,
  Bebas_Neue,
  Noto_Serif_Georgian,
} from "next/font/google";

// import FooterWrapper from "./_components/FooterWrapper";
// import HeaderWrapper from "./_components/HeaderWrapper";
import PendingBookingDataNotification from "./_components/PendingBookingDataNotification";
import TosterComp from "./_components/Toaster";
import { AuthProvider } from "./_context/AuthProvider";
import { BookingProvider } from "./_context/bookingProvider";
import { ActivityProvider } from "./_context/ActivityProvider";
import "./globals.css";

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
    <html lang="en" className={`${poppins.className} scroll-smooth`}>
      <body
        className={`${poppins.className} overflow-x-hidden bg-primary text-softGold antialiased`}
      >
        <AuthProvider>
          <ActivityProvider>
            {/* <HeaderWrapper /> */}
            <TosterComp />
            <PendingBookingDataNotification />
            <BookingProvider>
              <main className="">{children}</main>
            </BookingProvider>
            {/* <FooterWrapper /> */}
          </ActivityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
