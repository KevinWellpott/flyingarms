'use client';

import React from 'react';
import { Box, Container, VStack, Text, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionBox = motion(Box);

const Impressum = () => {
  return (
    <Box
      width="100%"
      py={{ base: 0, md: 0 }} // Haupt Padding Y
      minH="100vh"
      bg="transparent"
      position="relative"
    >
      <Container
        maxW="container.lg" // Container Breite
        px={{ base: 4, md: 6 }} // Container Padding
        position="relative"
        zIndex={2}
      >
        <VStack spacing={{ base: 3, md: 5 }} align="stretch"> {/* VStack spacing */}

          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            w="100%"
            pt={20}
          >
            <Text
              fontSize="xs" // Badge Text
              fontWeight="700"
              letterSpacing="4px"
              textTransform="uppercase"
              bgGradient="linear(to-r, cyan.300, cyan.500)"
              bgClip="text"
              mb={{ base: 4, md: 8 }} // Margin Bottom
            >
              Rechtliches
            </Text>

            <Text
              fontSize={{ base: "lg", md: "xl" }} // Subtitle
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
            >
              Impressum
            </Text>
          </MotionBox>

          {/* Content */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            w="100%"
            maxW="800px"
            mx="auto"
          >
            <Box
              p={{ base: 5, md: 6 }} // Card Padding
              bg="rgba(255,255,255,0.02)"
              backdropFilter="blur(30px)"
              borderRadius="2xl" // Haupt Container
              border="1px solid rgba(255,255,255,0.1)" // Standard Border
            >
              <VStack spacing={5} align="stretch"> {/* VStack spacing groß */}

                <Box>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }} // Heading medium
                    fontWeight="900"
                    color="cyan.300"
                    mb={3}
                    fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
                  >
                    Angaben gemäß § 5 TMG
                  </Text>
                  <Text
                    fontSize="sm" // Button/Body Text
                    color="whiteAlpha.700"
                    lineHeight="1.7"
                  >
                    {/* HIER DEINE DATEN EINTRAGEN */}

                    Klaus Dannöhl<br />
                    FlyingArms<br />
                    Kreuzstraße 65a <br />
                    38118 Braunschweig<br />
                    Deutschland
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }} // Heading medium
                    fontWeight="900"
                    color="cyan.300"
                    mb={3}
                    fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
                  >
                    Kontakt
                  </Text>
                  <Text
                    fontSize="sm" // Button/Body Text
                    color="whiteAlpha.700"
                    lineHeight="1.7"
                  >
                    {/* HIER DEINE KONTAKTDATEN */}
                    Telefon: 0170/5880276<br />
                    E-Mail: info@flyingarms.de
                  </Text>
                </Box>

                

        

              </VStack>
            </Box>
          </MotionBox>

          {/* Back Button */}
          <Box textAlign="center" pb={10}>
            <Link as={NextLink} href="/" color="cyan.300" _hover={{ color: "cyan.400" }}>
              ← Zurück zur Startseite
            </Link>
          </Box>

        </VStack>
      </Container>
    </Box>
  );
};

export default Impressum;