import { getCachedPlaylists } from '@/lib/cache';
import PlaylistsGrid from '@/components/PlaylistsGrid';

// Revalidate every 24 hours
export const revalidate = 86400; 

export default async function PlaylistsPage() {
  const playlists = await getCachedPlaylists();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Unsere Video-Playlists</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Entdecken Sie unsere Projekte, sortiert in thematischen Playlists direkt von unserem YouTube-Kanal.
        </p>
      </header>
      
      <main>
        {playlists && playlists.length > 0 ? (
          <PlaylistsGrid playlists={playlists} />
        ) : (
          <div className="text-center text-gray-400">
            <p>Aktuell konnten keine Playlists geladen werden. Bitte versuchen Sie es später erneut.</p>
          </div>
        )}
      </main>
    </div>
  );
}
