// sections/aufnahmen-sections/DynamicHeroSection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Box, VStack, Container, HStack, Text, Button } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSection } from '../../types/hero';
import { getVideoEmbedUrl } from '../../lib/supabase';
import CustomYouTubePlayer from '@/components/CustomYouTubePlayer';
import { extractYouTubeId } from '@/lib/utils';

const MotionBox = motion(Box);

interface DynamicHeroSectionProps {
  data: HeroSection;
}

const DynamicHeroSection: React.FC<DynamicHeroSectionProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Video Rendering Logic
  const renderVideoContent = (instanceId?: string) => {
    // ✅ HIER WERDEN DIE VARIABLEN DEFINIERT!
    const videoUrl = data.hero_video_url;
    const videoType = data.hero_video_type || 'none';
    const videoPoster = data.hero_thumbnail;
    const title = data.title;

    // No video case
    if (!videoUrl || videoType === 'none') {
      return (
        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0,0,0,0.3)"
          position="relative"
          overflow="hidden"
        >
          {/* Animated Background Pattern */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.1}
            backgroundImage="radial-gradient(circle at 2px 2px, rgba(0,198,255,0.3) 1px, transparent 0)"
            backgroundSize="40px 40px"
          />
          
          <VStack spacing={3} color="whiteAlpha.600" position="relative" zIndex={2}>
            <MotionBox
              w="80px"
              h="80px"
              bg="rgba(0,198,255,0.1)"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px solid rgba(0,198,255,0.3)"
              boxShadow="0 0 30px rgba(0,198,255,0.2)"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 30px rgba(0,198,255,0.2)",
                  "0 0 50px rgba(0,198,255,0.4)",
                  "0 0 30px rgba(0,198,255,0.2)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Box w="35px" h="35px">
                <svg viewBox="0 0 24 24" width="100%" height="100%">
                  <path
                    fill="rgba(0,198,255,0.8)"
                    d="M5,3V4H3V5H5.5L7,6.5V9H8.5L12,12.5L15.5,9H17V6.5L18.5,5H21V4H19V3H17.5L15.5,5H8.5L6.5,3H5M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M7,17A2,2 0 0,1 9,19A2,2 0 0,1 7,21A2,2 0 0,1 5,19A2,2 0 0,1 7,17M17,17A2,2 0 0,1 19,19A2,2 0 0,1 17,21A2,2 0 0,1 15,19A2,2 0 0,1 17,17Z"
                  />
                </svg>
              </Box>
            </MotionBox>
            <VStack spacing={2}>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="600" 
                color="cyan.400"
                textAlign="center"
                fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
              >
                {title}
              </Text>
              <Text 
                fontSize="xs" 
                color="whiteAlpha.500" 
                textAlign="center"
                fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
              >
                6K Ultra-HD • 360° Panoramen
              </Text>
            </VStack>
          </VStack>
        </Box>
      );
    }

    // Verwende Custom YouTube Player für YouTube Videos
    if (videoType === 'youtube' || (!videoType && videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')))) {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        return (
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <CustomYouTubePlayer
              videoId={videoId}
              autoplay={true}
              muted={true}
              showControls={false}
              colorGlow="#00C6FF"
              className="w-full h-full"
              instanceId={instanceId}
            />
          </div>
        );
      }
    }

    const embedUrl = getVideoEmbedUrl(videoUrl, videoType);
    
    if (videoType === 'direct') {
      return (
        <video
          src={videoUrl}
          poster={videoPoster}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          Dein Browser unterstützt das Video-Tag nicht.
        </video>
      );
    }

    // Embedded video (Vimeo/andere)
    return (
      <iframe
        src={embedUrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      />
    );
  };

  return (
    <Box
      position="relative"
      pt={{ base: 16, md: 12, lg: 16 }}
      pb={{ base: 8, md: 12, lg: 16 }}
      overflow="hidden"
    >
      {/* Animated Background with Parallax */}
      <MotionBox
        position="absolute"
        top={-100}
        left={-100}
        right={-100}
        bottom={-100}
        style={{ y: backgroundY }}
      >
        <Box 
          w="100%"
          h="100%"
          bg="radial-gradient(circle at 50% 30%, rgba(0,198,255,0.08) 0%, transparent 60%)"
        />
        
        {/* Floating Glow Orbs */}
        <MotionBox
          position="absolute"
          top="20%"
          left="10%"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(0,198,255,0.15) 0%, transparent 70%)"
          filter="blur(60px)"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <MotionBox
          position="absolute"
          top="60%"
          right="10%"
          w="250px"
          h="250px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(0,255,198,0.1) 0%, transparent 70%)"
          filter="blur(50px)"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </MotionBox>

      <Container 
        maxW="container.lg"
        py={{ base: 10, md: 16 }}
        px={{ base: 4, md: 6 }}
        position="relative"
        zIndex={10}
      >
        {/* Mobile - Stack */}
        <VStack 
          spacing={{ base: 6, md: 8 }}
          display={{ base: "flex", lg: "none" }}
          w="100%"
        >
          {/* Hero Content - Mobile */}
          <VStack
            spacing={5}
            align="center"
            textAlign="center"
            w="100%"
          >
            {/* Badge */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HStack
                spacing={2}
                px={4}
                py={2}
                bg="rgba(0,198,255,0.1)"
                borderRadius="full"
                border="1px solid rgba(0,198,255,0.3)"
                backdropFilter="blur(10px)"
                boxShadow="0 4px 15px rgba(0,198,255,0.2)"
              >
                <Box 
                  w="8px" 
                  h="8px" 
                  bg="cyan.400" 
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(0,198,255,0.8)"
                />
                <Text 
                  fontSize="xs" 
                  fontWeight="600" 
                  color="cyan.400" 
                  letterSpacing="wide"
                  fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
                >
                  Flying Arms • {data.slug || 'aufnahmen'}
                </Text>
                <Box 
                  w="8px" 
                  h="8px" 
                  bg="green.400" 
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(0,255,100,0.8)"
                />
              </HStack>
            </MotionBox>

            {/* H1 Titel with Gradient */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Text
                as="h1"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="700"
                bgGradient="linear(to-r, white, cyan.100)"
                bgClip="text"
                lineHeight="1.1"
                letterSpacing="tight"
                textShadow="0 0 30px rgba(0,198,255,0.3)"
              >
                {data.title || 'Luftaufnahmen und Luftvideo'}
              </Text>
            </MotionBox>

            {/* Subtitle */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="whiteAlpha.800"
                lineHeight="1.6"
                fontWeight="500"
              >
                {data.subtitle || 'Professionelle Drohnenservices für beeindruckende Perspektiven'}
              </Text>
            </MotionBox>

            {/* Description */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="whiteAlpha.700"
                lineHeight="1.7"
              >
                {data.description || 'Die schärfste Sicht von oben für Ihre Projekte'}
              </Text>
            </MotionBox>

            {/* CTA Button */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              w="100%"
            >
              <VStack spacing={3} align="center">
                <Button
                  size="lg"
                  bg="linear-gradient(135deg, #0B99FF 0%, #00C6FF 100%)"
                  color="white"
                  px={8}
                  py={6}
                  borderRadius="xl"
                  fontWeight="600"
                  fontSize="sm"
                  boxShadow="0 10px 30px rgba(0,198,255,0.3)"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 40px rgba(0,198,255,0.5)"
                  }}
                  _active={{
                    transform: "translateY(0px)",
                    boxShadow: "0 5px 20px rgba(0,198,255,0.4)"
                  }}
                  transition="all 0.3s ease"
                >
                  Jetzt Termin buchen
                </Button>

                <Text
                  fontSize="xs"
                  color="whiteAlpha.600"
                  fontWeight="500"
                  letterSpacing="wide"
                  fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
                >
                  DIE SCHÄRFSTE SICHT VON OBEN
                </Text>
              </VStack>
            </MotionBox>
          </VStack>

          {/* Media Showcase - Mobile */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            w="100%"
            h={{ base: '250px', sm: '350px', md: '400px' }}
          >
            <Box
              bg="rgba(0,0,0,0.5)"
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              border="1px solid rgba(0,198,255,0.2)"
              overflow="hidden"
              boxShadow="0 20px 60px rgba(0,198,255,0.15), 0 0 100px rgba(0,198,255,0.1) inset"
              position="relative"
              w="100%"
              h="100%"
              _hover={{
                borderColor: "rgba(0,198,255,0.4)",
                boxShadow: "0 25px 70px rgba(0,198,255,0.25), 0 0 100px rgba(0,198,255,0.15) inset"
              }}
              transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            >
              {/* Video Content */}
              {renderVideoContent('mobile')}

              {/* Overlay Badges */}
              {data.hero_video_url && data.hero_video_type !== 'none' && (
                <>
                  <Box
                    position="absolute"
                    top={3}
                    left={3}
                    px={3}
                    py={1.5}
                    bg="rgba(0,0,0,0.8)"
                    backdropFilter="blur(10px)"
                    borderRadius="md"
                    border="1px solid rgba(0,198,255,0.3)"
                    boxShadow="0 4px 10px rgba(0,0,0,0.3)"
                  >
                    <HStack spacing={2}>
                      <Box 
                        w="6px" 
                        h="6px" 
                        bg="red.500" 
                        borderRadius="full"
                        boxShadow="0 0 10px rgba(255,0,0,0.8)"
                      />
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
                    top={3}
                    right={3}
                    px={3}
                    py={1.5}
                    bg="rgba(0,0,0,0.8)"
                    backdropFilter="blur(10px)"
                    borderRadius="md"
                    border="1px solid rgba(0,198,255,0.3)"
                    boxShadow="0 4px 10px rgba(0,0,0,0.3)"
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

                  <Box
                    position="absolute"
                    bottom={3}
                    left={3}
                    px={3}
                    py={1.5}
                    bg="rgba(0,0,0,0.8)"
                    backdropFilter="blur(10px)"
                    borderRadius="md"
                    border="1px solid rgba(0,198,255,0.3)"
                    boxShadow="0 4px 10px rgba(0,0,0,0.3)"
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
                </>
              )}

              {/* Enhanced Gradient overlay */}
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-br, rgba(0,198,255,0.08), transparent, rgba(0,255,198,0.05))"
                pointerEvents="none"
              />
            </Box>
          </MotionBox>
        </VStack>

        {/* Desktop - Side by Side */}
        <HStack 
          spacing={8}
          align="center"
          display={{ base: "none", lg: "flex" }}
          w="100%"
        >
          {/* Hero Content - Desktop */}
          <Box flex="1.2">
            <VStack
              spacing={5}
              align="flex-start"
              textAlign="left"
              w="100%"
            >
              {/* Badge */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  x: mousePosition.x * 0.5,
                  y: mousePosition.y * 0.5
                }}
              >
                <HStack
                  spacing={2}
                  px={4}
                  py={2}
                  bg="rgba(0,198,255,0.1)"
                  borderRadius="full"
                  border="1px solid rgba(0,198,255,0.3)"
                  backdropFilter="blur(10px)"
                  boxShadow="0 4px 15px rgba(0,198,255,0.2)"
                  _hover={{
                    borderColor: "rgba(0,198,255,0.5)",
                    boxShadow: "0 6px 20px rgba(0,198,255,0.3)"
                  }}
                  transition="all 0.3s ease"
                >
                  <Box 
                    w="8px" 
                    h="8px" 
                    bg="cyan.400" 
                    borderRadius="full"
                    boxShadow="0 0 10px rgba(0,198,255,0.8)"
                  />
                  <Text 
                    fontSize="xs" 
                    fontWeight="600" 
                    color="cyan.400" 
                    letterSpacing="wide"
                    fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
                  >
                    Flying Arms • {data.slug || 'aufnahmen'}
                  </Text>
                  <Box 
                    w="8px" 
                    h="8px" 
                    bg="green.400" 
                    borderRadius="full"
                    boxShadow="0 0 10px rgba(0,255,100,0.8)"
                  />
                </HStack>
              </MotionBox>

              {/* H1 Titel with Gradient */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Text
                  as="h1"
                  fontSize={{ base: "4xl", lg: "5xl" }}
                  fontWeight="700"
                  bgGradient="linear(to-r, white, cyan.100)"
                  bgClip="text"
                  lineHeight="1.1"
                  letterSpacing="tight"
                  maxW="90%"
                  textShadow="0 0 30px rgba(0,198,255,0.3)"
                >
                  {data.title || 'Luftaufnahmen und Luftvideo'}
                </Text>
              </MotionBox>

              {/* Subtitle */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="whiteAlpha.800"
                  lineHeight="1.6"
                  maxW="85%"
                  fontWeight="500"
                >
                  {data.subtitle || 'Professionelle Drohnenservices für beeindruckende Perspektiven'}
                </Text>
              </MotionBox>

              {/* Description */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="whiteAlpha.700"
                  lineHeight="1.7"
                  maxW="90%"
                >
                  {data.description || 'Die schärfste Sicht von oben für Ihre Projekte'}
                </Text>
              </MotionBox>

              {/* CTA Button */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <VStack spacing={3} align="flex-start">
                  <Button
                    size="lg"
                    bg="linear-gradient(135deg, #0B99FF 0%, #00C6FF 100%)"
                    color="white"
                    px={8}
                    py={6}
                    borderRadius="xl"
                    fontWeight="600"
                    fontSize="sm"
                    boxShadow="0 10px 30px rgba(0,198,255,0.3)"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 40px rgba(0,198,255,0.5)"
                    }}
                    _active={{
                      transform: "translateY(0px)",
                      boxShadow: "0 5px 20px rgba(0,198,255,0.4)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Jetzt Termin buchen
                  </Button>

                  <Text
                    fontSize="xs"
                    color="whiteAlpha.600"
                    fontWeight="500"
                    letterSpacing="wide"
                    fontFamily="SF Mono, Monaco, Cascadia Code, monospace"
                  >
                    DIE SCHÄRFSTE SICHT VON OBEN
                  </Text>
                </VStack>
              </MotionBox>
            </VStack>
          </Box>

          {/* Media Showcase - Desktop */}
          <Box flex="1">
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                x: mousePosition.x * -0.3,
                y: mousePosition.y * -0.3
              }}
              w="100%"
              h={{ base: '250px', sm: '350px', md: '500px' }}
            >
              <Box
                bg="rgba(0,0,0,0.5)"
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="1px solid rgba(0,198,255,0.2)"
                overflow="hidden"
                boxShadow="0 20px 60px rgba(0,198,255,0.15), 0 0 100px rgba(0,198,255,0.1) inset"
                position="relative"
                w="100%"
                h="100%"
                _hover={{
                  borderColor: "rgba(0,198,255,0.4)",
                  boxShadow: "0 25px 70px rgba(0,198,255,0.25), 0 0 100px rgba(0,198,255,0.15) inset"
                }}
                transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              >
                {/* Video Content */}
                {renderVideoContent('desktop')}

                {/* Overlay Badges */}
                {data.hero_video_url && data.hero_video_type !== 'none' && (
                  <>
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
                      boxShadow="0 4px 10px rgba(0,0,0,0.3)"
                    >
                      <HStack spacing={2}>
                        <Box 
                          w="6px" 
                          h="6px" 
                          bg="red.500" 
                          borderRadius="full"
                          boxShadow="0 0 10px rgba(255,0,0,0.8)"
                        />
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
                      boxShadow="0 4px 10px rgba(0,0,0,0.3)"
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
                      boxShadow="0 4px 10px rgba(0,0,0,0.3)"
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
                  </>
                )}

                {/* Enhanced Gradient overlay */}
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-br, rgba(0,198,255,0.08), transparent, rgba(0,255,198,0.05))"
                  pointerEvents="none"
                />
              </Box>
            </MotionBox>
          </Box>
        </HStack>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </Box>
  );
};

export default DynamicHeroSection;