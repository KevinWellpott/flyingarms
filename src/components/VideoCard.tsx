import { VideoData } from '@/types/youtube';
import LazyYouTubePlayer from './LazyYouTubePlayer';

interface VideoCardProps {
  video: VideoData;
  colorGlow?: string;
}

export default function VideoCard({ video, colorGlow = '#76E4F7' }: VideoCardProps) {
  if (!video.video_id || !video.title) {
    return null;
  }

  return (
    <div className="rounded-2xl glass p-4 group relative border transition-all duration-300"
         style={{
           borderColor: `${colorGlow}30`,
           boxShadow: `0 10px 40px ${colorGlow}10`,
         }}
    >
      <div className="relative mb-4">
        <LazyYouTubePlayer videoId={video.video_id} title={video.title} />
      </div>
      <h3 className="font-bold text-lg mb-1 truncate">{video.title}</h3>
      {video.description && (
         <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
      )}
    </div>
  );
}
