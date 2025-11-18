// app/reviews/page.tsx - SIMPLE VERSION
import { Metadata } from 'next';
import Header from '../../sections/global-sections/Header';
import Footer from '../../sections/global-sections/Footer';
import ReviewsSection from '../../sections/reviews-section/ReviewsSection';
import { getAllReviews } from '../../lib/supabase-reviews';

export const metadata: Metadata = {
  title: 'Kundenstimmen | Flying Arms',
  description: 'Echte Kundenbewertungen unserer Drohnenservices.',
};

export default async function ReviewsPage() {
  console.log('🔄 Loading Reviews Page...');
  
  const reviews = await getAllReviews();
  console.log('📊 Reviews loaded:', reviews.length);
  
  return (
    <>
      <Header />
      <main>
        <ReviewsSection reviews={reviews} />
      </main>
      <Footer />
    </>
  );
}