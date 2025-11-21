'use client';

import { useState, useEffect } from 'react';
import { getGlowStyle } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  showPreview?: boolean;
}

export default function ColorPicker({
  value,
  onChange,
  label = 'Farbglow',
  showPreview = true,
}: ColorPickerProps) {
  const [intensity, setIntensity] = useState<'soft' | 'medium' | 'strong'>('medium');
  const glowStyle = getGlowStyle(value, intensity);

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-white">{label}</label>
      )}

      <div className="flex items-center gap-4">
        {/* Color Input */}
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-600"
          />
        </div>

        {/* Hex Input */}
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const color = e.target.value;
              if (/^#[0-9A-F]{6}$/i.test(color)) {
                onChange(color);
              }
            }}
            placeholder="#76E4F7"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Intensity Slider */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Intensität: {intensity === 'soft' ? 'Weich' : intensity === 'medium' ? 'Mittel' : 'Stark'}
        </label>
        <div className="flex gap-2">
          {(['soft', 'medium', 'strong'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setIntensity(level)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                intensity === level
                  ? 'bg-brand text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {level === 'soft' ? 'Weich' : level === 'medium' ? 'Mittel' : 'Stark'}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Vorschau:</p>
          <div
            className="w-full h-32 rounded-lg glass flex items-center justify-center"
            style={{
              boxShadow: glowStyle,
            }}
          >
            <div className="text-white text-sm">Glow-Effekt Vorschau</div>
          </div>
        </div>
      )}
    </div>
  );
}

