// components/CookieBanner.tsx
'use client';

import React from 'react';
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
  Icon,
  Link
} from '@chakra-ui/react';
import { FaCookie } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookies } from '@/contexts/CookieContext';

const MotionBox = motion(Box);

const CookieBanner: React.FC = () => {
  const { showBanner, acceptAll, denyAll, openPreferences } = useCookies();

  const primary = '#0B99FF';
  const secondary = '#00C6FF';

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="rgba(0, 0, 0, 0.95)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        borderBottom="none"
        p={{ base: 4, md: 6 }}
        zIndex={9999}
        boxShadow={`0 -10px 40px ${primary}20`}
      >
        <Flex
          maxW="1200px"
          mx="auto"
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'start', lg: 'center' }}
          justify="space-between"
          gap={{ base: 4, md: 6 }}
        >
          {/* Cookie Icon & Text */}
          <Flex align="start" gap={4} flex={1}>
            <Box
              p={3}
              bg={`${primary}15`}
              borderRadius="lg"
              border={`1px solid ${primary}30`}
              flexShrink={0}
            >
              <Icon as={FaCookie} color={primary} boxSize={6} />
            </Box>
            
            <VStack align="start" spacing={2} flex={1} minH="0">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                color="white"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                lineHeight="1.2"
              >
                🍪 Cookies & Datenschutz
              </Text>
              <Text
                fontSize="sm"
                color="rgba(255,255,255,0.8)"
                lineHeight="1.5"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                noOfLines={{ base: 3, md: undefined }}
              >
                Wir verwenden Cookies für eine bessere Erfahrung und anonyme Statistiken.{' '}
                <Link 
                  color={primary} 
                  fontWeight="medium" 
                  onClick={openPreferences}
                  cursor="pointer"
                  _hover={{ color: secondary }}
                >
                  Mehr erfahren
                </Link>
              </Text>
            </VStack>
          </Flex>

          {/* Buttons - ALWAYS HORIZONTAL */}
          <HStack spacing={12} flexShrink={0}>
            <Button
              variant="ghost"
              size="sm"
              onClick={denyAll}
              color="rgba(255,255,255,0.7)"
              _hover={{ 
                bg: "rgba(255,255,255,0.1)",
                color: "white"
              }}
              fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
              fontSize="xs"
              display={{ base: "none", md: "flex" }}
            >
              Nur notwendige
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={openPreferences}
              color="rgba(255,255,255,0.7)"
              _hover={{ 
                bg: "rgba(255,255,255,0.1)",
                color: "white"
              }}
              fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
              fontSize="xs"
            >
              Anpassen
            </Button>

            <Button
              size="sm"
              bg={`linear-gradient(135deg, ${primary}, ${secondary})`}
              color="white"
              onClick={acceptAll}
              fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: `0 8px 20px ${primary}40`
              }}
              transition="all 0.2s ease"
              px={6}
              fontSize="xs"
            >
              Alle akzeptieren
            </Button>
          </HStack>
        </Flex>
      </MotionBox>
    </AnimatePresence>
  );
};

export default CookieBanner;