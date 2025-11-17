import AufnahmenHeroSection from '../../sections/aufnahmen-sections/Hero';
import Header from '@/sections/global-sections/Header'
import Footer from '@/sections/global-sections/Footer'

export default function AufnahmenPage() {
    return (
        <main>
            <Header />
            <AufnahmenHeroSection />
            <Footer />

            {/* Weitere Sektionen hier hinzufügen */}
            {/* z.B. Portfolio, Services, etc. */}
        </main>
    );
}

export const metadata = {
    title: 'Luftaufnahmen in 6K Ultra-HD | Flying Arms',
    description: 'Professionelle Luftaufnahmen, 48MP Fotos und 360° Panoramen. EU-zertifizierte Drohnenoperationen mit 20+ Jahren Erfahrung.',
    keywords: 'Luftaufnahmen, Drohne, 6K, Ultra-HD, 48MP, Flying Arms, Luftbilder, Videoproduktion'
};