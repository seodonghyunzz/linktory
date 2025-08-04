'use client'
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
    onClose: ()=> void;
    refetch: ()=> void;
}

export default function AddBookmarksModal({ onClose, refetch }:Props){
    const user = useAuthStore((state)=>state.user)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription]= useState('')
    const [error, setError] = useState('')
    
    const handleAdd = async () => {
    if (!title || !url || !user) {
    setError("제목과 url을 입력하세요");
    return;
    }

    setError('');

    try {
    const ogRes = await fetch('/api/og-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const { ogImage } = await ogRes.json();

    
    await addDoc(collection(db, 'bookmarks'), {
      title,
      url,
      description,
      userID: user.uid,
      createdAt: serverTimestamp(),
      liked: 0,
      email: user.email,
      Image: ogImage || '', // 이미지 없을 시 빈 값
    });

    onClose();
    refetch();
  } catch (err) {
    console.error('북마크 등록 실패:', err);
    setError('등록에 실패했습니다. 다시 시도해주세요.');
  }
}

    return(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md border border-gray-200">
        <h2 className="mb-4 text-xl font-bold">북마크 등록</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded"
          placeholder="제목"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          placeholder="URL (https://...)"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          placeholder="내용"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded cursor-pointer">취소</button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded cursor-pointer" onClick={handleAdd}>등록</button>
        </div>
      </div>
    </div>
    )
}