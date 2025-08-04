export default function Loading() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      <span className="ml-3 text-gray-700">불러오는 중...</span>
    </div>
  );
}