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
  FaYoutube,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa'
import { GiHelicopter } from 'react-icons/gi'

export default function Footer() {
  return (
    <Box
      bg="transparent"
      borderTop="1px solid rgba(0, 198, 255, 0.2)"
      color="white"
      position="relative"
    >
      <Container maxW="8xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          
          {/* Company Info */}
          <VStack spacing={6} align="start">
            <HStack spacing={2}>
             
              <Text fontSize="xl" fontWeight="bold" color="white">
                FlyingArms
              </Text>
            </HStack>
            
            <Text fontSize="sm" color="gray.400" lineHeight="tall">
            Professionelle Video und Foto Produktion.
            Die schärfste Sicht von oben
            </Text>
            
            <VStack spacing={3} align="start" w="100%">
              <Text fontSize="sm" fontWeight="semibold" color="white" mb={2}>
                Folge uns
              </Text>
              <HStack spacing={4}>
                <ChakraLink
                  href="https://www.instagram.com/explore/locations/1452106708422342/flying-arms/?hl=de"
                  isExternal
                  p={4}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.15)"
                  border="1px solid rgba(0, 198, 255, 0.3)"
                  boxShadow="0 4px 20px rgba(0, 198, 255, 0.2)"
                  _hover={{
                    bg: 'rgba(0, 198, 255, 0.25)',
                    borderColor: 'rgba(0, 198, 255, 0.5)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(0, 198, 255, 0.4)',
                  }}
                  transition="all 0.3s ease"
                >
                  <Icon 
                    as={FaInstagram} 
                    w={6} 
                    h={6} 
                    color="cyan.400"
                    filter="drop-shadow(0 0 10px rgba(0,198,255,0.8))"
                  />
                </ChakraLink>


                <ChakraLink
                  href="https://www.youtube.com/@flyingarmsvideoproduktioni3730"
                  isExternal
                  p={4}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.15)"
                  border="1px solid rgba(0, 198, 255, 0.3)"
                  boxShadow="0 4px 20px rgba(0, 198, 255, 0.2)"
                  _hover={{
                    bg: 'rgba(0, 198, 255, 0.25)',
                    borderColor: 'rgba(0, 198, 255, 0.5)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(0, 198, 255, 0.4)',
                  }}
                  transition="all 0.3s ease"
                >
                  <Icon 
                    as={FaYoutube} 
                    w={6} 
                    h={6} 
                    color="cyan.400"
                    filter="drop-shadow(0 0 10px rgba(0,198,255,0.8))"
                  />
                </ChakraLink>
                
                <ChakraLink
                  href="https://www.facebook.com/FlyingArmsBraunschweig/"
                  isExternal
                  p={4}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.15)"
                  border="1px solid rgba(0, 198, 255, 0.3)"
                  boxShadow="0 4px 20px rgba(0, 198, 255, 0.2)"
                  _hover={{
                    bg: 'rgba(0, 198, 255, 0.25)',
                    borderColor: 'rgba(0, 198, 255, 0.5)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(0, 198, 255, 0.4)',
                  }}
                  transition="all 0.3s ease"
                >
                  <Icon 
                    as={FaFacebook} 
                    w={6} 
                    h={6} 
                    color="cyan.400"
                    filter="drop-shadow(0 0 10px rgba(0,198,255,0.8))"
                  />
                </ChakraLink>
              </HStack>
            </VStack>
          </VStack>

          {/* Services */}
          <VStack spacing={6} align="start">
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Services
            </Text>
            <VStack spacing={3} align="start">
              {[
                { label: 'Aufnahmen', href: '/aufnahmen' },
              
                { label: 'Vermessungen', href: '/vermessungen' },
                { label: 'Videoschnitt', href: '/videoschnitt' },
           
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    fontSize="sm"
                    color="gray.400"
                    _hover={{ color: 'cyan.400' }}
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
              <HStack spacing={3} align="start">
                <Icon as={FaMapMarkerAlt} color="cyan.400" w={4} h={4} mt={1} />
                <Text fontSize="sm" color="gray.400">
                  Kreuzstraße 65a<br />
                  38118 Braunschweig
                </Text>
              </HStack>
              
              <HStack spacing={3}>
                <Icon as={FaPhone} color="cyan.400" w={4} h={4} />
                <Text fontSize="sm" color="gray.400">
                  0170 5880276
                </Text>
              </HStack>
              
              <HStack spacing={3}>
                <Icon as={FaEnvelope} color="cyan.400" w={4} h={4} />
                <Text fontSize="sm" color="gray.400">
                  info@flyingarms.de
                </Text>
              </HStack>
              
              <VStack spacing={2} align="start" pt={2}>
                <HStack spacing={3}>
                  <Icon as={FaClock} color="cyan.400" w={4} h={4} />
                  <Text fontSize="sm" fontWeight="semibold" color="white">
                    Öffnungszeiten
                  </Text>
                </HStack>
                <VStack spacing={1} align="start" pl={7}>
                 
                  <HStack spacing={4} justify="space-between" w="100%">
                    <Text fontSize="xs" color="gray.400">Montag</Text>
                    <Text fontSize="xs" color="gray.400">12:00–20:00</Text>
                  </HStack>
                  <HStack spacing={4} justify="space-between" w="100%">
                    <Text fontSize="xs" color="gray.400">Dienstag</Text>
                    <Text fontSize="xs" color="gray.400">12:00–20:00</Text>
                  </HStack>
                  <HStack spacing={4} justify="space-between" w="100%">
                    <Text fontSize="xs" color="gray.400">Mittwoch</Text>
                    <Text fontSize="xs" color="gray.400">12:00–20:00</Text>
                  </HStack>
                  <HStack spacing={4} justify="space-between" w="100%">
                    <Text fontSize="xs" color="gray.400">Donnerstag</Text>
                    <Text fontSize="xs" color="gray.400">12:00–20:00</Text>
                  </HStack>
                  <HStack spacing={4} justify="space-between" w="100%">
                    <Text fontSize="xs" color="gray.400">Freitag</Text>
                    <Text fontSize="xs" color="gray.400">12:00–20:00</Text>
                  </HStack>
                  <HStack spacing={4} justify="space-between" w="100%">
                    <Text fontSize="xs" color="gray.400">Samstag</Text>
                    <Text fontSize="xs" color="gray.500">Geschlossen</Text>
                  </HStack>
                  <HStack spacing={4} justify="space-between" w="100%">
                    <Text fontSize="xs" color="gray.400">Sonntag</Text>
                    <Text fontSize="xs" color="gray.500">Geschlossen</Text>
                  </HStack>
                </VStack>
              </VStack>
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
            © 2025 Flying-Arms. Alle Rechte vorbehalten.
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
                color="cyan.400"
                _hover={{ color: 'cyan.300' }}
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