import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/_components/Header/Header";
import { Footer } from "@/app/_components/Footer/Footer";
import { Providers } from "@/app/_redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Providers>
          <main className="main__container">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
