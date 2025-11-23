'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerOptions {
  autoplay?: boolean;
  muted?: boolean;
}

interface UseYouTubePlayerReturn {
  playerReady: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  isMuted: boolean;
}

export function useYouTubePlayer(
  videoId: string,
  options: YouTubePlayerOptions = {}
): UseYouTubePlayerReturn {
  const playerRef = useRef<any>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(options.muted || false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initializePlayer = useCallback(() => {
    if (!window.YT || !window.YT.Player) {
      console.error('YouTube API not loaded');
      setIsLoading(false);
      setError('YouTube API nicht geladen');
      return;
    }

    const containerId = `youtube-player-${videoId}`;
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('YouTube container not found:', containerId);
      // Versuche es nochmal nach kurzer Verzögerung
      setTimeout(() => {
        const retryContainer = document.getElementById(containerId);
        if (retryContainer) {
          initializePlayer();
        } else {
          setIsLoading(false);
          setError('YouTube Container nicht gefunden');
        }
      }, 500);
      return;
    }

    // Stelle sicher, dass der Container sichtbar ist und Größe hat
    const checkSize = () => {
      const rect = container.getBoundingClientRect();
      const styles = window.getComputedStyle(container);
      const width = parseFloat(styles.width) || rect.width;
      const height = parseFloat(styles.height) || rect.height;
      
      console.log('YouTube container dimensions:', {
        width: width,
        height: height,
        rectWidth: rect.width,
        rectHeight: rect.height,
        computedWidth: styles.width,
        computedHeight: styles.height,
        containerId,
        videoId
      });

      // Prüfe sowohl rect als auch computed styles
      if ((rect.width === 0 || rect.height === 0) && (width === 0 || height === 0)) {
        return false;
      }
      return true;
    };

      // Prüfe sofort - wenn keine Größe, setze eine minimale Größe
    if (!checkSize()) {
      console.warn('YouTube container has no size, setting minimum size...');
      
      // Setze eine minimale Größe für den Container
      container.style.minWidth = '320px';
      container.style.minHeight = '180px';
      container.style.width = '100%';
      container.style.height = '100%';
      
      // Prüfe nochmal nach kurzer Verzögerung
      setTimeout(() => {
        if (!checkSize()) {
          console.warn('Container still has no size, using ResizeObserver...');
          
          // Verwende ResizeObserver falls verfügbar
          if (window.ResizeObserver) {
            let observerTimeout: NodeJS.Timeout;
            const observer = new ResizeObserver((entries) => {
              for (const entry of entries) {
                const width = entry.contentRect.width;
                const height = entry.contentRect.height;
                
                if (width > 0 && height > 0) {
                  observer.disconnect();
                  if (observerTimeout) clearTimeout(observerTimeout);
                  console.log('Container has size now, initializing player:', { width, height });
                  setTimeout(() => initializePlayer(), 100);
                  return;
                }
              }
            });
            
            observer.observe(container);
            
            // Timeout als Fallback
            observerTimeout = setTimeout(() => {
              observer.disconnect();
              if (!checkSize()) {
                setIsLoading(false);
                setError('YouTube Container hat keine Größe nach 5 Sekunden');
              } else {
                console.log('Container has size after timeout, initializing player');
                initializePlayer();
              }
            }, 5000);
            
            return;
          } else {
            // Fallback: Mehrere Versuche mit zunehmenden Delays
            let attempts = 0;
            const maxAttempts = 10;
            const checkInterval = setInterval(() => {
              attempts++;
              if (checkSize()) {
                clearInterval(checkInterval);
                setTimeout(() => initializePlayer(), 100);
              } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                setIsLoading(false);
                setError('YouTube Container hat keine Größe');
              }
            }, 500);
            return;
          }
        } else {
          // Container hat jetzt Größe, initialisiere
          setTimeout(() => initializePlayer(), 100);
          return;
        }
      }, 200);
      return;
    }

    const rect = container.getBoundingClientRect();

    try {
      // Zerstöre vorherigen Player falls vorhanden
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore
        }
      }

      console.log('Initializing YouTube Player with:', {
        videoId,
        autoplay: options.autoplay,
        muted: options.muted,
        containerId
      });

      // Stelle sicher, dass wir mindestens eine minimale Größe haben
      const playerWidth = Math.max(rect.width || 640, 320);
      const playerHeight = Math.max(rect.height || 360, 180);

      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        width: playerWidth,
        height: playerHeight,
        playerVars: {
          autoplay: options.autoplay ? 1 : 0,
          mute: options.muted ? 1 : 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          loop: 0,
          iv_load_policy: 3,
          fs: 0,
          cc_load_policy: 0,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (event: any) => {
            const iframe = event.target.getIframe();
            const iframeElement = document.getElementById(containerId)?.querySelector('iframe');
            
            console.log('YouTube Player ready:', {
              videoId,
              duration: event.target.getDuration(),
              isMuted: event.target.isMuted(),
              iframe: iframe ? 'exists' : 'missing',
              iframeElement: iframeElement ? 'exists' : 'missing',
              iframeSize: iframeElement ? {
                width: iframeElement.offsetWidth,
                height: iframeElement.offsetHeight,
                display: window.getComputedStyle(iframeElement).display,
                visibility: window.getComputedStyle(iframeElement).visibility,
                opacity: window.getComputedStyle(iframeElement).opacity,
              } : null
            });
            
            setPlayerReady(true);
            setIsLoading(false);
            setDuration(event.target.getDuration());
            setVolume(event.target.getVolume());
            setIsMuted(event.target.isMuted());
            
            // Explizit Video starten wenn autoplay aktiviert ist
            if (options.autoplay) {
              try {
                // Stelle sicher, dass das Video stumm ist (für Browser-Autoplay-Policy)
                if (options.muted) {
                  event.target.mute();
                  setIsMuted(true);
                  console.log('Video muted for autoplay');
                }
                
                // Kurze Verzögerung um sicherzustellen, dass der Player vollständig bereit ist
                setTimeout(() => {
                  console.log('Attempting to play video...');
                  
                  // Stelle sicher, dass der Container eine Größe hat
                  const container = document.getElementById(containerId);
                  if (container) {
                    const rect = container.getBoundingClientRect();
                    if (rect.width === 0 || rect.height === 0) {
                      console.warn('Container has no size, waiting...');
                      // Warte bis Container Größe hat
                      const checkSize = setInterval(() => {
                        const newRect = container.getBoundingClientRect();
                        if (newRect.width > 0 && newRect.height > 0) {
                          clearInterval(checkSize);
                          event.target.playVideo();
                          setIsPlaying(true);
                        }
                      }, 100);
                      
                      // Timeout nach 3 Sekunden
                      setTimeout(() => clearInterval(checkSize), 3000);
                      return;
                    }
                  }
                  
                  event.target.playVideo();
                  setIsPlaying(true);
                  
                  // Prüfe nach kurzer Zeit ob das Video wirklich läuft
                  setTimeout(() => {
                    const state = event.target.getPlayerState();
                    console.log('Player state after playVideo:', state);
                    console.log('Player state constants:', {
                      UNSTARTED: window.YT.PlayerState.UNSTARTED,
                      ENDED: window.YT.PlayerState.ENDED,
                      PLAYING: window.YT.PlayerState.PLAYING,
                      PAUSED: window.YT.PlayerState.PAUSED,
                      BUFFERING: window.YT.PlayerState.BUFFERING,
                      CUED: window.YT.PlayerState.CUED,
                    });
                    
                    if (state === window.YT.PlayerState.PLAYING) {
                      setIsPlaying(true);
                    } else if (state === window.YT.PlayerState.BUFFERING) {
                      // Wenn BUFFERING, warte etwas länger und prüfe nochmal
                      console.log('Video is buffering, waiting...');
                      setTimeout(() => {
                        const newState = event.target.getPlayerState();
                        if (newState === window.YT.PlayerState.PLAYING) {
                          setIsPlaying(true);
                        } else if (newState === window.YT.PlayerState.BUFFERING) {
                          // Versuche nochmal zu spielen
                          console.log('Still buffering, retrying play...');
                          event.target.playVideo();
                        }
                      }, 1000);
                    } else {
                      console.warn('Video did not start playing, state:', state);
                      // Retry nach 1 Sekunde
                      setTimeout(() => {
                        console.log('Retrying play after state check...');
                        event.target.playVideo();
                      }, 1000);
                    }
                  }, 1000);
                }, 1000);
              } catch (e) {
                console.error('Error starting video:', e);
                // Fallback: Versuche es nochmal nach einer weiteren Verzögerung
                setTimeout(() => {
                  try {
                    console.log('Retrying to play video...');
                    event.target.playVideo();
                    setIsPlaying(true);
                  } catch (e2) {
                    console.error('Error starting video (retry):', e2);
                  }
                }, 1000);
              }
            }
            
            // Start time update interval
            intervalRef.current = setInterval(() => {
              try {
                const currentTimeValue = event.target.getCurrentTime();
                setCurrentTime(currentTimeValue);
                
                const playerState = event.target.getPlayerState();
                if (playerState === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (playerState === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                }
              } catch (e) {
                // Ignore errors during playback
              }
            }, 100);
          },
          onStateChange: (event: any) => {
            const state = event.data;
            console.log('YouTube Player state changed:', state);
            
            if (state === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (state === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (state === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            } else if (state === window.YT.PlayerState.BUFFERING) {
              // Wenn BUFFERING und autoplay aktiviert ist, warte kurz und prüfe nochmal
              if (options.autoplay && !isPlaying) {
                setTimeout(() => {
                  const currentState = event.target.getPlayerState();
                  if (currentState === window.YT.PlayerState.BUFFERING) {
                    // Versuche nochmal zu spielen wenn immer noch buffering
                    try {
                      event.target.playVideo();
                    } catch (e) {
                      console.error('Error retrying play from BUFFERING state:', e);
                    }
                  }
                }, 2000);
              }
            } else if (state === window.YT.PlayerState.CUED) {
              // Wenn CUED und autoplay aktiviert, versuche zu spielen
              if (options.autoplay && !isPlaying) {
                setTimeout(() => {
                  try {
                    event.target.playVideo();
                  } catch (e) {
                    console.error('Error playing from CUED state:', e);
                  }
                }, 500);
              }
            }
          },
          onError: (event: any) => {
            console.error('YouTube Player Error:', event.data);
            setIsLoading(false);
            setError(`Fehler beim Laden des Videos: ${event.data}`);
          },
        },
      });
    } catch (e) {
      setIsLoading(false);
      setError('Fehler beim Initialisieren des Players');
    }
  }, [videoId, options.autoplay, options.muted]);

  // Load YouTube IFrame API
  useEffect(() => {
    // Prevent multiple initializations
    if (!videoId) return;

    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Check if script is already loading
    if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      // Script is already loading, wait for it
      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {
          initializePlayer();
        };
      }
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (originalCallback) originalCallback();
      initializePlayer();
    };

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
      }
    };
  }, [videoId, initializePlayer]);

  const play = useCallback(() => {
    if (playerRef.current && playerReady) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        setError('Fehler beim Abspielen');
      }
    }
  }, [playerReady]);

  const pause = useCallback(() => {
    if (playerRef.current && playerReady) {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (e) {
        setError('Fehler beim Pausieren');
      }
    }
  }, [playerReady]);

  const seekTo = useCallback(
    (seconds: number) => {
      if (playerRef.current && playerReady) {
        try {
          playerRef.current.seekTo(seconds, true);
          setCurrentTime(seconds);
        } catch (e) {
          setError('Fehler beim Springen');
        }
      }
    },
    [playerReady]
  );

  const handleSetVolume = useCallback(
    (vol: number) => {
      if (playerRef.current && playerReady) {
        try {
          playerRef.current.setVolume(vol);
          setVolume(vol);
          if (vol > 0 && isMuted) {
            playerRef.current.unMute();
            setIsMuted(false);
          }
        } catch (e) {
          setError('Fehler beim Ändern der Lautstärke');
        }
      }
    },
    [playerReady, isMuted]
  );

  const toggleMute = useCallback(() => {
    if (playerRef.current && playerReady) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch (e) {
        setError('Fehler beim Umschalten der Stummschaltung');
      }
    }
  }, [playerReady, isMuted]);

  return {
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
    setVolume: handleSetVolume,
    toggleMute,
    isMuted,
  };
}

