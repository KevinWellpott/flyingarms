import { Metadata } from 'next'
import UeberUnsPage from '@/sections/ueberuns-section/ganze-section'
import Header from '../../sections/global-sections/Header'
import Footer from '../../sections/global-sections/Footer'

export const metadata: Metadata = {
  title: 'Über uns - Flying-Arms | Professionelle Drohnenservices',
  description: 'Erfahren Sie mehr über Flying-Arms - Ihr Partner für professionelle Drohnenaufnahmen und Vermessungen. Die schärfste Sicht von oben seit 2019.',
  keywords: 'Flying-Arms, Drohnenservices, Luftaufnahmen, Vermessung, Über uns, Team',
  alternates: {
    canonical: 'https://flyingarms.de/ueberuns'
  }
}

export default function Page() {
  return (
    <>
      <Header />
      <UeberUnsPage />
      <Footer />
    </>
  )
}