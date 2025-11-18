// app/kontakt/page.tsx
import Header from '../../sections/global-sections/Header';
import Footer from '../../sections/global-sections/Footer';
import ContactSection from '../../sections/contact-section/ContactSection';

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