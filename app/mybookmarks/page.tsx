import BookmarksClient from "./bookmarksClient";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "내 북마크",
  description: "내가 등록한 북마크를 모아보세요.",
};

export default function BookmarksPage() {
  
  return(
    <BookmarksClient/>
  )
}