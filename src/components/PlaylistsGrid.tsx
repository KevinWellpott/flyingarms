import { PlaylistData } from '@/types/youtube';
import PlaylistCard from './PlaylistCard';

interface PlaylistsGridProps {
  playlists: PlaylistData[];
}

export default function PlaylistsGrid({ playlists }: PlaylistsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
