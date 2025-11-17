'use client';

import React from 'react';
import { Box, Container, VStack, Text, SimpleGrid, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Imports nach deiner Struktur
import PricingCard from '../../components/mainpage-components/PricingSection/PricingCard';
import TrustIndicators from '../../components/mainpage-components/PricingSection/TrustIndicator';

const MotionBox = motion(Box);

interface PricingTier {
  name: string;
  tagline: string;
  icon: string;
  badge?: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Full-HD",
    tagline: "Perfekt für Social Media",
    icon: "📱",
    features: [
      "1920x1080 Full-HD Auflösung",
      "30fps Aufnahmen",
      "Bis zu 30 Min. Flugzeit",
      "Grundlegende Schnitt & Bearbeitung",
      "3-5 Werktage Lieferzeit",
      "Online-Optimiert"
    ],
    cta: "Angebot anfordern"
  },
  {
    name: "4K Ultra-HD",
    tagline: "Für professionelle Projekte",
    icon: "🎬",
    badge: "Beliebt",
    highlight: true,
    features: [
      "4K Ultra-HD (3840x2160)",
      "60fps Aufnahmen",
      "Bis zu 60 Min. Flugzeit",
      "Professioneller Schnitt & Color Grading",
      "2-4 Werktage Lieferzeit",
      "Rohmaterial inklusive",
      "Revision inklusive"
    ],
    cta: "Jetzt starten"
  },
  {
    name: "6K Cinema",
    tagline: "Maximale Qualität",
    icon: "🎥",
    features: [
      "6K Cinema Quality (6000x3376)",
      "10-bit RAW & ProRes",
      "60/120fps High Frame Rate",
      "Unbegrenzte Flugzeit",
      "Premium Schnitt & VFX",
      "Express-Lieferung 24-48h",
      "Unbegrenzte Revisionen",
      "Dedizierter Projektmanager"
    ],
    cta: "Premium anfragen"
  }
];

const PricingSection = () => {
  return (
    <Box
      width="100%"
      py={{ base: 10, md: 50 }} // Haupt Padding Y
      position="relative"
      overflow="hidden"
      bg="transparent"
    >
      {/* Ambient light effects */}
      <MotionBox
        position="absolute"
        top="0"
        left="20%"
        w={{ base: "300px", md: "500px" }}
        h={{ base: "300px", md: "500px" }}
        borderRadius="full" // Rundungen
        bg="radial-gradient(circle, rgba(0,198,255,0.08) 0%, transparent 70%)"
        filter="blur(80px)"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <MotionBox
        position="absolute"
        bottom="0"
        right="20%"
        w={{ base: "300px", md: "500px" }}
        h={{ base: "300px", md: "500px" }}
        borderRadius="full" // Rundungen
        bg="radial-gradient(circle, rgba(0,198,255,0.08) 0%, transparent 70%)"
        filter="blur(80px)"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6
        }}
      />

      <Container 
        maxW="container.lg" // Container Breite
        px={{ base: 4, md: 6 }} // Container Padding
        position="relative" 
        zIndex={2}
      >
        <VStack spacing={5}> {/* VStack spacing groß */}
          
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            w="100%"
          >
            <Text
              fontSize="xs" // Badge Text
              fontWeight="700"
              letterSpacing="4px"
              textTransform="uppercase"
              bgGradient="linear(to-r, cyan.300, cyan.500)"
              bgClip="text"
              mb={8} // Margin Bottom
            >
              Preise & Pakete
            </Text>

            <Text
              fontSize={{ base: "lg", md: "xl" }} // Subtitle
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={{ base: 6, md: 10 }} // Responsive Margin
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
            >
              Wählen Sie Ihre{" "}
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                Qualitätsstufe
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }} // Code Text
              color="whiteAlpha.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.7"
            >
              Von Social Media bis Cinema – wir bieten die perfekte Lösung für Ihr Budget und Ihre Anforderungen
            </Text>
          </MotionBox>

          {/* Pricing Cards */}
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            gap={{ base: 4, md: 6 }} // Grid Gap
            w="100%"
            maxW="1200px"
          >
            {pricingTiers.map((tier, index) => (
              <PricingCard key={tier.name} tier={tier} index={index} />
            ))}
          </SimpleGrid>

          {/* Trust Indicators */}
          <TrustIndicators />

          {/* Bottom CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            textAlign="center"
          >
            <VStack spacing={3}> {/* VStack spacing mittel */}
              <Text 
                fontSize="sm" // Button/Body Text
                color="whiteAlpha.600" 
                maxW="600px"
              >
                Nicht sicher welches Paket? Wir beraten Sie gerne kostenlos und finden die perfekte Lösung für Ihr Projekt.
              </Text>
              
              <Button
                size="lg"
                variant="ghost"
                color="cyan.300"
                border="1px solid rgba(0,198,255,0.3)" // Standard Border
                borderRadius="xl" // Cards
                fontSize="sm" // Button/Body Text
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
                _hover={{
                  bg: "rgba(0,198,255,0.1)",
                  borderColor: "cyan.400"
                }}
                transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" // Smooth Transitions
              >
                Kostenlose Beratung anfragen →
              </Button>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default PricingSection;