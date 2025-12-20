'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface VolumeSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  className?: string;
  colorGlow?: string;
}

export default function VolumeSlider({ value, onChange, className = '', colorGlow = '#76E4F7' }: VolumeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !isDragging) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onChange(percentage);
    },
    [isDragging, onChange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onChange(percentage);
    },
    [onChange]
  );

  return (
    <div
      ref={sliderRef}
      className={`relative h-1 cursor-pointer group touch-none ${className}`}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMouseMove(e);
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={(e) => {
        e.preventDefault();
        setIsDragging(true);
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX);
        }
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
      onClick={handleClick}
    >
      {/* Background Track */}
      <div className="w-full h-full bg-white/20 rounded-full overflow-hidden">
        {/* Volume Fill */}
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colorGlow}, ${colorGlow}dd)`,
            boxShadow: `0 0 8px ${colorGlow}60`,
          }}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: isDragging ? 0 : 0.1 }}
        />
      </div>

      {/* Thumb */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          left: `calc(${value}% - 6px)`,
          backgroundColor: colorGlow,
          boxShadow: `0 0 0 2px ${colorGlow}30`,
        }}
        whileHover={{ scale: 1.3 }}
        whileDrag={{ scale: 1.4 }}
      />
    </div>
  );
}

