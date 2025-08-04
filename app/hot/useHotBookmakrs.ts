import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { collection, getDocs, orderBy, query, limit, startAfter} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bookmark } from "@/lib/types";

export default function useHotBookmarks() {
    const user = useAuthStore((state)=> state.user)
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [hasMore, setHasMore] = useState(true);
    const limitNumber = 6

    const fetch = async () => {
      if(!user || !hasMore) return;
      
      try {
        const q = query(
          collection(db, "bookmarks"),
          orderBy("liked", "desc"),
          ...(lastDoc? [startAfter(lastDoc)]:[]),
          limit(limitNumber)
        );

        const snapshot = await getDocs(q);
        const bookmarks = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            url: data.url,
            description: data.description ?? "",
            createdAt: data.createdAt ?? null,
            liked: data.liked ?? 0,
            userID: data.userID ?? "",
            email: data.email ?? "",
            image:data.Image ?? "",
          };
        });
        setBookmarks((prev) => {
        const prevIds = new Set(prev.map((b) => b.id));
        const newBookmarks = bookmarks.filter((b) => !prevIds.has(b.id)); //키값이 중복이라 떠서 필터했음
        return [...prev, ...newBookmarks];
        });
        setLastDoc(snapshot.docs[snapshot.docs.length-1]);
        
        if(bookmarks.length === 0) setHasMore(false);
      } catch (err) {
        console.error("Error fetching bookmarks", err);
      } finally {
        setLoading(false);
      }
    };

    
    useEffect(()=>{
      if(user) fetch();
    },[user])
        


    return {bookmarks, loading ,refetch:fetch, fetchMore:fetch,hasMore};
}