'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX, FiMaximize2 } from 'react-icons/fi';
import { getGlowStyle } from '@/lib/utils';

interface ImageSliderProps {
  imagePaths: string[];
  title?: string;
  colorGlow?: string;
}

export default function ImageSlider({ imagePaths, title, colorGlow = '#76E4F7' }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      const urls = await Promise.all(
        imagePaths.map(async (path) => {
          // Bereinige den Pfad: Entferne alle "gallery-images/" Präfixe
          let cleanPath = path;
          while (cleanPath.startsWith('gallery-images/')) {
            cleanPath = cleanPath.replace(/^gallery-images\//, '');
          }
          
          // Der Pfad sollte jetzt nur noch der Dateiname sein (z.B. "1763628194639-lv0ytytqdw.png")
          // Verwende den bereinigten Pfad direkt, ohne zusätzliches Präfix
          const storagePath = cleanPath;
          
          try {
            // Hole eine signierte URL über die API-Route (S3-kompatibel)
            const response = await fetch('/api/storage/signed-url', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bucket: 'gallery-images',
                path: storagePath,
              }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              console.error('Error fetching signed URL for:', storagePath, errorText);
              // Kein Fallback mehr - wir müssen über S3 gehen
              return '';
            }

            const result = await response.json();
            if (result.success && result.url) {
              return result.url;
            }
            console.error('Invalid response from signed-url API:', result);
            return '';
          } catch (error) {
            console.error('Error loading image:', error);
            return '';
          }
        })
      );
      // Filtere leere URLs heraus
      const validUrls = urls.filter(url => url !== '');
      setImageUrls(validUrls);
      setIsLoading(false);
    };

    if (imagePaths.length > 0) {
      loadImages();
    }
  }, [imagePaths]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const openFullscreen = (index: number) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentIndex, imageUrls.length]);

  if (isLoading || imageUrls.length === 0) {
    return null;
  }

  const glowStyle = getGlowStyle(colorGlow, 'medium');
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
    <>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              {title}
            </h2>
          )}

          {/* Grid-Layout für alle Bilder */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => openFullscreen(index)}
                >
                  {/* Bild-Container mit Glassmorphism */}
                  <div
                    className="relative aspect-video rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05))`,
                      border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${hoveredIndex === index ? 0.4 : 0.2})`,
                      boxShadow: hoveredIndex === index
                        ? `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3), 0 0 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15), inset 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`
                        : `0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), 0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`,
                      transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <Image
                      src={url}
                      alt={`Bild ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      priority={index < 2}
                    />

                    {/* Overlay mit Icon beim Hover */}
                    <div
                      className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div
                        className="p-4 rounded-full backdrop-blur-md transition-transform duration-300"
                        style={{
                          background: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2))`,
                          border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
                          boxShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`,
                          transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(0.9)',
                        }}
                      >
                        <FiMaximize2 className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Bildnummer Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-md text-white text-sm font-semibold"
                      style={{
                        background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))`,
                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                        boxShadow: `0 0 10px rgba(0, 0, 0, 0.5)`,
                      }}
                    >
                      {index + 1} / {imageUrls.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vollbild-Modus */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 glass p-3 rounded-full hover:bg-white/20 transition-colors z-10"
            aria-label="Vollbild schließen"
          >
            <FiX className="w-6 h-6 text-white" />
          </button>

          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <Image
              src={imageUrls[currentIndex]}
              alt={`Bild ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {imageUrls.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 glass p-4 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Vorheriges Bild"
              >
                <FiChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass p-4 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Nächstes Bild"
              >
                <FiChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

