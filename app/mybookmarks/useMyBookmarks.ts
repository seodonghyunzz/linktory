import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function useMyBookmarks() {
    const user = useAuthStore((state)=> state.user)
    const [bookmarks, setBookmarks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetch = async()=>{
        if(!user) return;

        const q = query(
            collection(db,"bookmarks"),
             where("userID","==",user.uid),
            orderBy("createdAt","desc")
        )
        const snap = await getDocs(q)
        const data = snap.docs.map((doc)=>({id:doc.id, ...doc.data()}))
        setBookmarks(data)
        setLoading(false)
    }
    
    useEffect(()=>{
        fetch();
    },[user])
        


    return {bookmarks, loading ,refetch:fetch}
}