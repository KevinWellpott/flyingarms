import Link from 'next/link';
import Image from 'next/image';
import { FiYoutube } from 'react-icons/fi';
import { PlaylistData } from '@/types/youtube';

interface PlaylistCardProps {
  playlist: PlaylistData;
  colorGlow?: string;
}

export default function PlaylistCard({ playlist, colorGlow = '#76E4F7' }: PlaylistCardProps) {
  return (
    <Link href={`/playlists/${playlist.id}`} legacyBehavior>
      <a className="block rounded-2xl glass p-4 group overflow-hidden relative border transition-all duration-300 hover:scale-105"
         style={{
           borderColor: `${colorGlow}30`,
           boxShadow: `0 10px 40px ${colorGlow}10`,
         }}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          {playlist.thumbnail_url && (
            <Image
              src={playlist.thumbnail_url}
              alt={`Thumbnail for ${playlist.title}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"></div>
          <div className="absolute top-2 right-2 glass flex items-center gap-2 px-2 py-1 rounded-md text-xs border"
               style={{ borderColor: `${colorGlow}30` }}>
            <FiYoutube className="w-4 h-4" style={{ color: colorGlow }} />
            <span>{playlist.video_count} Videos</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-1 truncate">{playlist.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
      </a>
    </Link>
  );
}
