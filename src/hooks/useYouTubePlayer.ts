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
  instanceId?: string; // Eindeutige ID für diese Player-Instanz
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
    // Reset states before initializing new player
    setPlayerReady(false);
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    
    if (!window.YT || !window.YT.Player) {
      console.error('YouTube API not loaded');
      setIsLoading(false);
      setError('YouTube API nicht geladen');
      return;
    }

    // Use unique ID that includes instanceId to avoid conflicts between Desktop and Mobile instances
    const containerId = options.instanceId 
      ? `youtube-player-${videoId}-${options.instanceId}` 
      : `youtube-player-${videoId}`;
    
    console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Looking for container:`, containerId);
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] YouTube container not found:`, containerId);
      console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Available containers in DOM:`, 
        Array.from(document.querySelectorAll('[id^="youtube-player-"]')).map(el => el.id)
      );
      // Versuche es nochmal nach kurzer Verzögerung
      setTimeout(() => {
        const retryContainer = document.getElementById(containerId);
        if (retryContainer) {
          console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Container found on retry, initializing...`);
          initializePlayer();
        } else {
          console.error(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Container still not found after retry`);
          setIsLoading(false);
          setError('YouTube Container nicht gefunden');
        }
      }, 500);
      return;
    }
    
    console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Container found, proceeding with initialization`);
    
    const rect = container.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(container);
    console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Container dimensions:`, {
      width: rect.width,
      height: rect.height,
      display: computedStyle.display,
      visibility: computedStyle.visibility,
      opacity: computedStyle.opacity
    });

    // Wenn Container ausgeblendet ist (display: none), warte bis er sichtbar ist
    if (computedStyle.display === 'none' || rect.width === 0 || rect.height === 0) {
      console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Container is hidden or has zero size, waiting...`);
      // Versuche es nach einer Verzögerung nochmal
      const checkInterval = setInterval(() => {
        const newRect = container.getBoundingClientRect();
        const newStyle = window.getComputedStyle(container);
        if (newStyle.display !== 'none' && newRect.width > 0 && newRect.height > 0) {
          console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Container is now visible, initializing...`);
          clearInterval(checkInterval);
          initializePlayer();
        }
      }, 200);
      
      // Timeout nach 5 Sekunden
      setTimeout(() => {
        clearInterval(checkInterval);
        if (computedStyle.display === 'none' || rect.width === 0 || rect.height === 0) {
          console.warn(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Container still hidden after timeout, initializing anyway`);
          // Initialisiere trotzdem - YouTube kann auch mit 0x0 umgehen
        }
      }, 5000);
      
      // Initialisiere trotzdem, falls Container später sichtbar wird
      // YouTube Player kann auch mit ausgeblendeten Containern umgehen
    }

    try {
      // Zerstöre vorherigen Player falls vorhanden
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore
        }
      }

      console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Initializing YouTube Player with:`, {
        videoId,
        autoplay: options.autoplay,
        muted: options.muted,
        containerId,
        instanceId: options.instanceId
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
            
            // Setze playerReady zuerst, damit das Loading-Overlay sofort verschwindet
            setPlayerReady(true);
            setIsLoading(false);
            console.log('Player ready state set to true for videoId:', videoId);
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
  }, [videoId, options.autoplay, options.muted, options.instanceId]);

  // Reset states when videoId or instanceId changes
  useEffect(() => {
    setPlayerReady(false);
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [videoId, options.instanceId]);

  // Load YouTube IFrame API
  useEffect(() => {
    // Prevent multiple initializations
    if (!videoId) return;

    console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Setting up YouTube API, YT available:`, !!window.YT);

    if (window.YT && window.YT.Player) {
      // API already loaded, initialize immediately
      // Add small delay to ensure DOM is ready
      setTimeout(() => {
        console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] YT API ready, calling initializePlayer`);
        initializePlayer();
      }, 100);
      return;
    }

    // Check if script is already loading
    if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      // Script is already loading, wait for it
      console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] YouTube script already loading, setting up callback`);
      
      // Store original callback if it exists
      const originalCallback = window.onYouTubeIframeAPIReady;
      
      // Create new callback that calls both original and our initializePlayer
      window.onYouTubeIframeAPIReady = () => {
        console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] onYouTubeIframeAPIReady called`);
        if (originalCallback) {
          originalCallback();
        }
        // Add delay to ensure DOM is ready
        setTimeout(() => {
          initializePlayer();
        }, 100);
      };
      return;
    }

    console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] Loading YouTube iframe API script`);
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      console.log(`[useYouTubePlayer ${videoId}${options.instanceId ? `-${options.instanceId}` : ''}] onYouTubeIframeAPIReady called (script just loaded)`);
      if (originalCallback) originalCallback();
      // Add delay to ensure DOM is ready
      setTimeout(() => {
        initializePlayer();
      }, 100);
    };

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
          playerRef.current = null;
        } catch (e) {
          // Ignore destroy errors
        }
      }
      // Reset states on cleanup
      setPlayerReady(false);
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
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

