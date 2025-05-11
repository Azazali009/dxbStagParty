import { Cinzel, Playfair_Display, Poppins } from "next/font/google";
import ClientComponent from "./_components/ClientComponent";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import PendingBookingDataNotification from "./_components/PendingBookingDataNotification";
import TosterComp from "./_components/Toaster";
import { AuthProvider } from "./_context/AuthProvider";
import { BookingProvider } from "./_context/bookingProvider";
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
          <ClientComponent>
            <Header />
          </ClientComponent>
          <TosterComp />
          <PendingBookingDataNotification />
          <BookingProvider>
            <main className="">{children}</main>
          </BookingProvider>
          <ClientComponent>
            <Footer />
          </ClientComponent>
        </AuthProvider>
      </body>
    </html>
  );
}
