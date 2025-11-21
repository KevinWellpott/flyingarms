'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  className?: string;
  colorGlow?: string;
}

export default function ProgressBar({ value, onChange, className = '', colorGlow = '#76E4F7' }: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current || !isDragging) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onChange(percentage);
    },
    [isDragging, onChange]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onChange(percentage);
    },
    [onChange]
  );

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setHoverValue(percentage);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  return (
    <div
      ref={barRef}
      className={`relative w-full cursor-pointer group ${className}`}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMouseMove(e);
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => {
        setIsDragging(false);
        handleMouseLeave();
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
    >
      {/* Background Track */}
      <div className="w-full h-full bg-white/20 rounded-full overflow-hidden">
        {/* Progress Fill */}
        <motion.div
          className="h-full rounded-full relative"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colorGlow}, ${colorGlow}dd)`,
            boxShadow: `0 0 10px ${colorGlow}80`,
          }}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: isDragging ? 0 : 0.1 }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 blur-sm" style={{ backgroundColor: `${colorGlow}50` }} />
        </motion.div>

        {/* Hover Indicator */}
        {hoverValue !== null && (
          <motion.div
            className="absolute top-0 bottom-0 w-0.5"
            style={{ left: `${hoverValue}%`, backgroundColor: `${colorGlow}60` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>

      {/* Thumb */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          left: `calc(${value}% - 8px)`,
          backgroundColor: colorGlow,
          boxShadow: `0 0 0 3px ${colorGlow}30`,
        }}
        whileHover={{ scale: 1.2 }}
        whileDrag={{ scale: 1.3 }}
      />
    </div>
  );
}

