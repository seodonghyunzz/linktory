export const dynamic = "force-dynamic";

export default async function Home() {
  
  const bookmarks = await getRecommendedBookmarks();
  
  return (
    <main className="max-w-[800px] mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-center">📌 추천 북마크</h1>
      <div className="gap-4 space-y-4 cursor-pointer columns-1 sm:columns-2">
        {bookmarks.map((bm: any) => (
      <a
        key={bm.name}
        href={bm.fields.url.stringValue}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 border rounded-2xl break-inside-avoid hover:bg-gray-200"
      >
        <img src={bm.fields.image.stringValue} alt={bm.fields.title.stringValue} className="w-full h-auto mb-2 rounded-2xl" />
        <h2 className="text-lg font-semibold">{bm.fields.title.stringValue}</h2>
        <p className="text-sm text-gray-600">{bm.fields.description.stringValue}</p>
      </a>
    ))}
      </div>
    </main>
  );
}
async function getRecommendedBookmarks() {
  const url = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/recommendedBookmarks`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch Firestore data");
  }

  const data = await res.json();
  return data.documents || [];
}