import type { Metadata } from "next";
import "./globals.css";
import AuthListener from "./component/AuthListener";
import NavBar from "./component/NavBar";

export const metadata: Metadata = {
  title: "Linktory - 북마크 공유 플랫폼",
  description: "유저가 공유한 유용한 링크를 모아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="">
        <AuthListener/>
        <header>
          <NavBar/>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
