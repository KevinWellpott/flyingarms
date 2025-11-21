import { VideoData } from '@/types/youtube';
import LazyYouTubePlayer from './LazyYouTubePlayer';
import { FiCalendar } from 'react-icons/fi';

interface VideoCardProps {
  video: VideoData;
  colorGlow?: string;
}

export default function VideoCard({ video, colorGlow = '#76E4F7' }: VideoCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {video.video_id && video.thumbnail_url && video.title && (
        <LazyYouTubePlayer
          videoId={video.video_id}
          thumbnailUrl={video.thumbnail_url}
          title={video.title}
          colorGlow={colorGlow}
        />
      )}
      <div>
        <h3 className="font-bold text-lg mb-1">{video.title}</h3>
        {video.published_at && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FiCalendar className="w-4 h-4" />
            <span>{formatDate(video.published_at)}</span>
          </div>
        )}
        <p className="text-gray-400 text-sm mt-2 line-clamp-3">{video.description}</p>
      </div>
    </div>
  );
}
