import { useState } from "react";
import { Bookmark } from "@/lib/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
type Props = {
    data: Bookmark;
    onClose: ()=> void;
    refetch: ()=> void;
}

export default function UpdateBookmarksModal({ onClose, refetch, data }:Props){
    const { title, url, description, id} = data;
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateUrl, setUpdateUrl] = useState(url);
    const [updateDescription, setUpdateDescription] = useState(description);
    
    const handleUpdate = async() => {
        try{
            await updateDoc(doc(db,"bookmarks",id),{
                title: updateTitle,
                url: updateUrl,
                description: updateDescription
            })
         refetch();
         onClose();
        }catch(err){
            console.log("업데이트 실패!",err);
        }
        
    }
    return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-0">
     <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md border border-gray-200">
        <h2 className="mb-4 text-lg font-semibold">북마크 수정</h2>
        <input
          type="text"
          placeholder="제목"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL"
          value={updateUrl}
          onChange={(e) => setUpdateUrl(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded"
        />
        <textarea
          placeholder="설명"
          value={updateDescription}
          onChange={(e) => setUpdateDescription(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}