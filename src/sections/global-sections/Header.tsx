'use client'

import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  useDisclosure,
  IconButton,
  Collapse,
  VStack,
  HStack,
  Icon
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { GiHelicopter } from 'react-icons/gi'
import Link from 'next/link'

export default function Header() {
  const { isOpen, onToggle } = useDisclosure()

  const navItems = [
    { label: 'Aufnahmen', href: '/aufnahmen' },
    { label: 'Vermessungen', href: '/vermessungen' },
    { label: 'Referenzen', href: '/referenzen' },
    { label: 'Playlist', href: '/playlist' },
  ]

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="rgba(255,255,255,0.02)"
      backdropFilter="blur(30px)"
      borderBottom="1px solid rgba(0,198,255,0.2)"
      boxShadow="0 8px 32px rgba(0,198,255,0.15)"
    >
      <Container 
        maxW="container.xl" // ← BREITER: 1280px statt 1024px
        px={{ base: 4, md: 8 }} // ← Mehr Padding für breiteren Look
        py={{ base: 3, md: 4 }}
      >
        <Flex align="center" justify="space-between">
          
          {/* Logo */}
          <Link href="/">
            <HStack spacing={3}>
              <Icon 
                as={GiHelicopter} 
                color="cyan.400" 
                w="32px" 
                h="32px"
                filter="drop-shadow(0 0 10px rgba(0,198,255,0.6))"
              />
              <VStack spacing={0} align="start">
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  fontWeight="900"
                  color="white"
                  fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                  textShadow="0 0 20px rgba(0,198,255,0.5)"
                >
                  Flying-Arms
                </Text>
                <Text
                  fontSize="xs"
                  color="cyan.300"
                  fontWeight="600"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Die schärfste Sicht von oben.
                </Text>
              </VStack>
            </HStack>
          </Link>

          {/* Desktop Navigation */}
          <HStack 
            spacing={10} // ← Mehr Spacing zwischen Links
            display={{ base: 'none', lg: 'flex' }}
          >
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Text
                  color="whiteAlpha.700"
                  fontSize="sm"
                  fontWeight="600"
                  fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                  transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  _hover={{
                    color: "cyan.300",
                    textDecoration: "none"
                  }}
                  cursor="pointer"
                >
                  {item.label}
                </Text>
              </Link>
            ))}
            
            <Link href="/kontakt">
              <Button
                bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
                color="white"
                size="md"
                h="48px"
                px={8} // ← Etwas breiter
                borderRadius="xl"
                fontWeight="900"
                fontSize="sm"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                boxShadow="0 4px 24px rgba(0,198,255,0.4)"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 32px rgba(0,198,255,0.5)"
                }}
                transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              >
                Jetzt Termin buchen
              </Button>
            </Link>
          </HStack>

          {/* Mobile Menu Button - CLEAN & SIMPLE */}
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w="16px" h="16px" /> : <HamburgerIcon w="20px" h="20px" />}
            variant="ghost"
            color="white"
            size="lg"
            aria-label="Menu"
            borderRadius="md"
            _hover={{
              bg: 'rgba(0,198,255,0.1)',
              color: "cyan.300"
            }}
            _active={{
              transform: "scale(0.95)"
            }}
            transition="all 0.3s ease"
          />
        </Flex>
      </Container>

      {/* Mobile Menu - CLEAN & SIMPLE */}
      <Collapse in={isOpen}>
        <Box
          bg="rgba(0,0,0,0.98)" // ← Etwas undurchsichtiger
          backdropFilter="blur(30px)"
          borderTop="1px solid rgba(0,198,255,0.2)"
        >
          <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
            <VStack spacing={0} py={6}> {/* ← Kein Spacing zwischen Items, cleaner */}
              
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  style={{ width: '100%' }}
                  onClick={onToggle} // ← Menu schließt sich beim Klick
                >
                  <Text
                    color="whiteAlpha.800"
                    fontSize="md" // ← Etwas größer für bessere Touchability
                    fontWeight="600"
                    fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                    w="100%"
                    textAlign="center"
                    py={4} // ← Mehr Touch-Area
                    borderRadius="none" // ← Clean, keine Rundungen
                    borderBottom="1px solid rgba(255,255,255,0.05)" // ← Subtile Trenner
                    transition="all 0.3s ease"
                    _hover={{
                      color: "cyan.300",
                      bg: "rgba(0,198,255,0.05)",
                      textDecoration: "none"
                    }}
                    _last={{
                      borderBottom: "none" // ← Letzter Item ohne Border
                    }}
                    cursor="pointer"
                  >
                    {item.label}
                  </Text>
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <Box w="100%" pt={6}>
                <Link href="/kontakt" style={{ width: '100%' }}>
                  <Button
                    bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
                    color="white"
                    size="lg"
                    w="100%"
                    h="56px"
                    borderRadius="xl"
                    fontWeight="900"
                    fontSize="sm"
                    fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                    boxShadow="0 4px 24px rgba(0,198,255,0.4)"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 32px rgba(0,198,255,0.5)"
                    }}
                    transition="all 0.3s ease"
                    onClick={onToggle} // ← Menu schließt sich automatisch
                  >
                    Jetzt Termin buchen
                  </Button>
                </Link>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Collapse>
    </Box>
  )
}