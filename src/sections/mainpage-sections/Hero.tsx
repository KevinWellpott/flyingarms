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
import { FiCheck, FiShield, FiVideo, FiPlay, FiCalendar, FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Button from '../../components/mainpage-components/HeroSection/buttoncta';
import CustomYouTubePlayer from '../../components/CustomYouTubePlayer';
import { getSiteSettings, extractYouTubeVideoId } from '@/lib/site-settings';
import Link from 'next/link';

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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -100]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Load YouTube URL - Non-blocking, doesn't delay hero section rendering
  useEffect(() => {
    // Don't block initial render - load in background
    const loadYouTubeUrl = async () => {
      try {
        const settings = await getSiteSettings();
        if (settings?.hero_youtube_url) {
          const videoId = extractYouTubeVideoId(settings.hero_youtube_url);
          if (videoId) {
            setYoutubeVideoId(videoId);
          }
        }
      } catch (error) {
        console.error('Error loading YouTube URL:', error);
      }
    };

    // Load after initial render to not block hero section
    const timer = setTimeout(() => {
      loadYouTubeUrl();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const heroElement = document.querySelector('[data-hero-section]');
    if (!heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      // Check if mouse is within the hero section bounds
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        setIsHovering(true);
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Use document-level mousemove to track mouse position
    document.addEventListener('mousemove', handleMouseMove);

    // Use element-level events for more reliable hover detection
    heroElement.addEventListener('mouseenter', handleMouseEnter);
    heroElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      heroElement.removeEventListener('mouseenter', handleMouseEnter);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <MotionBox
      data-hero-section
      position="relative"
      minH={{ base: "100vh", md: "100vh" }}
      overflow="hidden"
      bg="transparent"
      style={{
        opacity: heroOpacity,
        y: heroY
      }}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        backgroundImage="url('/Untitled design (89).png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />

      {/* Black Overlay - Always constant, never changes */}
      <Box
        position="absolute"
        inset={0}
        zIndex={2}
        pointerEvents="none"
        bg="rgba(0,0,0,0.8)"
      />

      {/* Spotlight Effect Layer - Only visible when hovering */}
      <Box
        position="absolute"
        inset={0}
        zIndex={3}
        pointerEvents="none"
        opacity={isHovering ? 1 : 0}
        transition="opacity 0.2s ease"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.8) 100%)`,
          transition: isHovering ? 'opacity 0.2s ease, background 0.15s ease-out' : 'opacity 0.2s ease',
        }}
      />

      {/* Small floating drone - Desktop only */}
      <MotionBox
        position="absolute"
        top="18%"
        right="8%"
        display={{ base: "none", lg: "block" }}
        zIndex={15}
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
        maxW="container.xl"
        px={{ base: 4, md: 8 }}
        py={{ base: 0, md: 0 }}
        position="relative"
        zIndex={20}
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
                    Drohnenarbeit
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="700"
                    lineHeight="1.2"
                    color="whiteAlpha.800"
                    mt={2}
                  >
                    seit über 10 Jahren.
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
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <FiCheck size={14} />
                    EU-ZERTIFIZIERT
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
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <FiAward size={14} />
                    10+ JAHRE ERFAHRUNG
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
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <FiVideo size={14} />
                    4K/60FPS
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
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    _hover={{
                      bgGradient: "linear(to-r, cyan.300, cyan.500)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 32px rgba(0,198,255,0.4)"
                    }}
                    _active={{
                      transform: "translateY(0)"
                    }}
                  >
                    <FiPlay size={18} />
                    Projekt starten
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

              {/* YouTube Player */}
              {youtubeVideoId && (
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  w="100%"
                  maxW="100%"
                  pt={4}
                >
                  <Box
                    as="div"
                    className="w-full"
                  >
                    <CustomYouTubePlayer
                      videoId={youtubeVideoId}
                      autoplay={false}
                      muted={false}
                      showControls={true}
                      colorGlow="#00C6FF"
                    />
                  </Box>
                </MotionBox>
              )}

              {/* Stats */}
              <MotionBox
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                w="100%"
                pt={{ base: 4, md: 6 }}
              >
                <HStack
                  spacing={{ base: 6, md: 8 }}
                  justify="center"
                  flexWrap="wrap"
                  divider={
                    <Box
                      h="40px"
                      w="1px"
                      bg="rgba(255,255,255,0.1)"
                    />
                  }
                >
                  {[
                    { value: "500+", label: "Projekte", icon: FiVideo },
                    { value: "10", label: "Jahre aktiv", icon: FiUsers },
                    { value: "98%", label: "Zufriedenheit", icon: FiTrendingUp }
                  ].map((stat, i) => (
                    <VStack key={i} spacing={1.5} align="center">
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="800"
                        color="cyan.400"
                        lineHeight="1"
                      >
                        {stat.value}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="rgba(255,255,255,0.5)"
                        textTransform="uppercase"
                        letterSpacing="1.5px"
                        fontWeight="500"
                      >
                        {stat.label}
                      </Text>
                    </VStack>
                  ))}
                </HStack>
              </MotionBox>
            </VStack>
          </Box>

          {/* Desktop - Two Columns: Links Text, Rechts YouTube Player */}
          <Box display={{ base: "none", lg: "grid" }} gridTemplateColumns="1fr 1fr" gap={{ base: 8, md: 12 }} alignItems="center" w="100%" maxW="1400px" mx="auto">
            {/* Left Column - Text Content */}
            <VStack
              spacing={5}
              align="flex-start"
              textAlign="left"
            >
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
                    Drohnenarbeit
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="700"
                    lineHeight="1.2"
                    color="whiteAlpha.800"
                    mt={2}
                  >
                    seit über 10 Jahren.                  </Text>
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
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <FiCheck size={14} />
                    EU-ZERTIFIZIERT A2
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
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <FiAward size={14} />
                    10+ JAHRE ERFAHRUNG
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
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <FiVideo size={14} />
                    4K/60FPS
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
                  <Link href="/kontakt"> 
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
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
               
                    _hover={{
                      bgGradient: "linear(to-r, cyan.300, cyan.500)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 32px rgba(0,198,255,0.4)"
                    }}
                    _active={{
                      transform: "translateY(0)"
                    }}
                  >
                    <FiPlay size={18} />
                    Projekt starten
                  </Button>
                  </Link>

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
                <HStack
                  spacing={{ base: 6, md: 8 }}
                  divider={
                    <Box
                      h="40px"
                      w="1px"
                      bg="rgba(255,255,255,0.1)"
                    />
                  }
                >
                  {[
                    { value: "500+", label: "Projekte", icon: FiVideo },
                    { value: "50+", label: "Kunden", icon: FiUsers },
                    { value: "98%", label: "Zufriedenheit", icon: FiTrendingUp }
                  ].map((stat, i) => (
                    <VStack key={i} spacing={1.5} align="flex-start">
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="800"
                        color="cyan.400"
                        lineHeight="1"
                      >
                        {stat.value}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="rgba(255,255,255,0.5)"
                        textTransform="uppercase"
                        letterSpacing="1.5px"
                        fontWeight="500"
                      >
                        {stat.label}
                      </Text>
                    </VStack>
                  ))}
                </HStack>
              </MotionBox>
            </VStack>

            {/* Right Column - YouTube Player */}
            {youtubeVideoId && (
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                w="100%"
                position="relative"
                zIndex={25}
              >
                <VStack spacing={3} align="flex-start" w="100%" position="relative" zIndex={25}>
                  {/* Überschrift über dem Player */}
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color="rgba(255,255,255,0.5)"
                    letterSpacing="0.5px"
                    textTransform="uppercase"
                    position="relative"
                    zIndex={25}
                  >
                    Unser neustes Projekt
                  </Text>

                  {/* YouTube Player */}
                  {youtubeVideoId && (
                    <Box w="100%" h="100%">
                      <CustomYouTubePlayer
                        videoId={youtubeVideoId}
                        autoplay={true}
                        muted={true}
                        showControls={true}
                        colorGlow="#00C6FF"
                      />
                    </Box>
                  )}
                </VStack>
              </MotionBox>
            )}
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