'use client';

import React, { useEffect, useState } from 'react';
import { Box, VStack, Container } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroContent from '../../components/aufnahmen-components/HeroSection/Herocontent';
import ShowcaseMedia from '../../components/aufnahmen-components/HeroSection/Showcasemedia';

const MotionBox = motion(Box);

const AufnahmenHeroSection: React.FC = () => {
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
      minH="100vh"
      bg="transparent"
      style={{
        opacity: heroOpacity,
        y: heroY
      }}
    >
      {/* Background Elements */}
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

      {/* Floating Drone - Desktop only */}
      <MotionBox
        position="absolute"
        top="18%"
        right="8%"
        display={{ base: "none", lg: "block" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
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
          />
        </MotionBox>
      </MotionBox>

      <Container 
        maxW="container.lg"
        px={{ base: 4, md: 6 }}
        py={{ base: 12, md: 20 }}
        position="relative"
        zIndex={10}
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <Box width="100%">
          {/* Mobile/Tablet - Single Column */}
          <Box display={{ base: "block", lg: "none" }}>
            <HeroContent isVisible={isVisible} isMobile={true} />
          </Box>

          {/* Desktop - Two Columns */}
          <Box 
            display={{ base: "none", lg: "grid" }} 
            templateColumns="1.2fr 1fr" 
            gap={{ base: 8, md: 16 }} 
            alignItems="center"
            w="100%"
          >
            {/* Left Column - Content */}
            <HeroContent isVisible={isVisible} isMobile={false} />

            {/* Right Column - Showcase Container */}
            <ShowcaseMedia isVisible={isVisible} />
          </Box>
        </Box>

        {/* Scroll Indicator */}
        <MotionBox
          position="absolute"
          bottom={{ base: 6, md: 10 }}
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
              <Box
                fontSize="xs"
                color="cyan.400" 
                fontWeight="600"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
              >
                Explore
              </Box>
              <Box w="1px" h={{ base: "20px", md: "28px" }} bg="cyan.400" opacity={0.4} />
            </VStack>
          </MotionBox>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default AufnahmenHeroSection;