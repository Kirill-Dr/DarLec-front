import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { FooterComponent } from "@/app/_components/Footer/Footer";
import { Providers } from "@/app/_redux/provider";
import { HeaderComponent } from "@/app/_components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="main__container">{children}</main>
        </Providers>
        <FooterComponent />
      </body>
    </html>
  );
}
