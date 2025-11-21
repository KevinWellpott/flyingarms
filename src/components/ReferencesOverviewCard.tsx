'use client';

import { Reference } from '@/types/reference';
import { Review } from '@/lib/supabase-reviews';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface ReferencesOverviewCardProps {
  reference: Reference;
  reviews?: Review[];
}

export default function ReferencesOverviewCard({ reference, reviews = [] }: ReferencesOverviewCardProps) {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      if (reference.logo_path) {
        try {
          let cleanPath = reference.logo_path;
          while (cleanPath.startsWith('logos/')) {
            cleanPath = cleanPath.replace(/^logos\//, '');
          }
          
          const response = await fetch('/api/storage/signed-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bucket: 'logos', path: cleanPath }),
          });

          if (response.ok) {
            const result = await response.json();
            setLogoUrl(result.url);
          } else {
            const { data } = supabase.storage.from('logos').getPublicUrl(cleanPath);
            setLogoUrl(data.publicUrl);
          }
        } catch (error) {
          console.error('Error loading logo:', error);
          const { data } = supabase.storage.from('logos').getPublicUrl(reference.logo_path);
          setLogoUrl(data.publicUrl);
        }
      }
      setIsLoading(false);
    };

    loadLogo();
  }, [reference]);

  useEffect(() => {
    const extractVideoId = (videoIdOrUrl: string | undefined | null): string | null => {
      if (!videoIdOrUrl) return null;

      if (/^[a-zA-Z0-9_-]{11}$/.test(videoIdOrUrl)) {
        return videoIdOrUrl;
      }

      let videoId = '';
      
      if (videoIdOrUrl.includes('youtube.com/watch?v=')) {
        const match = videoIdOrUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        videoId = match ? match[1] : '';
      } else if (videoIdOrUrl.includes('youtu.be/')) {
        const match = videoIdOrUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        videoId = match ? match[1] : '';
      } else if (videoIdOrUrl.includes('youtube.com/embed/')) {
        const match = videoIdOrUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
        videoId = match ? match[1] : '';
      } else {
        videoId = videoIdOrUrl.trim();
      }

      if (!videoId || videoId.length !== 11) {
        return null;
      }

      return videoId;
    };

    setYoutubeVideoId(extractVideoId(reference.youtube_video_id));
  }, [reference.youtube_video_id]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 118, g: 228, b: 247 };
  };

  const rgb = hexToRgb(reference.color_glow || '#76E4F7');
  const assignedReviews = reviews.filter(r => r.reference_id === reference.id);
  const hasReview = assignedReviews.length > 0;
  const review = hasReview ? assignedReviews[0] : null;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-3 h-3 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleClick = () => {
    router.push(`/referenzen/${reference.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full cursor-pointer group flex"
    >
      <div
        className="rounded-2xl backdrop-blur-xl p-6 md:p-8 lg:p-12 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full w-full"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: `2px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
          boxShadow: `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
        }}
      >
        <div className="flex flex-col h-full space-y-8">
          {/* Header: Titel + Logo */}
          <div className="flex items-start justify-between gap-4 flex-shrink-0">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-black text-white flex-1 line-clamp-2"
              style={{
                background: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {reference.title}
            </h2>
            {logoUrl && !isLoading && (
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <Image
                  src={logoUrl}
                  alt={`${reference.title} Logo`}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            )}
          </div>

          {/* YouTube Player ohne UI */}
          {youtubeVideoId && (
            <div className="w-full aspect-video rounded-xl overflow-hidden relative flex-shrink-0">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0&widget_referrer=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                style={{ border: 'none' }}
                loading="lazy"
              />
            </div>
          )}

          {/* Review oder Beschreibung */}
          <div className="flex flex-col flex-1 space-y-4 min-h-0">
            {hasReview && review ? (
              <>
                {/* Customer Info */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{
                      background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
                    }}
                  >
                    {review.customer_name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-white truncate">
                      {review.customer_name}
                    </div>
                    {review.company_name && (
                      <div className="text-xs text-gray-400 truncate">
                        {review.company_name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating - kleiner, direkt unter Customer Info */}
                <div className="flex-shrink-0">
                  {renderStars(review.rating)}
                </div>
                
                {/* Review Text - mit Textüberlauf-Behandlung */}
                <div className="flex-1 min-h-0 flex flex-col">
                  <p
                    className="text-sm md:text-base text-white leading-relaxed italic line-clamp-4"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    "{review.review_text}"
                  </p>
                </div>

                {/* Project Description - optional, mit Textüberlauf */}
                {review.project_description && (
                  <div
                    className="p-4 rounded-xl flex-shrink-0"
                    style={{
                      background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
                      border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
                    }}
                  >
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)` }}
                    >
                      PROJEKT:
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                      {review.project_description}
                    </p>
                  </div>
                )}
              </>
            ) : reference.description_text ? (
              <div
                className="p-6 rounded-xl flex-1 min-h-0 flex flex-col"
                style={{
                  background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
                  border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
                }}
              >
                <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-6">
                  {reference.description_text}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

