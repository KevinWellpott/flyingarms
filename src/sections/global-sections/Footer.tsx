'use client'

import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Flex,
  Icon,
  Link as ChakraLink,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react'
import Link from 'next/link'
import { 
  FaInstagram, 
  FaFacebook, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <Box
      bg="transparent"
      borderTop="1px solid rgba(56, 189, 248, 0.2)"
      color="white"
      position="relative"
    >
      <Container maxW="8xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          
          {/* Company Info */}
          <VStack spacing={6} align="start">
            <HStack spacing={2}>
              <Icon color="brand.400" w={6} h={6} />
              <Text fontSize="xl" fontWeight="bold" color="white">
                Flying-Arms
              </Text>
            </HStack>
            
            <Text fontSize="sm" color="gray.400" lineHeight="tall">
              Professionelle Drohnenservices für Produktaufnahmen, 
              Vermessungen und Schulungen. Die schärfste Sicht von oben.
            </Text>
            
            <HStack spacing={4}>
              <ChakraLink
                href="https://instagram.com"
                isExternal
                p={2}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.1)"
                _hover={{
                  bg: 'rgba(56, 189, 248, 0.2)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              >
                <Icon as={FaInstagram} w={4} h={4} />
              </ChakraLink>
              
              <ChakraLink
                href="https://facebook.com"
                isExternal
                p={2}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.1)"
                _hover={{
                  bg: 'rgba(56, 189, 248, 0.2)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              >
                <Icon as={FaFacebook} w={4} h={4} />
              </ChakraLink>
              
              <ChakraLink
                href="https://linkedin.com"
                isExternal
                p={2}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.1)"
                _hover={{
                  bg: 'rgba(56, 189, 248, 0.2)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              >
                <Icon as={FaLinkedin} w={4} h={4} />
              </ChakraLink>
            </HStack>
          </VStack>

          {/* Services */}
          <VStack spacing={6} align="start">
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Services
            </Text>
            <VStack spacing={3} align="start">
              {[
                'Full HD/4K Aufnahmen',
                'Luftbildvermessung',
                'Videoproduktion',
                'Drohnenführerschein',
                'Kenntnisnachweis',
              ].map((service) => (
                <Text
                  key={service}
                  fontSize="sm"
                  color="gray.400"
                  _hover={{ color: 'brand.400', cursor: 'pointer' }}
                  transition="color 0.3s ease"
                >
                  {service}
                </Text>
              ))}
            </VStack>
          </VStack>

          {/* Quick Links */}
          <VStack spacing={6} align="start">
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Navigation
            </Text>
            <VStack spacing={3} align="start">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Über uns', href: '/about' },
                { label: 'Kontakt', href: '/contact' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    fontSize="sm"
                    color="gray.400"
                    _hover={{ color: 'brand.400' }}
                    transition="color 0.3s ease"
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </VStack>
          </VStack>

          {/* Contact Info */}
          <VStack spacing={6} align="start">
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Kontakt
            </Text>
            <VStack spacing={4} align="start">
              <HStack spacing={3}>
                <Icon as={FaMapMarkerAlt} color="brand.400" w={4} h={4} />
                <Text fontSize="sm" color="gray.400">
                  Musterstraße 123<br />
                  12345 Musterstadt
                </Text>
              </HStack>
              
              <HStack spacing={3}>
                <Icon as={FaPhone} color="brand.400" w={4} h={4} />
                <Text fontSize="sm" color="gray.400">
                  +49 (0) 123 456789
                </Text>
              </HStack>
              
              <HStack spacing={3}>
                <Icon as={FaEnvelope} color="brand.400" w={4} h={4} />
                <Text fontSize="sm" color="gray.400">
                  info@flying-arms.de
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>

        <Divider my={8} borderColor="gray.700" />

        {/* Bottom Bar */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm" color="gray.500">
            © 2024 Flying-Arms. Alle Rechte vorbehalten.
          </Text>
          
          <HStack spacing={6}>
            <Link href="/../../rechtliches/impressum">
              <Text 
                fontSize="sm" 
                color="gray.500" 
                _hover={{ color: 'white' }}
                transition="color 0.3s ease"
              >
                Impressum
              </Text>
            </Link>
            
            <Link href="/../../rechtliches/datenschutz">
              <Text 
                fontSize="sm" 
                color="gray.500" 
                _hover={{ color: 'white' }}
                transition="color 0.3s ease"
              >
                Datenschutz
              </Text>
            </Link>
            
            <Text fontSize="sm" color="gray.600">
              Made by{' '}
              <ChakraLink
                href="https://titandevelopment.de"
                color="brand.400"
                _hover={{ color: 'brand.300' }}
              >
                titandevelopment
              </ChakraLink>
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}