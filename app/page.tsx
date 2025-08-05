import { adminDB } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snapshot = await adminDB.collection("recommendedBookmarks").get();
  const bookmarks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
  return (
    <main className="max-w-[800px] mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-center">📌 추천 북마크</h1>
      <div className="gap-4 space-y-4 cursor-pointer columns-1 sm:columns-2">
        {bookmarks.map((bm: any) => (
      <a
        key={bm.id}
        href={bm.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 border rounded-2xl break-inside-avoid hover:bg-gray-200"
      >
        <img src={bm.image} alt={bm.title} className="w-full h-auto mb-2 rounded-2xl" />
        <h2 className="text-lg font-semibold">{bm.title}</h2>
        <p className="text-sm text-gray-600">{bm.description}</p>
      </a>
    ))}
      </div>
    </main>
  );
}
