'use client';

import { Reference } from '@/types/reference';
import { supabase } from '@/lib/supabase';
import { getGlowStyle } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ReferenceCardProps {
  reference: Reference;
}

export default function ReferenceCard({ reference }: ReferenceCardProps) {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      // Lade Logo
      if (reference.logo_path) {
        try {
          const response = await fetch('/api/storage/signed-url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bucket: 'logos',
              path: reference.logo_path,
            }),
          });

          if (!response.ok) {
            console.error('Error fetching signed URL for logo:', await response.text());
            // Fallback: Versuche normale Public URL
            const { data } = supabase.storage
              .from('logos')
              .getPublicUrl(reference.logo_path);
            setLogoUrl(data.publicUrl);
          } else {
            const result = await response.json();
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

      // Lade Video
      if (reference.highlight_video_path) {
        try {
          const response = await fetch('/api/storage/signed-url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bucket: 'videos',
              path: reference.highlight_video_path,
            }),
          });

          if (!response.ok) {
            console.error('Error fetching signed URL for video:', await response.text());
            // Fallback: Versuche normale Public URL
            const { data } = supabase.storage
              .from('videos')
              .getPublicUrl(reference.highlight_video_path);
            setVideoUrl(data.publicUrl);
          } else {
            const result = await response.json();
            setVideoUrl(result.url);
          }
        } catch (error) {
          console.error('Error loading video:', error);
          // Fallback: Versuche normale Public URL
          const { data } = supabase.storage
            .from('videos')
            .getPublicUrl(reference.highlight_video_path);
          setVideoUrl(data.publicUrl);
        }
      }

      setIsLoading(false);
    };

    loadAssets();
  }, [reference]);

  const handleClick = () => {
    router.push(`/referenzen/${reference.slug}`);
  };

  const glowStyle = getGlowStyle(reference.color_glow || '#76E4F7', 'medium');

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl glass cursor-pointer transition-all duration-300 hover:scale-105"
      style={{
        boxShadow: glowStyle,
      }}
    >
      {/* Hintergrund-Video */}
      {videoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 h-full min-h-[400px] flex flex-col justify-between">
        {/* Logo */}
        {logoUrl && !isLoading && (
          <div className="mb-4">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src={logoUrl}
                alt={`${reference.title} Logo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          </div>
        )}

        {/* Titel */}
        <div className="mt-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
            {reference.title}
          </h3>
          {reference.subtitle && (
            <p className="text-gray-300 text-sm md:text-base">
              {reference.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
    </div>
  );
}

