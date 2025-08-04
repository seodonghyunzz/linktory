'use client'
import { Bookmark } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc, updateDoc, setDoc, increment } from "firebase/firestore";

type Props = {
    data: Bookmark;
    currentUser?: string;
}

export default function BookmarkCard({ data, currentUser}: Props) {
  const [hasLiked, setHasLiked] = useState(false);
  const { id } = data;

   useEffect(() => {
    if (!currentUser) return;

    const checkLiked = async () => {
      const likeRef = doc(db, "bookmarks", id, "likeby", currentUser);
      const snap = await getDoc(likeRef);
      setHasLiked(snap.exists());
    };

    checkLiked();
    }, [data.id, currentUser]);
    
    const handleLike = async(id:string) => {
        if(!currentUser) return;
    
        const likeRef = doc(db,"bookmarks",id,"likeby",currentUser);
        const bookmarkRef = doc(db,"bookmarks",id);
    
        try {
          if (hasLiked) {
              await deleteDoc(likeRef);
              await updateDoc(bookmarkRef, {
                liked: increment(-1),
              });
                setHasLiked(false);
        } else {
              await setDoc(likeRef, {});
              await updateDoc(bookmarkRef, {
                liked: increment(1),
              });
              setHasLiked(true);
              }
              } catch (err) {
              console.error("좋아요 토글 실패:", err);
              }
      }

  return (
    
    <div className="flex flex-col border rounded shadow h-[250px] p-3 w-full">
      <div className="relative w-full h-32 "> 
          <Link href={data.url} passHref target="_blank" rel="noopener noreferrer">
          <img src={data.image||"defaultImage.png"} className="w-full h-full border rounded "/>
         </Link>
      </div>
      <div className="flex flex-col justify-center w-full h-1/2">
        <h2 className="text-lg font-semibold line-clamp-1">{data.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{data.description}</p>
        <div className="flex items-center justify-between mt-auto px-1 py-1 text-[12px]">
            <div className="flex items-center gap-1">
            {!hasLiked? (
            <Heart size={16} onClick={()=>handleLike(id)} className="cursor-pointer" />
            ) : (
             <Heart fill="red" color="red" size={16} onClick={()=>{handleLike(id)}} className="cursor-pointer" />
            )}
            <span>{data.liked}</span>
        </div>
        <p>{data.email}</p>
        </div>
      </div>
    </div>
    
  );
}