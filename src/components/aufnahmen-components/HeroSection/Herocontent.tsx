'use client';

import React from 'react';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Badge,
  Button
} from '@chakra-ui/react';
import { motion } from 'framer-motion';


const MotionBox = motion(Box);
const MotionText = motion(Text);

interface HeroContentProps {
  isVisible: boolean;
  isMobile?: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ isVisible, isMobile = false }) => {
  const handleAufnahmeAnfrage = () => {
    console.log('Aufnahme anfragen');
    // router.push('/kontakt');
  };

  const handlePortfolio = () => {
    console.log('Portfolio ansehen');
    // router.push('/portfolio');
  };

  if (isMobile) {
    return (
      <VStack 
        spacing={{ base: 3, md: 5 }}
        align="center"
        textAlign="center"
        px={{ base: 4, md: 4 }}
        w="100%"
      >
        {/* Brand Badge */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <HStack
            px={{ base: 4, md: 5 }}
            py={2}
            borderRadius="full"
            bg="rgba(0,198,255,0.08)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(0,198,255,0.25)"
            spacing={2}
            boxShadow="0 4px 20px rgba(0,198,255,0.1)"
          >
            
            <Text 
              fontSize="xs"
              fontWeight="600"
              color="cyan.400"
            >
              Flying Arms – Luftaufnahmen
            </Text>
            <Box
              w="5px"
              h="5px"
              bg="green.400"
              borderRadius="full"
              boxShadow="0 0 6px rgba(0,255,0,0.6)"
            />
          </HStack>
        </MotionBox>

        {/* Headlines */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          w="100%"
        >
          <VStack spacing={0.5}>
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              lineHeight="1"
              color="white"
            >
              Beeindruckende
            </Text>
            <Text 
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              lineHeight="1"
              bgGradient="linear(to-r, cyan.300, cyan.500)"
              bgClip="text"
            >
              Luftaufnahmen
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="700"
              lineHeight="1.2"
              color="whiteAlpha.800"
              mt={2}
            >
              in 6K Ultra-HD
            </Text>
          </VStack>
        </MotionBox>

        {/* Subtitle */}
        <MotionText
          fontSize={{ base: "sm", md: "md" }}
          color="rgba(255,255,255,0.65)"
          lineHeight="1.6"
          maxW="500px"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          px={{ base: 4, md: 0 }}
        >
          Hochauflösende Luftbilder bis 48MP, 360° Panoramen und professionelle Videoproduktion für jeden Anlass.
        </MotionText>

        {/* Trust Badges */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          w="100%"
        >
          <HStack
            spacing={2}
            flexWrap="wrap"
            justify="center"
            rowGap={2}
          >
            <Badge
              bg="rgba(0,198,255,0.08)"
              color="cyan.300"
              border="1px solid rgba(0,198,255,0.2)"
              borderRadius="md"
              px={3}
              py={1.5}
              fontSize="xs"
              fontWeight="700"
              backdropFilter="blur(10px)"
            >
              📹 6K ULTRA-HD
            </Badge>
            <Badge
              bg="rgba(255,255,255,0.03)"
              color="whiteAlpha.700"
              border="1px solid rgba(255,255,255,0.1)"
              borderRadius="md"
              px={3}
              py={1.5}
              fontSize="xs"
              fontWeight="700"
              backdropFilter="blur(10px)"
            >
              📸 48MP AUFLÖSUNG
            </Badge>
            <Badge
              bg="rgba(0,198,255,0.08)"
              color="cyan.300"
              border="1px solid rgba(0,198,255,0.2)"
              borderRadius="md"
              px={3}
              py={1.5}
              fontSize="xs"
              fontWeight="700"
              backdropFilter="blur(10px)"
            >
              🎯 20+ JAHRE ERFAHRUNG
            </Badge>
          </HStack>
        </MotionBox>

        {/* CTA Buttons */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          w="100%"
          maxW={{ base: "100%", md: "400px" }}
        >
          <VStack spacing={3} w="100%">
            <Button 
              onClick={handleAufnahmeAnfrage}
              bgGradient="linear(to-r, cyan.400, cyan.600)"
              color="white"
              border="2px solid rgba(0,198,255,0.4)"
              boxShadow="0 4px 24px rgba(0,198,255,0.3)"
              w="100%"
              h={{ base: "48px", md: "52px" }}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="700"
              borderRadius="lg"
              _hover={{
                bgGradient: "linear(to-r, cyan.300, cyan.500)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 32px rgba(0,198,255,0.4)"
              }}
              _active={{
                transform: "translateY(0)"
              }}
            >
              📹 Aufnahme anfragen
            </Button>
            
            <Button 
              onClick={handlePortfolio}
              bg="rgba(255,255,255,0.03)"
              color="cyan.300"
              border="2px solid rgba(0,198,255,0.25)"
              backdropFilter="blur(20px)"
              w="100%"
              h={{ base: "48px", md: "52px" }}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="600"
              borderRadius="lg"
              _hover={{
                bg: "rgba(0,198,255,0.08)",
                borderColor: "rgba(0,198,255,0.4)",
                transform: "translateY(-2px)"
              }}
            >
              🎬 Showreel ansehen
            </Button>
          </VStack>
        </MotionBox>

        {/* Stats */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          w="100%"
          pt={2}
        >
          <HStack
            spacing={4}
            justify="center"
            flexWrap="wrap"
          >
            {[
              { value: "6K", label: "Ultra-HD Qualität" },
              { value: "48MP", label: "Auflösung" },
              { value: "360°", label: "Panoramen" }
            ].map((stat, i) => (
              <VStack key={i} spacing={0.5}>
                <Text fontSize="lg" fontWeight="900" color="cyan.400">
                  {stat.value}
                </Text>
                <Text fontSize="xs" color="whiteAlpha.500" textTransform="uppercase" letterSpacing="wider" fontWeight="600" textAlign="center">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </HStack>
        </MotionBox>
      </VStack>
    );
  }

  // Desktop Layout
  return (
    <VStack 
      spacing={5}
      align="flex-start"
      textAlign="left"
    >
      {/* Brand Badge */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <HStack
          px={5}
          py={2}
          borderRadius="full"
          bg="rgba(0,198,255,0.08)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(0,198,255,0.25)"
          spacing={2}
          boxShadow="0 4px 20px rgba(0,198,255,0.1)"
        >
         
          <Text 
            fontSize="sm"
            fontWeight="600"
            color="cyan.400"
          >
            Flying Arms – Luftaufnahmen
          </Text>
          <Box
            w="6px"
            h="6px"
            bg="green.400"
            borderRadius="full"
            boxShadow="0 0 8px rgba(0,255,0,0.6)"
          />
        </HStack>
      </MotionBox>

      {/* Headlines */}
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <VStack spacing={1} align="flex-start">
          <Text
            fontSize="7xl"
            fontWeight="900"
            lineHeight="0.95"
            color="white"
          >
            Beeindruckende
          </Text>
          <Text 
            fontSize="7xl"
            fontWeight="900"
            lineHeight="0.95"
            bgGradient="linear(to-r, cyan.300, cyan.500)"
            bgClip="text"
          >
            Luftaufnahmen
          </Text>
          <Text 
            fontSize="xl"
            fontWeight="700"
            lineHeight="1.2"
            color="whiteAlpha.800"
            mt={2}
          >
            in 6K Ultra-HD
          </Text>
        </VStack>
      </MotionBox>

      {/* Subtitle */}
      <MotionText
        fontSize="xl"
        color="rgba(255,255,255,0.65)"
        lineHeight="1.6"
        maxW="540px"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Hochauflösende Luftbilder bis 48MP, 360° Panoramen und professionelle Videoproduktion für jeden Anlass.
      </MotionText>

      {/* Trust Badges */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <HStack spacing={3} flexWrap="wrap" rowGap={3}>
          <Badge
            bg="rgba(0,198,255,0.08)"
            color="cyan.300"
            border="1px solid rgba(0,198,255,0.2)"
            borderRadius="md"
            px={5}
            py={2}
            fontSize="xs"
            fontWeight="700"
            backdropFilter="blur(10px)"
          >
            📹 6K ULTRA-HD
          </Badge>
          <Badge
            bg="rgba(255,255,255,0.03)"
            color="whiteAlpha.700"
            border="1px solid rgba(255,255,255,0.1)"
            borderRadius="md"
            px={5}
            py={2}
            fontSize="xs"
            fontWeight="700"
            backdropFilter="blur(10px)"
          >
            📸 48MP AUFLÖSUNG
          </Badge>
          <Badge
            bg="rgba(0,198,255,0.08)"
            color="cyan.300"
            border="1px solid rgba(0,198,255,0.2)"
            borderRadius="md"
            px={5}
            py={2}
            fontSize="xs"
            fontWeight="700"
            backdropFilter="blur(10px)"
          >
            🎯 20+ JAHRE ERFAHRUNG
          </Badge>
        </HStack>
      </MotionBox>

      {/* CTA Buttons */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        pt={3}
      >
        <HStack spacing={4}>
          <Button 
            onClick={handleAufnahmeAnfrage}
            bgGradient="linear(to-r, cyan.400, cyan.600)"
            color="white"
            border="2px solid rgba(0,198,255,0.4)"
            boxShadow="0 4px 24px rgba(0,198,255,0.3)"
            minW="200px"
            h="56px"
            fontSize="md"
            fontWeight="700"
            px={8}
            borderRadius="lg"
            _hover={{
              bgGradient: "linear(to-r, cyan.300, cyan.500)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 32px rgba(0,198,255,0.4)"
            }}
            _active={{
              transform: "translateY(0)"
            }}
          >
            📹 Aufnahme anfragen
          </Button>
          
          <Button 
            onClick={handlePortfolio}
            bg="rgba(255,255,255,0.03)"
            color="cyan.300"
            border="2px solid rgba(0,198,255,0.25)"
            backdropFilter="blur(20px)"
            minW="180px"
            h="56px"
            fontSize="md"
            fontWeight="600"
            px={8}
            borderRadius="lg"
            _hover={{
              bg: "rgba(0,198,255,0.08)",
              borderColor: "rgba(0,198,255,0.4)",
              transform: "translateY(-2px)"
            }}
          >
            🎬 Showreel ansehen
          </Button>
        </HStack>
      </MotionBox>

      {/* Stats */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        pt={8}
      >
        <HStack spacing={6}>
          {[
            { value: "6K", label: "Ultra-HD Qualität" },
            { value: "48MP", label: "Auflösung" },
            { value: "360°", label: "Panoramen" }
          ].map((stat, i) => (
            <VStack key={i} spacing={1} align="flex-start">
              <Text fontSize="3xl" fontWeight="900" color="cyan.400">
                {stat.value}
              </Text>
              <Text fontSize="xs" color="whiteAlpha.500" textTransform="uppercase" letterSpacing="wider" fontWeight="600">
                {stat.label}
              </Text>
            </VStack>
          ))}
        </HStack>
      </MotionBox>
    </VStack>
  );
};

export default HeroContent;