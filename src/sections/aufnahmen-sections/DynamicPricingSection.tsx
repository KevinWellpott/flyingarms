// components/sections/DynamicPricingSection.tsx
'use client';

import React from 'react';
import { Box, Container, VStack, Text, SimpleGrid, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PricingCard from '../../components/mainpage-components/PricingSection/PricingCard';
import TrustIndicators from '../../components/mainpage-components/PricingSection/TrustIndicator';
import { PageSection, PricingTier } from '../../types/page';

const MotionBox = motion(Box);

interface DynamicPricingSectionProps {
  data?: PageSection;
}

const DynamicPricingSection: React.FC<DynamicPricingSectionProps> = ({ data }) => {
  if (!data) return null;

  const {
    pricing_section_title = 'Preise & Pakete',
    pricing_section_subtitle = 'Wählen Sie Ihre Qualitätsstufe',
    pricing_section_description = 'Von Social Media bis Cinema – wir bieten die perfekte Lösung für Ihr Budget und Ihre Anforderungen',
    pricing_tiers = []
  } = data;

  // Pricing Tiers sortieren
  const sortedTiers = Array.isArray(pricing_tiers) ? 
    [...pricing_tiers].sort((a, b) => a.order - b.order) : [];

  return (
    <Box
      width="100%"
      py={{ base: 10, md: 50 }}
      position="relative"
      overflow="hidden"
      bg="transparent"
    >
      {/* Background Effects */}
      <MotionBox
        position="absolute"
        top="0"
        left="20%"
        w={{ base: "300px", md: "500px" }}
        h={{ base: "300px", md: "500px" }}
        borderRadius="full"
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
        borderRadius="full"
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
        maxW="container.lg"
        px={{ base: 4, md: 6 }}
        position="relative" 
        zIndex={2}
      >
        <VStack spacing={5}>
          
          {/* Header - DYNAMISCH */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            w="100%"
          >
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="4px"
              textTransform="uppercase"
              bgGradient="linear(to-r, cyan.300, cyan.500)"
              bgClip="text"
              mb={8}
            >
              {pricing_section_title}
            </Text>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={{ base: 6, md: 10 }}
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
            >
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                {pricing_section_subtitle}
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.7"
            >
              {pricing_section_description}
            </Text>
          </MotionBox>

          {/* Pricing Cards - DYNAMISCH */}
          {sortedTiers.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              gap={{ base: 4, md: 6 }}
              w="100%"
              maxW="1200px"
            >
              {sortedTiers.map((tier, index) => (
                <PricingCard key={tier.id} tier={tier} index={index} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={8}>
              <Text color="whiteAlpha.600">
                Keine Pricing-Pakete verfügbar
              </Text>
            </Box>
          )}

          <TrustIndicators />

          {/* Bottom CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            textAlign="center"
          >
            <VStack spacing={3}>
              <Text 
                fontSize="sm"
                color="whiteAlpha.600" 
                maxW="600px"
              >
                Nicht sicher welches Paket? Wir beraten Sie gerne kostenlos und finden die perfekte Lösung für Ihr Projekt.
              </Text>
              
              <Button
                size="lg"
                variant="ghost"
                color="cyan.300"
                border="1px solid rgba(0,198,255,0.3)"
                borderRadius="xl"
                fontSize="sm"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                _hover={{
                  bg: "rgba(0,198,255,0.1)",
                  borderColor: "cyan.400"
                }}
                transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
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

export default DynamicPricingSection;