'use client';

import { Review } from '@/lib/supabase-reviews';
import { FiStar } from 'react-icons/fi';
import Image from 'next/image';

interface ReferenceReviewsSectionProps {
  reviews: Review[];
  colorGlow?: string;
}

export default function ReferenceReviewsSection({ reviews, colorGlow = '#76E4F7' }: ReferenceReviewsSectionProps) {
  if (!reviews || reviews.length === 0) {
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
  const featuredReviews = reviews.filter(r => r.is_featured);
  const normalReviews = reviews.filter(r => !r.is_featured);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              color: colorGlow,
            }}
          >
            Kundenstimmen
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Was sagt denn unser Kunde ?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Überzeugen Sie sich von der Qualität unserer Arbeit
          </p>
        </div>


        {/* Featured Reviews */}
        {featuredReviews.length > 0 && (
          <div className="space-y-8 mb-12">
            {featuredReviews.map((review) => (
              <div
                key={review.id}
                className="max-w-4xl mx-auto rounded-2xl backdrop-blur-xl p-6 md:p-8 md:p-12"
                style={{
                  background: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))`,
                  border: `2px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
                  boxShadow: `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2), 0 0 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
                }}
              >
                <div>
                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                      {review.review_text}
                    </p>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="font-semibold text-white">
                        {review.customer_name}
                      </div>
                      {review.company_name && (
                        <div className="text-sm text-gray-400">
                          {review.company_name}
                        </div>
                      )}
                      {review.project_type && (
                        <div
                          className="text-xs font-semibold uppercase tracking-wider mt-2 inline-block px-3 py-1 rounded-full"
                          style={{
                            background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
                            color: colorGlow,
                          }}
                        >
                          {review.project_type}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Normal Reviews Grid */}
        {normalReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {normalReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl backdrop-blur-xl p-6 md:p-8"
                style={{
                  background: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))`,
                  border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
                  boxShadow: `0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
                }}
              >
                <div className="space-y-4">
                  <div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {review.review_text}
                  </p>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="font-semibold text-white text-sm md:text-base">
                      {review.customer_name}
                    </div>
                    {review.company_name && (
                      <div className="text-xs md:text-sm text-gray-400">
                        {review.company_name}
                      </div>
                    )}
                    {review.project_type && (
                      <div
                        className="text-xs font-semibold uppercase tracking-wider mt-2 inline-block px-2 py-1 rounded-full"
                        style={{
                          background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
                          color: colorGlow,
                        }}
                      >
                        {review.project_type}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

