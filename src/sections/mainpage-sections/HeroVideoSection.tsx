'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CustomYouTubePlayer from '../../components/CustomYouTubePlayer';
import { getSiteSettings, extractYouTubeVideoId } from '@/lib/site-settings';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const HeroVideoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Load YouTube URL - Non-blocking, doesn't delay section rendering
  useEffect(() => {
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

    // Load after initial render to not block section
    const timer = setTimeout(() => {
      loadYouTubeUrl();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Only render on Mobile/Tablet (base and md breakpoints, hidden on lg and up)
  if (!youtubeVideoId) {
    return null;
  }

  return (
    <Box
      display={{ base: "block", lg: "none" }}
      position="relative"
      w="100%"
      bg="transparent"
      py={{ base: 8, md: 10 }}
    >
      <Container
        maxW="container.xl"
        px={{ base: 4, md: 8 }}
        position="relative"
      >
        <VStack spacing={4} align="center" w="100%">
          {/* Überschrift über dem Player */}
          <MotionText
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="500"
            color="rgba(255,255,255,0.6)"
            letterSpacing={{ base: "0.8px", md: "1px" }}
            textTransform="uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
            textAlign="center"
          >
            Unser neustes Projekt
          </MotionText>

          {/* YouTube Player */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            w="100%"
            maxW="100%"
          >
            <Box as="div" className="w-full">
              <CustomYouTubePlayer
                videoId={youtubeVideoId}
                autoplay={false}
                muted={false}
                showControls={true}
                colorGlow="#00C6FF"
              />
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default HeroVideoSection;

