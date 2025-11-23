import Header from '@/sections/global-sections/Header'
import Hero from '@/sections/mainpage-sections/Hero'
import HeroVideoSection from '@/sections/mainpage-sections/HeroVideoSection'
import TestimonialSection from '@/sections/mainpage-sections/TestimonialSection'
import ServiceSection from '@/sections/mainpage-sections/ServiceSection'
import PricingSection from '@/sections/mainpage-sections/PricingSection'
import ProcessSection from '@/sections/mainpage-sections/ProcessSection'
import Footer from '@/sections/global-sections/Footer'


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
