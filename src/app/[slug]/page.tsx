// app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Header from '../../sections/global-sections/Header';
import Footer from '../../sections/global-sections/Footer';
import DynamicServicesSection from '../../sections/aufnahmen-sections/DynamicServices';
import DynamicHeroSection from '../../sections/aufnahmen-sections/DynamicHeroSection';
import DynamicPricingSection from '../../sections/aufnahmen-sections/DynamicPricingSection';
import DynamicGallery from '../../sections/aufnahmen-sections/DynamicGallery';
import DynamicVideoGallery from '../../sections/aufnahmen-sections/DynamicVideoGallery';
import ProcessSection from '../../sections/mainpage-sections/ProcessSection';
import { getPageBySlug } from '../../lib/supabase';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// 🔥 WICHTIG: Komplett dynamisch - KEIN Caching!
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// generateMetadata temporär deaktiviert für Vercel-Deployment
// export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
//   try {
//     const pageData = await getPageBySlug(params.slug);
//     if (!pageData) {
//       return {
//         title: 'Seite nicht gefunden | Flying Arms',
//         description: 'Die angeforderte Seite wurde nicht gefunden.',
//       };
//     }
//     return {
//       title: pageData.meta_title || `${pageData.title} | Flying Arms`,
//       description: pageData.meta_description || pageData.description_left || 'Flying Arms - Professionelle Drohnenservices',
//     };
//   } catch (error) {
//     console.error('❌ Error generating metadata:', error);
//     return {
//       title: 'Flying Arms',
//       description: 'Professionelle Drohnenservices',
//     };
//   }
// }

export default async function ServicePage({ params }: ServicePageProps) {
  try {
    console.log('🔄 Loading fresh data for slug:', params.slug);
    const pageData = await getPageBySlug(params.slug);

    if (!pageData) {
      console.log('❌ Page not found for slug:', params.slug);
      notFound();
    }

    console.log('✅ Fresh data loaded:', {
      slug: pageData.slug,
      title: pageData.title,
      subtitle: pageData.subtitle,
      hasVideo: !!pageData.hero_video_url,
      timestamp: new Date().toISOString()
    });

    // 🔧 FIX: Explizite Type Definition für hero_video_type
    const getVideoType = (videoUrl: string | undefined): "vimeo" | "youtube" | "direct" | "none" => {
      if (!videoUrl) return 'none';
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) return 'youtube';
      if (videoUrl.includes('vimeo.com')) return 'vimeo';
      return 'direct';
    };

    // Hero Data - ALLE Felder
    const heroData = {
      id: pageData.id,
      slug: pageData.slug,
      title: pageData.title,
      subtitle: pageData.subtitle,
      description: pageData.description,
      hero_video_url: pageData.hero_video_url,
      hero_video_type: getVideoType(pageData.hero_video_url), // ✅ Jetzt korrekt getypt
      hero_thumbnail: pageData.hero_thumbnail,
      meta_title: pageData.meta_title,
      meta_description: pageData.meta_description
    };

    return (
      <>
        <Header />
        <main>
          <DynamicHeroSection data={heroData} />
          <DynamicServicesSection data={pageData} />
          <DynamicPricingSection data={pageData} />
          <DynamicGallery data={pageData} />
          <DynamicVideoGallery data={pageData} />
          <ProcessSection />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('❌ Error loading service page:', error);
    notFound();
  }
}