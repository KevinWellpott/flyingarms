'use client';

import { useState } from 'react';
import { Reference } from '@/types/reference';
import { Review } from '@/lib/supabase-reviews';
import ReferencesOverviewCard from './ReferencesOverviewCard';
import { FiX, FiInfo } from 'react-icons/fi';

interface ReferencesOverviewSectionProps {
  references: Reference[];
  reviews: Review[];
}

export default function ReferencesOverviewSection({ references, reviews }: ReferencesOverviewSectionProps) {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <section className="w-full py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="space-y-16 md:space-y-20">
          {/* Header */}
          <div className="text-center space-y-6">
            <div
              className="text-xs font-bold tracking-widest uppercase"
              style={{
                background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              REFERENZEN
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              UNSERE <span
                style={{
                  background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ERFOLGREICHEN
              </span> PROJEKTE
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Überzeugen Sie sich von der Qualität unserer Arbeit
            </p>

            {/* Info-Banner */}
            {showInfo && (
              <div className="max-w-2xl mx-auto mt-8 relative">
                <div className="glass rounded-lg p-4 flex items-center justify-between gap-4 border border-white/10">
                  <div className="flex items-center gap-3 flex-1">
                    <FiInfo className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-300">
                      Für mehr Infos einfach das Projekt anklicken!
                    </p>
                  </div>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                    aria-label="Info schließen"
                  >
                    <FiX className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Referenzen Cards - 2 Spalten Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-stretch">
            {references.map((reference) => (
              <ReferencesOverviewCard
                key={reference.id}
                reference={reference}
                reviews={reviews}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

