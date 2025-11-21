// types/page-section.ts
// TypeScript Types für page_sections Tabelle

export type IconName = 'video' | 'camera' | 'production' | 'pilot' | 'measurement' | 'mapping';

export interface ServiceItem {
  id: string;
  icon_name: IconName;
  color: string; // CSS Color (z.B. "rgba(0,198,255,0.6)")
  order: number;
  title: string;
  description: string;
  details?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  badge?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  order: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string; // Pfad zu Supabase Storage oder externe URL
  category: string;
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
  order: number;
}

export interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  video_url: string; // YouTube URL
  thumbnail_url?: string; // Pfad zu Supabase Storage oder externe URL
  duration?: string;
  category?: string;
  specs?: {
    resolution?: string;
    fps?: string;
    format?: string;
  };
}

export interface PageSection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  description_left?: string;
  description_right?: string;
  hero_video_url?: string; // YouTube URL
  hero_thumbnail?: string; // Pfad zu Supabase Storage oder externe URL
  services?: ServiceItem[]; // JSON Array
  pricing_section_title?: string;
  pricing_section_subtitle?: string;
  pricing_section_description?: string;
  pricing_tiers?: PricingTier[]; // JSON Array
  gallery_section_title?: string;
  gallery_section_subtitle?: string;
  gallery_section_description?: string;
  gallery_images?: GalleryImage[]; // JSON Array
  featured_video?: FeaturedVideo; // JSON Object
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PageSectionFormData extends Omit<PageSection, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
}

