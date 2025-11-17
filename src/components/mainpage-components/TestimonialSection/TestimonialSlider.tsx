'use client';

import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);

interface TestimonialSliderProps {
  clients?: number;
  projects?: number;
  satisfaction?: number;
  animateStats?: boolean;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  clients = 50,
  projects = 200,
  satisfaction = 98,
  animateStats = true
}) => {
  const [rotation, setRotation] = useState(0);
  const [stats, setStats] = useState({ clients: 0, projects: 0, satisfaction: 0 });
  
  const orbitRadius = useBreakpointValue({ base: 140, md: 200 }) || 140;

  const logos = [
    { name: "VW", angle: 0, size: "lg" },
    { name: "BMW", angle: 45, size: "md" },
    { name: "SIE", angle: 90, size: "lg" },
    { name: "DB", angle: 135, size: "sm" },
    { name: "CON", angle: 180, size: "md" },
    { name: "SAL", angle: 225, size: "sm" },
    { name: "WD", angle: 270, size: "lg" },
    { name: "EP", angle: 315, size: "md" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!animateStats) {
      setStats({ clients, projects, satisfaction });
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        clients: Math.floor(progress * clients),
        projects: Math.floor(progress * projects),
        satisfaction: Math.floor(progress * satisfaction)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, increment);

    return () => clearInterval(interval);
  }, [animateStats, clients, projects, satisfaction]);

  return (
    <Box
      position="relative"
      w={{ base: "350px", md: "500px" }}
      h={{ base: "350px", md: "500px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={{ base: "140px", md: "180px" }}
        h={{ base: "140px", md: "180px" }}
        borderRadius="full"
        bg="rgba(255,255,255,0.02)"
        backdropFilter="blur(20px)"
        border="2px solid rgba(0,198,255,0.3)"
        boxShadow="0 0 60px rgba(0,198,255,0.3), inset 0 0 30px rgba(0,198,255,0.1)"
        zIndex={10}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <VStack
          h="100%"
          justify="center"
          spacing={{ base: 0.5, md: 1 }}
          position="relative"
        >
          <MotionBox
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderRadius="full"
            border="2px solid transparent"
            borderTopColor="cyan.400"
            borderRightColor="cyan.400"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <MotionText
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="900"
            bgGradient="linear(to-br, cyan.300, cyan.500)"
            bgClip="text"
            lineHeight="1"
          >
            {stats.clients}+
          </MotionText>

          <VStack spacing={0}>
            <Text fontSize={{ base: "2xs", md: "xs" }} color="white" fontWeight="700">
              Glückliche Kunden
            </Text>
            <Text fontSize="2xs" color="whiteAlpha.600">
              {stats.projects}+ Projekte
            </Text>
          </VStack>

          <HStack spacing={0}>
            {[...Array(5)].map((_, i) => (
              <Text key={i} fontSize={{ base: "xs", md: "sm" }} color="yellow.400">★</Text>
            ))}
          </HStack>
          
          <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="700" color="yellow.400">
            {stats.satisfaction}%
          </Text>
        </VStack>
      </MotionBox>

      {logos.map((logo, index) => {
        const angle = (logo.angle + rotation) * (Math.PI / 180);
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;

        const sizes = {
          sm: { w: { base: "35px", md: "45px" }, h: { base: "35px", md: "45px" }, fontSize: "xs" },
          md: { w: { base: "45px", md: "60px" }, h: { base: "45px", md: "60px" }, fontSize: "sm" },
          lg: { w: { base: "55px", md: "75px" }, h: { base: "55px", md: "75px" }, fontSize: "md" }
        };

        const size = sizes[logo.size as keyof typeof sizes];

        return (
          <MotionBox
            key={logo.name}
            position="absolute"
            top="50%"
            left="50%"
            w={size.w}
            h={size.h}
            style={{
              x,
              y,
              marginLeft: `-${orbitRadius === 140 ? 22.5 : 30}px`,
              marginTop: `-${orbitRadius === 140 ? 22.5 : 30}px`
            }}
            borderRadius="full"
            bg="rgba(255,255,255,0.05)"
            backdropFilter="blur(10px)"
            border="2px solid rgba(0,198,255,0.3)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 30px rgba(0,198,255,0.2)"
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Text
              fontSize={size.fontSize}
              fontWeight="900"
              color="cyan.300"
            >
              {logo.name}
            </Text>
          </MotionBox>
        );
      })}

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={{ base: "300px", md: "420px" }}
        h={{ base: "300px", md: "420px" }}
        borderRadius="full"
        border="1px solid rgba(0,198,255,0.1)"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={{ base: "320px", md: "450px" }}
        h={{ base: "320px", md: "450px" }}
        borderRadius="full"
        border="1px dashed rgba(0,198,255,0.1)"
      />
    </Box>
  );
};

export default TestimonialSlider;