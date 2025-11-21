import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { getReferenceBySlug, getRelatedReferences } from '@/lib/references';
import { getReviewsByReferenceId } from '@/lib/supabase-reviews';
import HeroSection from '@/components/HeroSection';
import InfoBlock from '@/components/InfoBlock';
import ImageSlider from '@/components/ImageSlider';
import RelatedReferences from '@/components/RelatedReferences';
import ReferenceDetailHeader from '@/components/ReferenceDetailHeader';
import ReferenceReviewsSection from '@/components/ReferenceReviewsSection';

// Deaktiviere Caching für diese Seite, damit Änderungen sofort sichtbar sind
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const reference = await getReferenceBySlug(params.slug);

  if (!reference) {
    return {
      title: 'Referenz nicht gefunden',
    };
  }

  return {
    title: reference.title,
    description: reference.subtitle || reference.description_text || '',
  };
}

export default async function ReferenceDetailPage({ params }: PageProps) {
  // Deaktiviere Caching für diese Anfrage
  noStore();
  const reference = await getReferenceBySlug(params.slug);

  if (!reference) {
    notFound();
  }

  const relatedReferences = await getRelatedReferences(reference.id, 3);
  const reviews = await getReviewsByReferenceId(reference.id);

  return (
    <main className="min-h-screen">
      <ReferenceDetailHeader colorGlow={reference.color_glow} />
      <div className="pt-20">
        <HeroSection reference={reference} />
      </div>
      
      {reference.gallery_images && reference.gallery_images.length > 0 && (
        <ImageSlider
          imagePaths={reference.gallery_images}
          title="Bildergalerie"
          colorGlow={reference.color_glow}
        />
      )}
      
      {reviews.length > 0 && (
        <ReferenceReviewsSection
          reviews={reviews}
          colorGlow={reference.color_glow}
        />
      )}
      
      {relatedReferences.length > 0 && (
        <RelatedReferences references={relatedReferences} colorGlow={reference.color_glow} />
      )}
    </main>
  );
}

