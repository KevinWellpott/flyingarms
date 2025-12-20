'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { GiHelicopter } from 'react-icons/gi';
import { getGlowStyle } from '@/lib/utils';

interface ReferenceDetailHeaderProps {
  colorGlow?: string;
}

export default function ReferenceDetailHeader({ colorGlow = '#76E4F7' }: ReferenceDetailHeaderProps) {
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
  
  // Erstelle einen dunkleren Farbton für den Gradient
  const darkerRgb = {
    r: Math.max(0, rgb.r - 30),
    g: Math.max(0, rgb.g - 30),
    b: Math.max(0, rgb.b - 30),
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(30px)',
        borderBottom: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
        boxShadow: `0 8px 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
      }}
    >
      <div className="container mx-auto px-4 md:px-8 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* Links: Zurück zur Übersicht */}
          <Link
            href="/referenzen"
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-300"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="text-xs font-semibold font-sans hidden sm:inline">
              Zurück zur Übersicht
            </span>
          </Link>

          {/* Mitte: Logo */}
          <Link
            href="/referenzen"
            className="flex items-center gap-2 group"
          >
            <GiHelicopter
              className="w-6 h-6 transition-all duration-300"
              style={{
                color: colorGlow,
                filter: `drop-shadow(0 0 8px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6))`,
              }}
            />
            <div className="flex flex-col items-start">
              <span
                className="text-base font-black text-white font-sans transition-all duration-300"
                style={{
                  textShadow: `0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`,
                }}
              >
                Flying-Arms
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider transition-all duration-300"
                style={{
                  color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`,
                }}
              >
                Die schärfste Sicht von oben.
              </span>
            </div>
          </Link>

          {/* Rechts: CTA Button mit colorGlow */}
          <button
            className="px-4 md:px-6 h-9 md:h-10 rounded-lg font-black text-xs text-black font-sans transition-all duration-300 hover:transform hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) 0%, rgba(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b}, 1) 100%)`,
              boxShadow: `0 3px 18px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 24px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 3px 18px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`;
            }}
          >
            Jetzt Termin buchen
          </button>
        </div>
      </div>
    </header>
  );
}

