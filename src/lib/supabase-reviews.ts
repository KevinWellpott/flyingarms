// lib/supabase-reviews.ts - SIMPLE VERSION
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Review {
  id: string;
  customer_name: string;
  company_name?: string;
  rating: number;
  review_text: string;
  project_type?: string;
  video_url?: string;
  image_url?: string;
  project_description?: string; 
  is_featured: boolean;
  created_at: string;
}

// In supabase-reviews.ts - Alle Filter rausnehmen:
export async function getAllReviews(): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*');  // KEINE ORDER, KEINE FILTER - NUR SELECT *

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}