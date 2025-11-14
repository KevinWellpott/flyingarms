'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#0f172a',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      variants: {
        gradient: {
          bg: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
            transform: 'translateY(-2px)',
          },
          _active: {
            transform: 'translateY(0px)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
