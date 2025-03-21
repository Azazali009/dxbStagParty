import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";

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

  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} overflow-x-hidden bg-primary text-white antialiased`}
      >
        <Header />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
