import type { Metadata } from "next";
import "./globals.css";
import AuthListener from "./component/AuthListener";
import NavBar from "./component/NavBar";

export const metadata: Metadata = {
  title: "Linktory",
  description: "Your links tell your story",
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
