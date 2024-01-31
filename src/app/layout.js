import MeliLayout from "@/coreComponents/MeliLayout";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meli frontend code challenge by CF",
  description: "Come and rate my code challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MeliLayout>{children}</MeliLayout>
      </body>
    </html>
  );
}
