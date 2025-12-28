import { Metadata } from 'next'
import Header from '@/sections/global-sections/Header'
import Hero from '@/sections/mainpage-sections/Hero'
import HeroVideoSection from '@/sections/mainpage-sections/HeroVideoSection'
import TestimonialSection from '@/sections/mainpage-sections/TestimonialSection'
import ServiceSection from '@/sections/mainpage-sections/ServiceSection'
import PricingSection from '@/sections/mainpage-sections/PricingSection'
import ProcessSection from '@/sections/mainpage-sections/ProcessSection'
import Footer from '@/sections/global-sections/Footer'

export const metadata: Metadata = {
  title: 'Flying Arms - Professionelle Drohnen-Dienstleistungen',
  description: 'Professionelle Drohnenaufnahmen für Immobilien, Events und Werbung. EU-zertifiziert A2, versichert und über 10 Jahre Erfahrung.',
  alternates: {
    canonical: 'https://flyingarms.de'
  }
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HeroVideoSection />
      <TestimonialSection />
      <ServiceSection />
      <PricingSection />
      <ProcessSection />
      <Footer />
    </>
  )
}