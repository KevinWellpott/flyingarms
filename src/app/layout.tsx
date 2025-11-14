import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/sections/global-sections/ChakraProviders'

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
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
