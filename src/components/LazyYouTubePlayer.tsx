'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import CustomYouTubePlayer from './CustomYouTubePlayer';

interface LazyYouTubePlayerProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  className?: string;
  colorGlow?: string;
}

export default function LazyYouTubePlayer({
  videoId,
  thumbnailUrl,
  title,
  className = '',
  colorGlow = '#76E4F7',
}: LazyYouTubePlayerProps) {
  const [isActivated, setIsActivated] = useState(false);

  if (!isActivated) {
    return (
      <div
        className={`relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group ${className}`}
        onClick={() => setIsActivated(true)}
        style={{
          borderColor: `${colorGlow}30`,
          boxShadow: `0 10px 40px ${colorGlow}10`,
        }}
      >
        <Image
          src={thumbnailUrl}
          alt={`Thumbnail for ${title}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="glass p-4 md:p-6 rounded-full border transition-all duration-300 group-hover:scale-110"
            style={{
              borderColor: `${colorGlow}50`,
              boxShadow: `0 0 20px ${colorGlow}40`,
            }}
          >
            <FiPlay className="w-8 h-8 md:w-12 md:h-12 text-white" style={{ color: colorGlow }} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">{title}</h3>
        </div>
      </div>
    );
  }

  return (
    <CustomYouTubePlayer
      videoId={videoId}
      className={className}
      autoplay={true}
      muted={false}
      showControls={true}
      colorGlow={colorGlow}
    />
  );
}
