import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/sections/global-sections/ChakraProviders'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Flying Arms',
    default: 'Flying Arms - Professionelle Drohnenservices',
  },
  description: 'Professionelle Drohnenservices für Produktaufnahmen, Vermessungen und Schulungen. Die schärfste Sicht von oben.',
  keywords: [
    'Drohne',
    'Luftaufnahmen', 
    'Videoproduktion',
    'Vermessung',
    'Drohnenführerschein',
    'Flying Arms',
  ],
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body 
        className={inter.className}
        style={{ 
          backgroundColor: '#0a0a0a',
          minHeight: '100vh',
          // Subtiles Grid Pattern
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}