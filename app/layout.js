import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import TosterComp from "@/app/_components/Toaster";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} overflow-x-hidden bg-primary text-white antialiased`}
      >
        <Header />
        <TosterComp />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
