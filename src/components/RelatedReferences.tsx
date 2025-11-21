'use client';

import { Reference } from '@/types/reference';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getReviewsByReferenceId, Review } from '@/lib/supabase-reviews';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';

interface RelatedReferencesProps {
  references: Reference[];
  colorGlow?: string;
}

export default function RelatedReferences({ references, colorGlow = '#76E4F7' }: RelatedReferencesProps) {
  const router = useRouter();

  if (references.length === 0) {
    return null;
  }

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

  const rgb = hexToRgb(colorGlow);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              color: colorGlow,
            }}
          >
            WEITERE PROJEKTE
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Verwandte Referenzen
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Entdecken Sie weitere erfolgreiche Projekte
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {references.map((reference) => (
            <RelatedReferenceCard
              key={reference.id}
              reference={reference}
              colorGlow={reference.color_glow || colorGlow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface RelatedReferenceCardProps {
  reference: Reference;
  colorGlow: string;
}

function RelatedReferenceCard({ reference, colorGlow }: RelatedReferenceCardProps) {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [review, setReview] = useState<Review | null>(null);

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
    const loadReview = async () => {
      try {
        const reviews = await getReviewsByReferenceId(reference.id);
        if (reviews.length > 0) {
          // Nimm das erste Review (oder das featured Review falls vorhanden)
          const featuredReview = reviews.find(r => r.is_featured);
          setReview(featuredReview || reviews[0]);
        }
      } catch (error) {
        console.error('Error loading review:', error);
      }
    };

    loadReview();
  }, [reference.id]);

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

  const rgb = hexToRgb(colorGlow);

  const handleClick = () => {
    router.push(`/referenzen/${reference.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer h-full flex"
    >
      <div
        className="w-full rounded-2xl backdrop-blur-xl p-6 transition-all duration-300 hover:scale-[1.03] flex flex-col h-full"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: `2px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
          boxShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
          e.currentTarget.style.boxShadow = `0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
          e.currentTarget.style.boxShadow = `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
        }}
      >
        <div className="flex flex-col h-full space-y-4">
          {/* Header: Logo + Titel */}
          <div className="flex items-start justify-between gap-3 flex-shrink-0">
            {logoUrl && !isLoading && (
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={logoUrl}
                  alt={`${reference.title} Logo`}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-black text-white flex-1 line-clamp-2">
              {reference.title}
            </h3>
          </div>

          {/* YouTube Player */}
          {youtubeVideoId && (
            <div className="w-full aspect-video rounded-xl overflow-hidden relative flex-shrink-0">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                style={{ border: 'none' }}
                loading="lazy"
              />
            </div>
          )}

          {/* Review oder Projektbeschreibung */}
          {review ? (
            <div className="flex-1 space-y-2">
              {/* Rating */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-3 h-3 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              {/* Review Text */}
              <p className="text-sm text-gray-300 line-clamp-3 italic">
                "{review.review_text}"
              </p>
              {/* Projektbeschreibung falls vorhanden */}
              {review.project_description && (
                <p className="text-xs text-gray-400 line-clamp-2 mt-2">
                  {review.project_description}
                </p>
              )}
            </div>
          ) : reference.description_text ? (
            <p className="text-sm text-gray-300 line-clamp-3 flex-1">
              {reference.description_text}
            </p>
          ) : reference.subtitle ? (
            <p className="text-sm text-gray-300 line-clamp-2 flex-1">
              {reference.subtitle}
            </p>
          ) : null}

          {/* Arrow Indicator */}
          <div className="flex items-center justify-end pt-2 border-t border-gray-700">
            <div
              className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
              style={{ color: colorGlow }}
            >
              Mehr erfahren
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

