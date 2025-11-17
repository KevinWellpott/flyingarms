'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Container,
  Badge,
  AspectRatio
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../../components/mainpage-components/HeroSection/buttoncta';

const MotionBox = motion(Box);
const MotionText = motion(Text);

// Simple Drone Icon
const DroneIcon = ({ size = "20px", color = "cyan.400" }) => (
  <Box w={size} h={size}>
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path
        fill="currentColor"
        d="M5,3V4H3V5H5.5L7,6.5V9H8.5L12,12.5L15.5,9H17V6.5L18.5,5H21V4H19V3H17.5L15.5,5H8.5L6.5,3H5M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M7,17A2,2 0 0,1 9,19A2,2 0 0,1 7,21A2,2 0 0,1 5,19A2,2 0 0,1 7,17M17,17A2,2 0 0,1 19,19A2,2 0 0,1 17,21A2,2 0 0,1 15,19A2,2 0 0,1 17,17Z"
      />
    </svg>
  </Box>
);

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -100]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <MotionBox
      position="relative"
      minH={{ base: "100vh", md: "100vh" }}
      overflow="hidden"
      bg="transparent"
      
      
      style={{
        opacity: heroOpacity,
        y: heroY
      }}
    >
      {/* Subtle background glow */}
      <Box 
        position="absolute" 
        top="20%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "300px", md: "400px" }}
        h={{ base: "300px", md: "400px" }}
        bg="radial-gradient(circle, rgba(0,198,255,0.06) 0%, transparent 70%)"
        filter="blur(100px)"
        pointerEvents="none"
      />

      {/* Minimal grid */}
      <Box 
        position="absolute" 
        inset={0} 
        opacity={{ base: 0.01, md: 0.02 }}
        backgroundImage="linear-gradient(rgba(0,198,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.3) 1px, transparent 1px)"
        backgroundSize="100px 100px"
        pointerEvents="none"
      />

      {/* Small floating drone - Desktop only */}
      <MotionBox
        position="absolute"
        top="18%"
        right="8%"
        display={{ base: "none", lg: "block" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <MotionBox
          animate={{
            y: [0, -15, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Box
            position="relative"
            w="60px"
            h="60px"
            bg="rgba(0,198,255,0.1)"
            backdropFilter="blur(10px)"
            borderRadius="10px"
            border="1px solid rgba(0,198,255,0.3)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 8px 32px rgba(0,198,255,0.2)"
          >
            <DroneIcon size="28px" color="rgba(0,198,255,0.8)" />
            
            {/* Simple propeller indicators */}
            {[
              { top: "5px", left: "5px" },
              { top: "5px", right: "5px" },
              { bottom: "5px", left: "5px" },
              { bottom: "5px", right: "5px" }
            ].map((pos, i) => (
              <Box
                key={i}
                position="absolute"
                w="6px"
                h="6px"
                bg="rgba(0,198,255,0.4)"
                borderRadius="full"
                {...pos}
              />
            ))}

            {/* Status light */}
            <MotionBox
              position="absolute"
              top="-4px"
              right="-4px"
              w="10px"
              h="10px"
              bg="green.400"
              borderRadius="full"
              animate={{
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              boxShadow="0 0 10px rgba(0,255,0,0.6)"
            />
          </Box>
        </MotionBox>
      </MotionBox>

      <Container 
        maxW="container.lg"
        px={{ base: 4, md: 6 }}
        py={{ base: 0, md: 0 }}
        position="relative"
        zIndex={10}
        height="100vh"
        display="flex"
        alignItems="center"
      >
        <Box width="100%">
          {/* Mobile/Tablet - Single Column */}
          <Box display={{ base: "block", lg: "none" }}>
            <VStack 
              spacing={{ base: 3, md: 5 }}
              align="center"
              textAlign="center"
              px={{ base: 4, md: 4 }}
            >
              {/* Badge */}
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
                  <DroneIcon size="14px" color="rgba(0,198,255,0.9)" />
                  <Text 
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="600"
                    color="cyan.400"
                  >
                    Flying Arms Aviation
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

              {/* Headline */}
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
                    Professionelle
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
                    in 4K Qualität
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
                Von Industrieanlagen bis Traumhochzeiten – EU-zertifizierte Drohnenoperationen für Ihr Projekt.
              </MotionText>

              {/* Trust badges */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                w="100%"
              >
                <HStack
                  spacing={{ base: 2, md: 3 }}
                  flexWrap="wrap"
                  justify="center"
                  rowGap={2}
                >
                  <Badge
                    bg="rgba(0,198,255,0.08)"
                    color="cyan.300"
                    border="1px solid rgba(0,198,255,0.2)"
                    borderRadius="md"
                    px={{ base: 3, md: 4 }}
                    py={1.5}
                    fontSize="xs"
                    fontWeight="700"
                    backdropFilter="blur(10px)"
                  >
                    ✓ EU-ZERTIFIZIERT
                  </Badge>
                  <Badge
                    bg="rgba(255,255,255,0.03)"
                    color="whiteAlpha.700"
                    border="1px solid rgba(255,255,255,0.1)"
                    borderRadius="md"
                    px={{ base: 3, md: 4 }}
                    py={1.5}
                    fontSize="xs"
                    fontWeight="700"
                    backdropFilter="blur(10px)"
                  >
                    🛡️ 2M€ VERSICHERT
                  </Badge>
                  <Badge
                    bg="rgba(0,198,255,0.08)"
                    color="cyan.300"
                    border="1px solid rgba(0,198,255,0.2)"
                    borderRadius="md"
                    px={{ base: 3, md: 4 }}
                    py={1.5}
                    fontSize="xs"
                    fontWeight="700"
                    backdropFilter="blur(10px)"
                  >
                    📹 4K/60FPS
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
                    variant="primary"
                    onClick={() => console.log('Zum Termin')}
                    bgGradient="linear(to-r, cyan.400, cyan.600)"
                    color="white"
                    border="2px solid rgba(0,198,255,0.4)"
                    boxShadow="0 4px 24px rgba(0,198,255,0.3)"
                    w="100%"
                    h={{ base: "48px", md: "52px" }}
                    fontSize={{ base: "sm", md: "md" }}
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
                    🎥 Projekt starten
                  </Button>
                  
                  <Button 
                    variant="secondary"
                    onClick={() => console.log('Portfolio')}
                    bg="rgba(255,255,255,0.03)"
                    color="cyan.300"
                    border="2px solid rgba(0,198,255,0.25)"
                    backdropFilter="blur(20px)"
                    w="100%"
                    h={{ base: "48px", md: "52px" }}
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="600"
                    _hover={{
                      bg: "rgba(0,198,255,0.08)",
                      borderColor: "rgba(0,198,255,0.4)",
                      transform: "translateY(-2px)"
                    }}
                  >
                    Portfolio ansehen
                  </Button>
                </VStack>
              </MotionBox>

              {/* Stats */}
              <MotionBox
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                w="100%"
                pt={{ base: 2, md: 4 }}
              >
                <HStack
                  spacing={{ base: 4, md: 6 }}
                  justify="center"
                  flexWrap="wrap"
                >
                  {[
                    { value: "500+", label: "Projekte" },
                    { value: "50+", label: "Kunden" },
                    { value: "98%", label: "Zufriedenheit" }
                  ].map((stat, i) => (
                    <VStack key={i} spacing={0.5}>
                      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="900" color="cyan.400">
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
          </Box>

          {/* Desktop - Two Columns */}
          <Box display={{ base: "none", lg: "grid" }} gridTemplateColumns="1.2fr 1fr" gap={{ base: 4, md: 6 }} alignItems="center">
            {/* Left Column - Content */}
            <VStack 
              spacing={5}
              align="flex-start"
              textAlign="left"
            >
              {/* Badge */}
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
                  <DroneIcon size="16px" color="rgba(0,198,255,0.9)" />
                  <Text 
                    fontSize="sm"
                    fontWeight="600"
                    color="cyan.400"
                  >
                    Flying Arms Aviation
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

              {/* Headline */}
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
                    Professionelle
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
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="700"
                    lineHeight="1.2"
                    color="whiteAlpha.800"
                    mt={2}
                  >
                    in 4K Qualität
                  </Text>
                </VStack>
              </MotionBox>

              {/* Subtitle */}
              <MotionText
                fontSize={{ base: "lg", md: "xl" }}
                color="rgba(255,255,255,0.65)"
                lineHeight="1.6"
                maxW="540px"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Von Industrieanlagen bis Traumhochzeiten – EU-zertifizierte Drohnenoperationen für Ihr Projekt.
              </MotionText>

              {/* Trust badges */}
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
                    ✓ EU-ZERTIFIZIERT A2
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
                    🛡️ 2M€ VERSICHERT
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
                    📹 4K/60FPS
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
                    variant="primary"
                    onClick={() => console.log('Zum Termin')}
                    bgGradient="linear(to-r, cyan.400, cyan.600)"
                    color="white"
                    border="2px solid rgba(0,198,255,0.4)"
                    boxShadow="0 4px 24px rgba(0,198,255,0.3)"
                    minW="200px"
                    h="56px"
                    fontSize="md"
                    fontWeight="700"
                    px={8}
                    _hover={{
                      bgGradient: "linear(to-r, cyan.300, cyan.500)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 32px rgba(0,198,255,0.4)"
                    }}
                    _active={{
                      transform: "translateY(0)"
                    }}
                  >
                    🎥 Projekt starten
                  </Button>
                  
                  <Button 
                    variant="secondary"
                    onClick={() => console.log('Portfolio')}
                    bg="rgba(255,255,255,0.03)"
                    color="cyan.300"
                    border="2px solid rgba(0,198,255,0.25)"
                    backdropFilter="blur(20px)"
                    minW="180px"
                    h="56px"
                    fontSize="md"
                    fontWeight="600"
                    px={8}
                    _hover={{
                      bg: "rgba(0,198,255,0.08)",
                      borderColor: "rgba(0,198,255,0.4)",
                      transform: "translateY(-2px)"
                    }}
                  >
                    Portfolio ansehen
                  </Button>
                </HStack>
              </MotionBox>

              {/* Stats */}
              <MotionBox
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                pt={{ base: 6, md: 8 }}
              >
                <HStack spacing={{ base: 4, md: 6 }}>
                  {[
                    { value: "500+", label: "Projekte" },
                    { value: "50+", label: "Kunden" },
                    { value: "98%", label: "Zufriedenheit" }
                  ].map((stat, i) => (
                    <VStack key={i} spacing={1} align="flex-start">
                      <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="900" color="cyan.400">
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

            {/* Right Column - Video Container */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Box
                bg="rgba(0,0,0,0.5)"
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="2px solid rgba(0,198,255,0.15)"
                overflow="hidden"
                boxShadow="0 20px 60px rgba(0,198,255,0.12)"
                position="relative"
              >
                {/* Video container */}
                <AspectRatio ratio={16 / 9}>
                  <Box
                    bg="rgba(0,0,0,0.6)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {/* Vimeo Embed - Replace with actual video ID */}
                    <iframe
                      src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1&loop=1&muted=1&background=1"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0
                      }}
                      allow="autoplay; fullscreen; picture-in-picture"
                      title="Drone Footage"
                    />
                    
                    {/* Fallback placeholder */}
                    <VStack spacing={3} color="whiteAlpha.600">
                      <Box
                        w="80px"
                        h="80px"
                        bg="rgba(0,198,255,0.1)"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid rgba(0,198,255,0.3)"
                      >
                        <DroneIcon size="40px" color="rgba(0,198,255,0.6)" />
                      </Box>
                      <Text fontSize="sm" fontWeight="600" color="cyan.400">
                        Showreel Preview
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.500">
                        Ersetze YOUR_VIDEO_ID mit deiner Vimeo ID
                      </Text>
                    </VStack>
                  </Box>
                </AspectRatio>

                {/* Video overlay badge */}
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
                    <Text fontSize="xs" color="red.400" fontWeight="bold" fontFamily="'Courier New', monospace">
                      LIVE
                    </Text>
                  </HStack>
                </Box>

                {/* Video quality badge */}
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
                  <Text fontSize="xs" color="cyan.400" fontWeight="bold" fontFamily="'Courier New', monospace">
                    4K
                  </Text>
                </Box>

                {/* Subtle gradient overlay */}
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-br, rgba(0,198,255,0.05), transparent)"
                  pointerEvents="none"
                />
              </Box>
            </MotionBox>
          </Box>
        </Box>

        {/* Scroll indicator */}
        <MotionBox
          position="absolute"
          bottom={{ base: 8, md: 10 }}
          left="50%"
          transform="translateX(-50%)"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <MotionBox
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <VStack spacing={2}>
              <Text fontSize="xs" color="cyan.400" fontWeight="600">
                Explore
              </Text>
              <Box w="1px" h={{ base: "20px", md: "28px" }} bg="cyan.400" opacity={0.4} />
            </VStack>
          </MotionBox>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default HeroSection;