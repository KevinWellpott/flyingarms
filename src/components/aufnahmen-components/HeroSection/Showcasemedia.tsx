'use client';

import React from 'react';
import { Box, VStack, Text, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';


const MotionBox = motion(Box);

interface ShowcaseMediaProps {
  isVisible: boolean;
}

const ShowcaseMedia: React.FC<ShowcaseMediaProps> = ({ isVisible }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Box
        bg="rgba(0,0,0,0.5)"
        backdropFilter="blur(20px)"
        borderRadius="2xl"
        border="1px solid rgba(0,198,255,0.15)"
        overflow="hidden"
        boxShadow="0 20px 60px rgba(0,198,255,0.12)"
        position="relative"
        h={{ base: '300px', sm: '400px', md: '450px' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Placeholder Content */}
        <VStack spacing={6} color="whiteAlpha.600">
          <Box
            w="80px"
            h="80px"
            bg="rgba(0,198,255,0.1)"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(0,198,255,0.3)"
          >
            
          </Box>
          <VStack spacing={3}>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="600" 
              color="cyan.400"
              textAlign="center"
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
            >
              Luftaufnahmen Showreel
            </Text>
            <Text 
              fontSize="xs" 
              color="whiteAlpha.500" 
              textAlign="center"
              fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
            >
              6K Ultra-HD • 360° Panoramen • 48MP Fotos
            </Text>
          </VStack>
        </VStack>

        {/* Video overlay badges */}
        <Box
          position="absolute"
          top={4}
          left={4}
          px={3}
          py={1.5}
          bg="rgba(0,0,0,0.8)"
          backdropFilter="blur(10px)"
          borderRadius="md"
          border="1px solid rgba(0,198,255,0.3)"
        >
          <HStack spacing={2}>
            <Box w="6px" h="6px" bg="red.500" borderRadius="full" />
            <Text 
              fontSize="xs" 
              color="red.400" 
              fontWeight="bold" 
              fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
            >
              LIVE
            </Text>
          </HStack>
        </Box>

        <Box
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1.5}
          bg="rgba(0,0,0,0.8)"
          backdropFilter="blur(10px)"
          borderRadius="md"
          border="1px solid rgba(0,198,255,0.3)"
        >
          <Text 
            fontSize="xs" 
            color="cyan.400" 
            fontWeight="bold" 
            fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
          >
            6K
          </Text>
        </Box>

        {/* Bottom badge */}
        <Box
          position="absolute"
          bottom={4}
          left={4}
          px={3}
          py={1.5}
          bg="rgba(0,0,0,0.8)"
          backdropFilter="blur(10px)"
          borderRadius="md"
          border="1px solid rgba(0,198,255,0.3)"
        >
          <Text 
            fontSize="xs" 
            color="cyan.400" 
            fontWeight="bold"
            fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
          >
            📸 48MP
          </Text>
        </Box>

        {/* Gradient overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-br, rgba(0,198,255,0.05), transparent)"
          pointerEvents="none"
        />
      </Box>
    </MotionBox>
  );
};

export default ShowcaseMedia;