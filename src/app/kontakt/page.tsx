// app/kontakt/page.tsx
import { Metadata } from 'next'
import Header from '../../sections/global-sections/Header';
import Footer from '../../sections/global-sections/Footer';
import ContactSection from '../../sections/contact-section/ContactSection';

export const metadata: Metadata = {
  title: 'Kontakt | Flying Arms',
  description: 'Kontaktieren Sie Flying Arms für professionelle Drohnenservices. Schnelle Antwort und kostenlose Beratung garantiert.',
  alternates: {
    canonical: 'https://flyingarms.de/kontakt'
  }
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}