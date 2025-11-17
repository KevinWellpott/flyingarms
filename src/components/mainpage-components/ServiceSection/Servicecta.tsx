'use client';

import React from 'react';
import { Box, VStack, HStack, Text, Button } from '@chakra-ui/react';

interface ServiceCTAProps {
  onContactClick?: () => void;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({ onContactClick }) => {
  return (
    <Box
      bg="rgba(255,255,255,0.02)"
      backdropFilter="blur(20px)"
      borderRadius="xl"
      border="1px solid rgba(0,198,255,0.2)"
      p={{ base: 6, md: 8 }}
      maxW="600px"
      mx="auto"
    >
      <VStack spacing={4}>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="700"
          color="white"
        >
          Ihr Projekt nicht dabei?
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="whiteAlpha.600"
          textAlign="center"
        >
          Kontaktieren Sie uns für individuelle Lösungen. Mit über 20 Jahren Flugerfahrung realisieren wir auch Ihr außergewöhnliches Projekt.
        </Text>
        
        <Button
          onClick={onContactClick}
          bgGradient="linear(to-r, cyan.400, cyan.600)"
          color="white"
          border="2px solid rgba(0,198,255,0.4)"
          boxShadow="0 4px 24px rgba(0,198,255,0.3)"
          w={{ base: "100%", md: "auto" }}
          minW={{ md: "200px" }}
          h="48px"
          fontSize="sm"
          fontWeight="700"
          _hover={{
            bgGradient: "linear(to-r, cyan.300, cyan.500)",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 32px rgba(0,198,255,0.4)"
          }}
          _active={{
            transform: "translateY(0)"
          }}
        >
          📧 Jetzt Anfragen
        </Button>

        <HStack spacing={3} flexWrap="wrap" justify="center">
          <Box
            px={4}
            py={2}
            bg="rgba(0,198,255,0.08)"
            borderRadius="md"
            border="1px solid rgba(0,198,255,0.25)"
          >
            <Text fontSize="xs" fontWeight="700" color="cyan.300">
              ✓ EU-zertifiziert A2
            </Text>
          </Box>
          <Box
            px={4}
            py={2}
            bg="rgba(0,198,255,0.08)"
            borderRadius="md"
            border="1px solid rgba(0,198,255,0.25)"
          >
            <Text fontSize="xs" fontWeight="700" color="cyan.300">
              ✓ 20+ Jahre Erfahrung
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ServiceCTA;