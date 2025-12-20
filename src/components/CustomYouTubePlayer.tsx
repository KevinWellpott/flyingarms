'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize } from 'react-icons/fi';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';
import ProgressBar from '@/components/ui/ProgressBar';
import VolumeSlider from '@/components/ui/VolumeSlider';

interface CustomYouTubePlayerProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  showControls?: boolean;
  colorGlow?: string; // Brand Color für Glow-Effekte
}

export default function CustomYouTubePlayer({
  videoId,
  className = '',
  autoplay = false,
  muted = false,
  showControls = true,
  colorGlow = '#76E4F7',
}: CustomYouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControlsBar, setShowControlsBar] = useState(!autoplay); // Beim Autoplay standardmäßig ausgeblendet
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const {
    playerReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    error,
    play,
    pause,
    seekTo,
    setVolume: setPlayerVolume,
    toggleMute,
    isMuted,
  } = useYouTubePlayer(videoId, {
    autoplay,
    muted,
  });

  // Debug: Log playerReady changes
  useEffect(() => {
    console.log(`[CustomYouTubePlayer ${videoId}] playerReady changed to:`, playerReady, 'isLoading:', isLoading);
  }, [playerReady, isLoading, videoId]);

  // Auto-hide controls beim Autoplay
  useEffect(() => {
    if (!showControls) return;

    // Wenn Video pausiert ist, Controls immer anzeigen
    if (!isPlaying) {
      setShowControlsBar(true);
      return;
    }

    // Beim Autoplay: Controls nach kurzer Zeit ausblenden
    if (autoplay && isPlaying) {
      const timer = setTimeout(() => {
        if (!isHovering) {
          setShowControlsBar(false);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, isHovering, showControls, autoplay]);

  // Fullscreen handling
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement?.tagName !== 'BODY') {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (isPlaying) pause();
          else play();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekTo(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekTo(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setPlayerVolume(Math.min(100, volume + 10));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setPlayerVolume(Math.max(0, volume - 10));
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentTime, duration, volume, toggleFullscreen, toggleMute, play, pause, seekTo, setPlayerVolume]);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (error) {
    return (
      <div className={`relative w-full aspect-video rounded-2xl glass flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <p className="text-red-400 mb-2">Fehler beim Laden des Videos</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video rounded-2xl overflow-hidden glass border ${className}`}
      onMouseEnter={() => {
        setIsHovering(true);
        setShowControlsBar(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        // Beim Autoplay: Controls schnell ausblenden wenn Video läuft
        if (isPlaying && autoplay) {
          setTimeout(() => setShowControlsBar(false), 800);
        }
        // Wenn nicht Autoplay oder Video pausiert: Controls sichtbar lassen
        else if (!isPlaying) {
          setShowControlsBar(true);
        }
      }}
      style={{
        borderColor: `${colorGlow}30`,
        boxShadow: `0 20px 60px ${colorGlow}20`,
      }}
    >
      {/* YouTube IFrame Container */}
      <div 
        id={`youtube-player-${videoId}`} 
        className="absolute inset-0 w-full h-full z-10"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Loading State - Hide when player is ready */}
      {!playerReady && !error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30" style={{ pointerEvents: 'none' }}>
          <div className="text-center">
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 border-4 rounded-full mx-auto mb-4"
              style={{
                borderColor: `${colorGlow}30`,
                borderTopColor: colorGlow,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-xs sm:text-sm font-semibold" style={{ color: colorGlow }}>
              Video wird geladen...
            </p>
          </div>
        </div>
      ) : null}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30">
          <div className="text-center p-4">
            <p className="text-sm font-semibold text-red-400 mb-2">
              Fehler beim Laden des Videos
            </p>
            <p className="text-xs text-whiteAlpha.600">{error}</p>
          </div>
        </div>
      )}

      {/* Custom Controls */}
      {showControls && playerReady && (
        <AnimatePresence>
          {showControlsBar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-20"
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* Progress Bar */}
              <div className="mb-2 sm:mb-4">
                <ProgressBar
                  value={progress}
                  onChange={(value) => seekTo((value / 100) * duration)}
                  className="h-1 sm:h-1.5 hover:h-2 transition-all"
                  colorGlow={colorGlow}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Left Controls */}
                <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => (isPlaying ? pause() : play())}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      isPlaying ? pause() : play();
                    }}
                    className="glass p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-brand/20 transition-all duration-200 hover:scale-105 active:scale-95 border touch-manipulation"
                    style={{
                      borderColor: `${colorGlow}30`,
                    }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <FiPause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: colorGlow }} />
                    ) : (
                      <FiPlay className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: colorGlow }} />
                    )}
                  </button>

                  {/* Time Display */}
                  <div className="text-white text-xs sm:text-sm font-mono font-semibold min-w-[70px] sm:min-w-[90px] md:min-w-[100px] whitespace-nowrap">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                  {/* Volume Control - Hidden on mobile, visible on tablet+ */}
                  <div className="hidden sm:flex items-center gap-2 min-w-[100px] md:min-w-[120px]">
                    <button
                      onClick={toggleMute}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="glass p-1.5 sm:p-2 rounded-lg hover:bg-brand/20 transition-all border touch-manipulation"
                      style={{
                        borderColor: `${colorGlow}30`,
                      }}
                      aria-label={isMuted ? 'Stumm ausschalten' : 'Stumm schalten'}
                    >
                      {isMuted || volume === 0 ? (
                        <FiVolumeX className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colorGlow }} />
                      ) : (
                        <FiVolume2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colorGlow }} />
                      )}
                    </button>
                    <VolumeSlider
                      value={isMuted ? 0 : volume}
                      onChange={(value) => {
                        setPlayerVolume(value);
                        if (value > 0 && isMuted) toggleMute();
                      }}
                      className="flex-1"
                      colorGlow={colorGlow}
                    />
                  </div>

                  {/* Mobile Volume Toggle - Only mute button on mobile */}
                  <button
                    onClick={toggleMute}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="sm:hidden glass p-2 rounded-lg hover:bg-brand/20 transition-all border touch-manipulation"
                    style={{
                      borderColor: `${colorGlow}30`,
                    }}
                    aria-label={isMuted ? 'Stumm ausschalten' : 'Stumm schalten'}
                  >
                    {isMuted || volume === 0 ? (
                      <FiVolumeX className="w-4 h-4" style={{ color: colorGlow }} />
                    ) : (
                      <FiVolume2 className="w-4 h-4" style={{ color: colorGlow }} />
                    )}
                  </button>

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={toggleFullscreen}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="glass p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-brand/20 transition-all duration-200 hover:scale-105 active:scale-95 border touch-manipulation"
                    style={{
                      borderColor: `${colorGlow}30`,
                    }}
                    aria-label={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
                  >
                    {isFullscreen ? (
                      <FiMinimize className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colorGlow }} />
                    ) : (
                      <FiMaximize className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colorGlow }} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </div>
  );
}

