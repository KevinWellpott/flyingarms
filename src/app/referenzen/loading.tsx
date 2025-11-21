export default function Loading() {
  return (
    <main className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-96 bg-gray-800 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
}

