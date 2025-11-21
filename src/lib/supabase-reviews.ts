// lib/supabase-reviews.ts - SIMPLE VERSION
import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

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
  reference_id?: string | null; // Optional: Zuordnung zu einer Referenz
  created_at: string;
}

// Alle Reviews (für Landing Page - nur ohne reference_id oder mit is_featured=true)
export async function getAllReviews(): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .or('reference_id.is.null,is_featured.eq.true') // Reviews ohne Referenz ODER featured Reviews
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }
}

// Reviews für eine spezifische Referenz
export async function getReviewsByReferenceId(referenceId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('reference_id', referenceId)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching reviews for reference:', error);
    return [];
  }
}

// Alle Reviews für Admin-Panel
export async function getAllReviewsAdmin(): Promise<Review[]> {
  try {
    const response = await fetch('/api/reviews', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching reviews for admin:', error);
    return [];
  }
}