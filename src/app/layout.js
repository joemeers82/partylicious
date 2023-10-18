import "./globals.scss";
import { Inter } from "next/font/google";

import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Partylicious",
  description: "A food Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} font-light text-base leading-global tracking-global text-default`}
      >
        <Header></Header>
        <div className="">{children}</div>
        <Footer></Footer>
      </body>
    </html>
  );
}
