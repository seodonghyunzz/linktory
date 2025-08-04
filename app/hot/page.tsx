'use client'

import { useEffect, useState} from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";
import useHotBookmarks from "./useHotBookmakrs";
import BookmarkList from "./bookmarksList";
import Loading from "../component/Loading";
import InfiniteScrollSentinel from "../component/InfiniteScrollSentinel";

export default function HotPage() {
  const user = useAuthStore(state=>state.user)
  const authLoading = useAuthStore(state=>state.authLoading)
  const router = useRouter();
  const { bookmarks, loading , fetchMore, hasMore } = useHotBookmarks();
  const [input , setInput] = useState('')


   useEffect(() => {
    if (user === null && !authLoading) {
      router.push("/login");
    }
    }, [user, router]);

    if(authLoading){
      return <Loading/>
    }
    console.log(bookmarks)
   return (
    <div className="flex w-full max-w-[1000px] p-2 mx-auto flex-col">
      <h1 className="mb-4 text-2xl font-bold">🔥 인기 북마크</h1>
      <div className='flex w-full mb-4'>
          <input
            type="search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="북마크 제목으로 검색하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="북마크 검색"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BookmarkList
            bookmarks={bookmarks}
            currentUser={user?.uid}
            search={input}
            loading={loading}
          />
          {hasMore && (
            <div className="h-10 text-center col-span-full">
              <p>load more...</p>
              <InfiniteScrollSentinel
              onIntersect={() => {
              if (!loading && hasMore) fetchMore();
              }}
               disabled={loading || !hasMore}
              />
            </div>
          )} 
        </div>
    </div>
  );
}