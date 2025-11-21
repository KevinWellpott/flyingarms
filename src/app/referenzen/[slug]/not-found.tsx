import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Referenz nicht gefunden
        </h1>
        <p className="text-gray-300 mb-8">
          Die angeforderte Referenz konnte nicht gefunden werden.
        </p>
        <Link
          href="/referenzen"
          className="inline-block px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
        >
          Zurück zu allen Referenzen
        </Link>
      </div>
    </main>
  );
}

