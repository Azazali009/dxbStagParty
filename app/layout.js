import { Poppins, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import TosterComp from "./_components/Toaster";
import ClientHeader from "./_components/ClientHeader";
import PendingBookingDataNotification from "./_components/PendingBookingDataNotification";

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
export const metadata = {
  title: {
    template: "%s | DXB Stag Party",
    default: "DXB Stag Party",
  },

  description: "DXB Stag Party",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body
        className={`${poppins.className} text-softGold overflow-x-hidden bg-primary antialiased`}
      >
        <ClientHeader>
          <Header />
        </ClientHeader>
        <TosterComp />
        <PendingBookingDataNotification />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
