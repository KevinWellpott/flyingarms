import { getCachedPlaylistVideos, getCachedPlaylists } from '@/lib/cache';
import VideosGrid from '@/components/VideosGrid';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const revalidate = 86400; // Revalidate every 24 hours

type Props = {
  params: { playlistId: string };
};

// This function generates the static paths at build time.
export async function generateStaticParams() {
  const playlists = await getCachedPlaylists();
  return playlists.map((playlist) => ({
    playlistId: playlist.id,
  }));
}

export default async function PlaylistDetailPage({ params }: Props) {
  const { playlistId } = params;
  const videos = await getCachedPlaylistVideos(playlistId);
  
  // Also fetch playlist details for the hero section
  const playlists = await getCachedPlaylists();
  const playlist = playlists.find(p => p.id === playlistId);

  if (!playlist) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="mb-12 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
                {playlist.thumbnail_url && (
                    <Image
                        src={playlist.thumbnail_url}
                        alt={`Thumbnail for ${playlist.title}`}
                        width={1280}
                        height={720}
                        className="rounded-2xl aspect-video object-cover"
                    />
                )}
            </div>
            <div className="md:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{playlist.title}</h1>
                <p className="text-lg text-gray-400 mb-4">{playlist.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span>{playlist.video_count} Videos</span>
                </div>
            </div>
        </div>
      </header>
      
      <main>
        {videos && videos.length > 0 ? (
          <VideosGrid videos={videos} />
        ) : (
          <div className="text-center text-gray-400">
            <p>Für diese Playlist konnten keine Videos geladen werden.</p>
          </div>
        )}
      </main>
    </div>
  );
}
