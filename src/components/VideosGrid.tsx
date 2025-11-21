import { VideoData } from '@/types/youtube';
import VideoCard from './VideoCard';

interface VideosGridProps {
  videos: VideoData[];
}

export default function VideosGrid({ videos }: VideosGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
