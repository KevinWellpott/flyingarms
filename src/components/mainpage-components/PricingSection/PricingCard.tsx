'use client';

import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Button, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const MotionBox = motion(Box);

interface PricingTier {
  name: string;
  tagline: string;
  icon: IconType;
  badge?: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  ctaLink?: string; // Optional, da es in der Datenbank fehlen kann
}

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        position="relative"
        h="100%"
        bg={tier.highlight ? "rgba(0,198,255,0.05)" : "rgba(255,255,255,0.02)"}
        backdropFilter="blur(30px)"
        borderRadius="2xl" // Haupt Container
        border="1px solid" // Standard Border
        borderColor={tier.highlight ? "rgba(0,198,255,0.4)" : "rgba(255,255,255,0.1)"}
        p={{ base: 5, md: 6 }} // Card Padding
        transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" // Smooth Transitions
        transform={isHovered ? "translateY(-8px)" : "translateY(0)"}
        boxShadow={
          tier.highlight
            ? "0 20px 60px rgba(0,198,255,0.2)"
            : isHovered
            ? "0 10px 40px rgba(0,198,255,0.1)"
            : "none"
        }
      >
        {tier.badge && (
          <Box
            position="absolute"
            top="-12px"
            left="50%"
            transform="translateX(-50%)"
            px={4}
            py={1.5}
            bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
            borderRadius="full" // Rundungen
            boxShadow="0 4px 12px rgba(0,198,255,0.3)"
          >
            <Text 
              fontSize="xs" // Badge Text
              fontWeight="900" 
              color="white" 
              letterSpacing="1px"
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
            >
              {tier.badge}
            </Text>
          </Box>
        )}

        <VStack spacing={5} align="stretch" h="100%"> {/* VStack spacing groß */}
          {/* Header */}
          <VStack spacing={3} align="center"> {/* VStack spacing mittel */}
            <Box
              w={{ base: "60px", md: "70px" }}
              h={{ base: "60px", md: "70px" }}
              bg={tier.highlight ? "rgba(0,198,255,0.1)" : "rgba(255,255,255,0.05)"}
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderColor={tier.highlight ? "rgba(0,198,255,0.3)" : "rgba(255,255,255,0.1)"}
            >
              <Icon
                as={tier.icon}
                w={{ base: "32px", md: "36px" }}
                h={{ base: "32px", md: "36px" }}
                color={tier.highlight ? "cyan.400" : "cyan.300"}
              />
            </Box>
            
            <VStack spacing={2}> {/* VStack spacing klein */}
              <Text
                fontSize={{ base: 'md', md: 'lg' }} // Heading medium
                fontWeight="900"
                color="white"
                textAlign="center"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
              >
                {tier.name}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }} // Code Text
                color={tier.highlight ? "cyan.300" : "whiteAlpha.600"}
                fontWeight="600"
                textAlign="center"
              >
                {tier.tagline}
              </Text>
            </VStack>
          </VStack>

          {/* Features */}
          <VStack spacing={3} align="stretch" flex={1}> {/* VStack spacing mittel */}
            {tier.features.map((feature, idx) => (
              <HStack key={idx} spacing={3} align="flex-start">
                <Box
                  minW="20px"
                  h="20px"
                  borderRadius="full" // Rundungen
                  bg={tier.highlight ? "rgba(0,198,255,0.2)" : "rgba(255,255,255,0.1)"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon
                    as={FiCheck}
                    w="12px"
                    h="12px"
                    color={tier.highlight ? "cyan.300" : "white"}
                  />
                </Box>
                <Text
                  fontSize="sm" // Button/Body Text
                  color={tier.highlight ? "whiteAlpha.900" : "whiteAlpha.700"}
                  lineHeight="1.6"
                >
                  {feature}
                </Text>
              </HStack>
            ))}
          </VStack>

          {/* CTA Button */}
          <Link href={tier.ctaLink || '/kontakt'} style={{ width: '100%' }}>
            <Button
              size="lg"
              w="100%"
              h="56px"
              bg={tier.highlight ? "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)" : "rgba(255,255,255,0.05)"}
              color="white"
              border={tier.highlight ? "none" : "1px solid rgba(0,198,255,0.3)"} // Standard Border
              borderRadius="xl" // Cards
              fontWeight="900"
              fontSize="sm" // Button/Body Text
              letterSpacing="0.5px"
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: tier.highlight ? "0 8px 24px rgba(0,198,255,0.4)" : "0 8px 24px rgba(0,198,255,0.2)",
                bg: tier.highlight ? "linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)" : "rgba(0,198,255,0.1)"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" // Smooth Transitions
            >
              {tier.cta}
            </Button>
          </Link>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default PricingCard;