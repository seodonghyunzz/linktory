import BookmarkCard from '../component/BookmarkCard';
import { Bookmark } from '@/lib/types';
import Loading from '../component/Loading';

type Props = {
    bookmarks: Bookmark[];
    currentUser?: string;
    search: string;
    loading: boolean;
    refetch: ()=>void;
}


export default function BookmarkList({ bookmarks,  search, loading , currentUser, refetch}: Props) {
  if (loading) return <Loading/>

  const filtered = bookmarks.filter((bm) =>
    bm.title?.toLowerCase().includes(search.toLowerCase())||
    bm.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0) return <p>검색 결과가 없습니다.</p>;


  return (
    <>
      {filtered.map((bm) => (
        <BookmarkCard key={bm.id} data={bm} currentUser={currentUser} />
      ))}
    </>
  );
}