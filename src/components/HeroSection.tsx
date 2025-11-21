'use client';

import { Reference } from '@/types/reference';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomYouTubePlayer from './CustomYouTubePlayer';
import { getGlowStyle } from '@/lib/utils';

interface HeroSectionProps {
  reference: Reference;
}

export default function HeroSection({ reference }: HeroSectionProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  // Debug: Prüfe ob challenges vorhanden ist
  useEffect(() => {
    console.log('HeroSection - Reference data:', {
      title: reference.title,
      hasChallenges: 'challenges' in reference,
      challenges: reference.challenges,
      challengesLength: reference.challenges?.length,
      description_text: reference.description_text,
    });
  }, [reference]);

  useEffect(() => {
    const loadLogo = async () => {
      if (reference.logo_path) {
        try {
          // Bereinige den Pfad: Entferne "logos/" Präfix falls vorhanden
          let cleanPath = reference.logo_path;
          while (cleanPath.startsWith('logos/')) {
            cleanPath = cleanPath.replace(/^logos\//, '');
          }
          
          // Da die Logos möglicherweise im Ordner "logos" innerhalb des Buckets "logos" sind,
          // müssen wir "logos/XY.svg" als Pfad angeben (falls nötig)
          // Aber zuerst versuchen wir den bereinigten Pfad
          const storagePath = cleanPath;
          
          console.log('HeroSection - Original logo_path:', reference.logo_path);
          console.log('HeroSection - Cleaned path:', cleanPath);
          console.log('HeroSection - Storage path:', storagePath);
          
          // Hole eine signierte URL über die API-Route (mit Authentifizierung)
          const response = await fetch('/api/storage/signed-url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bucket: 'logos',
              path: storagePath,
            }),
          });

          if (!response.ok) {
            console.error('Error fetching signed URL for logo:', await response.text());
            // Fallback: Versuche mit "logos/" Präfix
            const fallbackPath = `logos/${cleanPath}`;
            const fallbackResponse = await fetch('/api/storage/signed-url', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bucket: 'logos',
                path: fallbackPath,
              }),
            });
            
            if (fallbackResponse.ok) {
              const fallbackResult = await fallbackResponse.json();
              setLogoUrl(fallbackResult.url);
            } else {
              // Letzter Fallback: Versuche normale Public URL
              const { data } = supabase.storage
                .from('logos')
                .getPublicUrl(storagePath);
              setLogoUrl(data.publicUrl);
            }
          } else {
            const result = await response.json();
            console.log('HeroSection - Generated signed URL:', result.url);
            setLogoUrl(result.url);
          }
        } catch (error) {
          console.error('Error loading logo:', error);
          // Fallback: Versuche normale Public URL
          const { data } = supabase.storage
            .from('logos')
            .getPublicUrl(reference.logo_path);
          setLogoUrl(data.publicUrl);
        }
      }
      setIsLoading(false);
    };

    loadLogo();
  }, [reference]);

  useEffect(() => {
    // Extrahiere YouTube Video ID aus verschiedenen URL-Formaten
    const extractVideoId = (videoIdOrUrl: string | undefined | null): string | null => {
      if (!videoIdOrUrl) return null;

      // Wenn es bereits eine reine Video-ID ist (11 Zeichen, alphanumerisch)
      if (/^[a-zA-Z0-9_-]{11}$/.test(videoIdOrUrl)) {
        return videoIdOrUrl;
      }

      // Extrahiere Video-ID aus verschiedenen YouTube-URL-Formaten
      let videoId = '';
      
      // Format: https://www.youtube.com/watch?v=VIDEO_ID
      if (videoIdOrUrl.includes('youtube.com/watch?v=')) {
        const match = videoIdOrUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        videoId = match ? match[1] : '';
      }
      // Format: https://youtu.be/VIDEO_ID
      else if (videoIdOrUrl.includes('youtu.be/')) {
        const match = videoIdOrUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        videoId = match ? match[1] : '';
      }
      // Format: https://www.youtube.com/embed/VIDEO_ID
      else if (videoIdOrUrl.includes('youtube.com/embed/')) {
        const match = videoIdOrUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
        videoId = match ? match[1] : '';
      }
      // Format: https://www.youtube.com/v/VIDEO_ID
      else if (videoIdOrUrl.includes('youtube.com/v/')) {
        const match = videoIdOrUrl.match(/\/v\/([a-zA-Z0-9_-]{11})/);
        videoId = match ? match[1] : '';
      }
      // Wenn nichts passt, versuche es als Video-ID zu verwenden
      else {
        videoId = videoIdOrUrl.trim();
      }

      if (!videoId || videoId.length !== 11) {
        console.warn('Ungültige YouTube Video-ID:', videoIdOrUrl);
        return null;
      }

      return videoId;
    };

    setYoutubeVideoId(extractVideoId(reference.youtube_video_id));
  }, [reference.youtube_video_id]);

  const glowStyle = getGlowStyle(reference.color_glow || '#76E4F7', 'medium');
  const glowColor = reference.color_glow || '#76E4F7';
  
  // Konvertiere Hex zu RGB für transparenten Hintergrund
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 118, g: 228, b: 247 }; // Fallback zu #76E4F7
  };
  
  const rgb = hexToRgb(glowColor);

  return (
    <section className="relative w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full text-center">
          {/* Logo - kleiner */}
          {logoUrl && !isLoading && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={logoUrl}
                  alt={`${reference.title} Logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
            </div>
          )}

          {/* Titel in Glassmorphism-Kasten mit transparentem Hintergrund in color_glow Farbe */}
          <div 
            className="rounded-2xl px-6 py-2 md:px-8 md:py-3 mb-4 inline-block backdrop-blur-md"
            style={{
              background: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05))`,
              border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
              boxShadow: `0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), 0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`,
            }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {reference.title}
            </h1>
          </div>

          {/* Untertitel - kleiner */}
          {reference.subtitle && (
            <p className="text-base md:text-lg text-gray-300 mb-12">
              {reference.subtitle}
            </p>
          )}

          {/* Video Player und Info-Kasten in Grid (80% Breite, gleiche Höhe) */}
          <div className="w-full max-w-[80%] mx-auto mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
              {/* Links: Video Player (8/12 = 2/3 der Breite) */}
              <div className="lg:col-span-8 h-full">
                {youtubeVideoId ? (
                  <div className="h-full w-full">
                    <CustomYouTubePlayer
                      videoId={youtubeVideoId}
                      autoplay={true}
                      muted={true}
                      showControls={true}
                      colorGlow={reference.color_glow || '#76E4F7'}
                    />
                  </div>
                ) : reference.youtube_video_id ? (
                  <div className="rounded-2xl backdrop-blur-md p-8 text-center h-full flex items-center justify-center min-h-[400px]"
                    style={{
                      background: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05))`,
                      border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
                    }}
                  >
                    <div>
                      <p className="text-red-400 mb-2">YouTube-Video konnte nicht geladen werden</p>
                      <p className="text-gray-400 text-sm">
                        Bitte überprüfen Sie die Video-ID: {reference.youtube_video_id}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Rechts: Info-Kasten mit schwarzem Glassmorphism (4/12 = 1/3 der Breite, gleiche Höhe) */}
              <div 
                className="lg:col-span-4 rounded-2xl backdrop-blur-xl p-6 md:p-8 h-full flex flex-col"
              style={{
                background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))`,
                border: `1px solid rgba(255, 255, 255, 0.15)`,
                boxShadow: `0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.2)`,
              }}
            >
              <div className="space-y-6 text-left">
                {/* Kunde */}
                {reference.client_info && (
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                      Kunde
                    </h3>
                    <div className="space-y-2">
                      {reference.client_info.split(',').map((item, index) => (
                        <div key={index} className="text-gray-300 text-sm md:text-base">
                          {item.trim()}
                        </div>
                      ))}
                    </div>
                    {(reference.task_points && reference.task_points.length > 0) || 
                     (reference.equipment_points && reference.equipment_points.length > 0) ? (
                      <div 
                        className="h-px mt-4 mb-4"
                        style={{ 
                          backgroundColor: glowColor, 
                          opacity: 0.6,
                          boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}40`,
                        }}
                      ></div>
                    ) : null}
                  </div>
                )}

                {/* Aufgaben */}
                {reference.task_points && reference.task_points.length > 0 && (
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                      Aufgaben
                    </h3>
                    <div className="space-y-2">
                      {reference.task_points.map((point, index) => {
                        // Wenn der Punkt Kommas enthält, splitte ihn
                        const items = point.includes(',') 
                          ? point.split(',').map(item => item.trim())
                          : [point];
                        
                        return items.map((item, itemIndex) => (
                          <div key={`${index}-${itemIndex}`} className="text-gray-300 text-sm md:text-base">
                            {item}
                          </div>
                        ));
                      })}
                    </div>
                    {reference.equipment_points && reference.equipment_points.length > 0 ? (
                      <div 
                        className="h-px mt-4 mb-4"
                        style={{ 
                          backgroundColor: glowColor, 
                          opacity: 0.6,
                          boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}40`,
                        }}
                      ></div>
                    ) : null}
                  </div>
                )}

                {/* Equipment */}
                {reference.equipment_points && reference.equipment_points.length > 0 && (
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                      Equipment
                    </h3>
                    <div className="space-y-2">
                      {reference.equipment_points.map((point, index) => {
                        // Wenn der Punkt Kommas enthält, splitte ihn
                        const items = point.includes(',') 
                          ? point.split(',').map(item => item.trim())
                          : [point];
                        
                        return items.map((item, itemIndex) => (
                          <div key={`${index}-${itemIndex}`} className="text-gray-300 text-sm md:text-base">
                            {item}
                          </div>
                        ));
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* Zweites Info-Card: Herausforderungen und Description (vertikaler Trenner) */}
            {((reference.challenges && Array.isArray(reference.challenges) && reference.challenges.length > 0) || reference.description_text) && (
              <div 
                className="w-full max-w-[100%] mx-auto mt-12 md:mt-16"
              >
                <div 
                  className="rounded-2xl backdrop-blur-xl p-6 md:p-8"
                  style={{
                    background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))`,
                    border: `1px solid rgba(255, 255, 255, 0.15)`,
                    boxShadow: `0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.2)`,
                  }}
                >
                  <div className=" grid grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-stretch">
                    {/* Links: Herausforderungen */}
                    {reference.challenges && Array.isArray(reference.challenges) && reference.challenges.length > 0 && (
                      <div className="text-left">
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                          Herausforderungen
                        </h3>
                        <div className="space-y-2">
                          {reference.challenges.map((challenge, index) => {
                            // Wenn der Punkt Kommas enthält, splitte ihn
                            const items = challenge && challenge.includes(',') 
                              ? challenge.split(',').map(item => item.trim())
                              : [challenge];
                            
                            return items.map((item, itemIndex) => (
                              <div key={`${index}-${itemIndex}`} className="text-gray-300 text-sm md:text-base">
                                {item}
                              </div>
                            ));
                          })}
                        </div>
                      </div>
                    )}

                    {/* Vertikaler Trenner */}
                    {reference.challenges && Array.isArray(reference.challenges) && reference.challenges.length > 0 && reference.description_text && (
                      <div 
                        className="w-px self-stretch"
                        style={{ 
                          backgroundColor: glowColor, 
                          opacity: 0.6,
                          boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}40`,
                        }}
                      ></div>
                    )}

                    {/* Rechts: Description */}
                    {reference.description_text && (
                      <div className="text-left">
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                          Beschreibung
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {reference.description_text}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

