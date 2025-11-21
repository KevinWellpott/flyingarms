import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { getAllReferences } from '@/lib/references';
import { supabase } from '@/lib/supabase';
import { Review } from '@/lib/supabase-reviews';
import ReferencesOverviewSection from '@/components/ReferencesOverviewSection';
import Header from '@/sections/global-sections/Header';
import Footer from '@/sections/global-sections/Footer';

// Deaktiviere Caching für diese Seite, damit Änderungen sofort sichtbar sind
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Referenzen',
  description: 'Unsere erfolgreichen Projekte und Referenzen',
};

async function getAllReviewsForReferences(): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export default async function ReferencesPage() {
  // Deaktiviere Caching für diese Anfrage
  noStore();
  const references = await getAllReferences();
  const reviews = await getAllReviewsForReferences();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ReferencesOverviewSection references={references} reviews={reviews} />
      </main>
      <Footer />
    </>
  );
}

