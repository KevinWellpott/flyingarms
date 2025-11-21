export interface Reference {
  id: string;
  created_at: string;
  title: string;
  subtitle?: string;
  slug: string;
  logo_path?: string;
  highlight_video_path?: string;
  youtube_video_id?: string;
  color_glow: string;
  content_points?: string[];
  task_points?: string[];
  client_info?: string;
  equipment_points?: string[];
  challenges?: string[];
  description_text?: string;
  gallery_images?: string[];
  order_index?: number;
  is_published: boolean;
}

export interface ReferenceFormData {
  title: string;
  subtitle?: string;
  slug: string;
  logo_path?: string;
  highlight_video_path?: string;
  youtube_video_id?: string;
  color_glow: string;
  content_points?: string[];
  task_points?: string[];
  client_info?: string;
  equipment_points?: string[];
  challenges?: string[];
  description_text?: string;
  gallery_images?: string[];
  order_index?: number;
  is_published: boolean;
}

export interface ReferenceCardProps {
  reference: Reference;
  onClick?: () => void;
}

export interface RelatedReference {
  id: string;
  title: string;
  slug: string;
  logo_path?: string;
  highlight_video_path?: string;
  color_glow: string;
}

