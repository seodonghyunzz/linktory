import { Metadata } from "next";
import HotPageClient from "./hotpageCilent";

export const metadata:Metadata = {
  title: "인기 북마크",
  description: "지금 인기많은 북마크를 확인하세요.",
}

export default function HotPage(){

  return(
    <HotPageClient/>
  )
}