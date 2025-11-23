'use client';

import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [rotation, setRotation] = useState(0);
  const [stats, setStats] = useState({ clients: 0, projects: 0, satisfaction: 0 });
  
  const orbitRadius = useBreakpointValue({ base: 160, md: 220 }) || 160;

  const handleCenterClick = () => {
    router.push('/rezensionen');
  };

  const logos = [
    { logoPath: "/logos/1.svg", altText: "Volkswagen", angle: 0, size: "lg" },
    { logoPath: "/logos/2.svg", altText: "BMW", angle: 45, size: "md" },
    { logoPath: "/logos/3.svg", altText: "Siemens", angle: 90, size: "lg" },
    { logoPath: "/logos/4.svg", altText: "Deutsche Bahn", angle: 135, size: "sm" },
    { logoPath: "/logos/5.svg", altText: "Continental", angle: 180, size: "md" },
    { logoPath: "/logos/6.svg", altText: "SAL", angle: 225, size: "sm" },
    { logoPath: "/logos/7.svg", altText: "WD", angle: 270, size: "lg" },
    { logoPath: "/logos/8.svg", altText: "EP", angle: 315, size: "md" }
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
      w={{ base: "500px", md: "650px" }}
      h={{ base: "500px", md: "650px" }}
      mx="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Background Decorative circles - EXACT same positioning as center */}
     

      {/* Rotating Logos */}
      {logos.map((logo, index) => {
        const angle = (logo.angle + rotation) * (Math.PI / 180);
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;

        const sizes = {
          sm: { w: { base: "70px", md: "90px" }, h: { base: "70px", md: "90px" }, logoSize: { base: "40px", md: "55px" } },
          md: { w: { base: "85px", md: "110px" }, h: { base: "85px", md: "110px" }, logoSize: { base: "50px", md: "70px" } },
          lg: { w: { base: "100px", md: "130px" }, h: { base: "100px", md: "130px" }, logoSize: { base: "60px", md: "85px" } }
        };

        const size = sizes[logo.size as keyof typeof sizes];

        return (
          <MotionBox
            key={logo.altText}
            position="absolute"
            top="47.5%"
            left="47.5%"
            w={size.w}
            h={size.h}
            style={{
              x,
              y,
              marginLeft: `-${orbitRadius === 160 ? 35 : 40}px`,
              marginTop: `-${orbitRadius === 160 ? 35 : 40}px`
            }}
            borderRadius="50%"
            bg="rgba(255,255,255,0.05)"
            backdropFilter="blur(10px)"
            border="2px solid rgba(0,198,255,0.3)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 30px rgba(0,198,255,0.2)"
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300 }}
            zIndex={5}
            overflow="hidden"
          >
            <Box
              w={size.logoSize}
              h={size.logoSize}
              position="relative"
            >
              <Image
                src={logo.logoPath}
                alt={logo.altText}
                fill
                unoptimized
                style={{ 
                  objectFit: 'contain',
                  filter: 'brightness(1.2) contrast(1.1)'
                }}
              />
            </Box>
          </MotionBox>
        );
      })}

      {/* Center Stats Circle - EXACT same positioning as decorative circles */}
      <MotionBox
        position="absolute"
       
        w={{ base: "200px", md: "260px" }}
        h={{ base: "200px", md: "260px" }}
        borderRadius="50%"
        bg="rgba(0,0,0,0.5)"
        backdropFilter="blur(30px)"
        border="2px solid rgba(0,198,255,0.4)"
        boxShadow="0 0 80px rgba(0,198,255,0.4), inset 0 0 40px rgba(0,198,255,0.1)"
        transform="translate(-50%, -50%)"
        zIndex={10}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        cursor="pointer"
        onClick={handleCenterClick}
        _hover={{
          borderColor: "rgba(0,198,255,0.6)",
          boxShadow: "0 0 100px rgba(0,198,255,0.6), inset 0 0 60px rgba(0,198,255,0.15)",
          transform: "translate(-50%, -50%) scale(1.02)",
        }}
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <VStack
          h="100%"
          justify="center"
          spacing={{ base: 1, md: 1.5 }}
          position="relative"
          px={4}
        >
          {/* Rotating border accent */}
          <MotionBox
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderRadius="50%"
            border="2px solid transparent"
            borderTopColor="cyan.400"
            borderRightColor="cyan.400"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            opacity={0.6}
          />

          <MotionText
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="900"
            bgGradient="linear(to-br, cyan.300, cyan.500)"
            bgClip="text"
            lineHeight="1"
            position="relative"
            zIndex={2}
          >
            {stats.clients}+
          </MotionText>

          <VStack spacing={0.5} position="relative" zIndex={2}>
            <Text 
              fontSize={{ base: "xs", md: "sm" }} 
              color="white" 
              fontWeight="700"
              letterSpacing="0.5px"
            >
              Glückliche Kunden
            </Text>
            <Text 
              fontSize={{ base: "2xs", md: "xs" }} 
              color="rgba(255,255,255,0.6)"
              fontWeight="500"
            >
              {stats.projects}+ Projekte
            </Text>
          </VStack>

          <HStack spacing={0.5} position="relative" zIndex={2}>
            {[...Array(5)].map((_, i) => (
              <Box key={i} as={FiStar} size={14} color="#FCD34D" fill="#FCD34D" />
            ))}
          </HStack>
          
          <Text 
            fontSize={{ base: "sm", md: "md" }} 
            fontWeight="700" 
            color="#FCD34D"
            position="relative"
            zIndex={2}
          >
            {stats.satisfaction}%
          </Text>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default TestimonialSlider;