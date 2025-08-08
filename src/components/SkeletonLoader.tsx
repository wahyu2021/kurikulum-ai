export function SkeletonLoader() {
  return (
    <div className="mt-10 space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}