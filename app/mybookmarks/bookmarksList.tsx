import Loading from '../component/Loading';
import MyBookmarkCard from './myBookmarksCard';

type Props = {
  bookmarks: any[];
  loading: boolean;
  search: string;
  sortOption: string;
  refetch: ()=>void;
};

export default function BookmarkList({ bookmarks, loading, search, sortOption, refetch}: Props) {
  if (loading) return <Loading/>

  const filtered = bookmarks.filter((bm) =>
    bm.title?.toLowerCase().includes(search.toLowerCase())||
    bm.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0) return <p>검색 결과가 없습니다.</p>;

  const sorted = [...filtered].sort((a,b)=>{
        if(sortOption==='liked') return b.liked - a.liked;
        return b.createdAt.seconds-a.createdAt.seconds;
    })


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {sorted.map((bm) => (
        <MyBookmarkCard key={bm.id} data={bm} refetch={refetch} />
      ))}
    </div>
  );
}