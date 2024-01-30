"use client";
import { useReducer } from "react";
import MeliContext from "@/store/meliContext";
import meliReducer from "@/store/meliReducer";
import initialMeliState from "@/store/initialMeliState";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [state, dispatch] = useReducer(meliReducer, initialMeliState);
  return (
    <html lang="en">
      <body className={inter.className}>
        <MeliContext.Provider value={[state, dispatch]}>
          {children}
        </MeliContext.Provider>
      </body>
    </html>
  );
}
