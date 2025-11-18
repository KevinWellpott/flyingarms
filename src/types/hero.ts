// types/hero.ts
export interface HeroSection {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    description?: string;
    meta_title?: string;
    meta_description?: string;
    
    // ✅ Diese Properties fehlen bei dir!
    hero_video_url?: string;
    hero_video_type?: 'vimeo' | 'youtube' | 'direct' | 'none';
    hero_thumbnail?: string;
  }