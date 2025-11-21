// types/page.ts

// Icon Name Types für Service Items
export type IconName = 'video' | 'camera' | 'production' | 'pilot' | 'measurement' | 'mapping';

// Service Item Interface
export interface ServiceItem {
  icon_name: IconName;
  color: string; // CSS Color (z.B. "#00c6ff")
  title: string;
  description: string;
  details?: string;
}

export interface PageSection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  description_left?: string;
  description_right?: string;
  hero_video_url?: string;
  hero_thumbnail?: string;
  services: ServiceItem[];
  pricing_section_title?: string;
  pricing_section_subtitle?: string; 
  pricing_section_description?: string;
  pricing_tiers: PricingTier[];  // NEU
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  gallery_section_title?: string;
  gallery_section_subtitle?: string;
  gallery_section_description?: string;
  gallery_images: GalleryImage[];  // NEU
  featured_video?: FeaturedVideo;  // NEU
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
  image_url: string;
  category: string;
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
  order: number;
}

export interface FeaturedVideo {
  id: string;
  title: string;
  video_section_description: string;
  video_url: string;
  thumbnail_url?: string;
  duration?: string;
  category?: string;
  specs?: {
    resolution?: string;
    fps?: string;
    format?: string;
  };
}