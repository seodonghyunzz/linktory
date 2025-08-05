'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/app/store/authStore'
import { Plus} from "lucide-react";
import useMyBookmarks from './useMyBookmarks';
import BookmarkList from './bookmarksList';
import AddBookmarksModal from './addBookmarksModal';
import Loading from '../component/Loading';

export default function BookmarksPage() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const authLoading = useAuthStore(state=>state.authLoading)

  const [input,setInput] = useState('')
  const {bookmarks, loading , refetch} = useMyBookmarks();
  const [sortOption, setSortOption]= useState<'latest'|'liked'>('latest')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)



  useEffect(() => {
      if (user === null && !authLoading) {
        router.push("/login");
      }
      }, [user, router]);
  
      if(authLoading){
        return <Loading/>
      }
  


  return (
    <div className="flex w-full max-w-[1000px] p-2 mx-auto flex-col">
        <div className='flex justify-between p-2'>
        <div className='flex w-2/3'>
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
        <div className='flex items-center justify-center gap-x-4'>
            <button className='h-8 text-[12px] text-center border w-15 rounded-2xl cursor-pointer justify-center flex items-center' onClick={()=>setIsAddModalOpen(true)}><Plus /></button>
            <button className='h-8 text-[12px] text-center border w-15 rounded-2xl cursor-pointer' onClick={()=>{setSortOption('latest')}}>최신순</button>
            <button className='h-8 border w-15 rounded-2xl text-[12px] cursor-pointer' onClick={()=>{setSortOption('liked')}}>좋아요 순</button>
        </div>  
        </div>
      <div className='mt-6'>
        <BookmarkList bookmarks={bookmarks} search={input} loading = {loading} sortOption = {sortOption} refetch = {refetch}/>
      </div>
      {isAddModalOpen&&<AddBookmarksModal refetch= {refetch} onClose={()=>setIsAddModalOpen(false)}/>}
    </div>
     
  )
}