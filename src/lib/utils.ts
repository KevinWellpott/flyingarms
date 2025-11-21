import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Kombiniert Tailwind CSS Klassen
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generiert dynamische Glow-Styles basierend auf einer Farbe
 */
export function getGlowStyle(color: string, intensity: 'soft' | 'medium' | 'strong' = 'medium'): string {
  const rgb = hexToRgb(color);
  if (!rgb) return '';

  const opacityMap = {
    soft: 0.4,
    medium: 0.6,
    strong: 0.8,
  };

  const opacity = opacityMap[intensity];
  const blurMap = {
    soft: 20,
    medium: 30,
    strong: 40,
  };

  const blur = blurMap[intensity];

  return `0 0 ${blur}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

/**
 * Konvertiert Hex-Farbe zu RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Extrahiert YouTube Video ID aus URL
 */
export function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Formatiert Dateigröße für Anzeige
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

