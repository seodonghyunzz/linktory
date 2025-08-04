'use client'
import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateBookmarksModal from "./updateBookmarksModal";
import useAuthStore from "../store/authStore";
import { Bookmark } from "@/lib/types";


type Props = {
    data: Bookmark;
    refetch:()=>void;
}
export default function MyBookmarkCard({ data, refetch }: Props) {
  const { title, url, description, liked, id } = data;
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const user = useAuthStore((state) => state.user)
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
  const likeFetch = async () => {
    try {
      if (!user) return;
      const likeDocRef = doc(db, "bookmarks", id, "likeby", user.uid);
      const likeSnap = await getDoc(likeDocRef);
      setHasLiked(likeSnap.exists());
    } catch (err) {
      console.error("좋아요 여부 확인 실패:", err);
    }
  };
  likeFetch();
}, [user, id]);

  const handleDelete = async(id:string)=>{ 
    const confirmDelete = window.confirm("정말 이 북마크를 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try{
        await deleteDoc(doc(db,'bookmarks',id))
        refetch();
    }catch(err){
        console.error("삭제 실패" ,err);
    }
  }
  const handleLike = async(id:string) => {
    if(!user?.uid) return;

    const likeRef = doc(db,"bookmarks",id,"likeby",user?.uid);
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
          refetch();
          } catch (err) {
          console.error("좋아요 토글 실패:", err);
          }
  }
  return (
    <div className="p-4 bg-white border rounded-md shadow-sm">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h3 className="text-lg font-bold text-blue-600 truncate">{title}</h3>
        <p className="text-sm text-gray-500 truncate">{url}</p>
      </a>
      {description && (
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      )}
      
      <div className="flex justify-between gap-2 mt-3">
        <div className="flex items-center justify-center">
            {!hasLiked?
            <Heart className="cursor-pointer" onClick={()=>{handleLike(id)}}/>
            :<Heart className= "cursor-pointer"fill="red" color="red" onClick={()=>{handleLike(id)}}/>
            }
            <p className="ml-1">{liked}</p>
        </div>
        <div>
            <button className="px-2 py-1 mr-1 text-sm border rounded hover:bg-gray-100" onClick={()=>{setIsUpdateModal(true)}}>수정</button>
            <button className="px-2 py-1 text-sm text-red-500 border rounded cursor-pointer hover:bg-red-100" onClick={()=>handleDelete(id)}>삭제</button>
        </div>
      </div>
      {isUpdateModal&&<UpdateBookmarksModal onClose={()=>setIsUpdateModal(false)} refetch = {refetch} data = {data}/>}
    </div>
  );
}