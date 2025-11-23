'use client';

import { useState } from 'react';
import { FiPlay } from 'react-icons/fi';

export default function LazyYouTubePlayer({ videoId, title }: { videoId: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isPlaying) {
    return (
      <div
        className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer relative group overflow-hidden border border-white/10"
        onClick={() => setIsPlaying(true)}
      >
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-brand/80 transition-colors duration-300 scale-100 group-hover:scale-110 border border-white/20">
            <FiPlay className="w-10 h-10 text-white ml-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
