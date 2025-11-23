'use client';

import React from 'react';
import { Box, VStack, HStack, Text, SimpleGrid, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiShield, FiAward, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);

const TrustIndicators: React.FC = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      w="100%"
      maxW="900px"
    >
      <Box
        p={{ base: 5, md: 6 }} // Card Padding
        bg="rgba(255,255,255,0.02)"
        backdropFilter="blur(20px)"
        borderRadius="2xl" // Haupt Container
        border="1px solid rgba(255,255,255,0.1)" // Standard Border
      >
        <VStack spacing={5}> {/* VStack spacing groß */}
          <HStack spacing={2} justify="center">
            <Icon as={FiCheck} w={6} h={6} color="cyan.400" />
            <Text
              fontSize={{ base: 'md', md: 'lg' }} // Heading medium
              fontWeight="800"
              color="white"
              textAlign="center"
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
            >
              Alle Pakete beinhalten
            </Text>
          </HStack>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: 4, md: 6 }} // Grid Gap
            w="100%"
          >
            <VStack spacing={2}> {/* VStack spacing klein */}
              <Icon as={FiShield} w={8} h={8} color="cyan.400" />
              <Text 
                fontSize="sm" // Button/Body Text
                fontWeight="700" 
                color="cyan.300"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
              >
                2M€ Haftpflicht
              </Text>
              <Text 
                fontSize="xs" // Badge Text
                color="whiteAlpha.500" 
                textAlign="center"
              >
                Vollversichert & Zertifiziert
              </Text>
            </VStack>

            <VStack spacing={2}> {/* VStack spacing klein */}
              <Icon as={FiAward} w={8} h={8} color="cyan.400" />
              <Text 
                fontSize="sm" // Button/Body Text
                fontWeight="700" 
                color="cyan.300"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
              >
                EU A2 Lizenz
              </Text>
              <Text 
                fontSize="xs" // Badge Text
                color="whiteAlpha.500" 
                textAlign="center"
              >
                20+ Jahre Flugerfahrung
              </Text>
            </VStack>

            <VStack spacing={2}> {/* VStack spacing klein */}
              <Icon as={FiZap} w={8} h={8} color="cyan.400" />
              <Text 
                fontSize="sm" // Button/Body Text
                fontWeight="700" 
                color="cyan.300"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
              >
                Schnelle Lieferung
              </Text>
              <Text 
                fontSize="xs" // Badge Text
                color="whiteAlpha.500" 
                textAlign="center"
              >
                Express-Option verfügbar
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default TrustIndicators;