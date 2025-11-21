export default function Loading() {
  const shimmer = `relative overflow-hidden rounded-2xl glass p-4 border border-brand/20 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-brand/10 before:to-transparent`;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <div className="h-10 bg-gray-700 rounded-md w-2/3 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-800 rounded-md w-1/2 mx-auto"></div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={shimmer}>
            <div className="relative aspect-video rounded-lg bg-gray-700 mb-4"></div>
            <div className="h-6 bg-gray-700 rounded-md w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded-md w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
