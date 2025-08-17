import type { Metadata } from "next";
import "./globals.css";
import AuthListener from "./component/AuthListener";
import NavBar from "./component/NavBar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Linktory",
    template: "%s - Linktory",
  },
  description: "유저가 공유한 유용한 링크를 모아보세요.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://linktory-nine.vercel.app/",
    siteName: "Linktory",
    images: [
      {
        url: "https://linktory-nine.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Linktory 대표 이미지",
      },
    ],
  },
  verification: {
    google: "goQIMOu7pJHAebaNL2Hnabo1chO2PmfReaapWLp2gck",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="">
        <AuthListener />
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
