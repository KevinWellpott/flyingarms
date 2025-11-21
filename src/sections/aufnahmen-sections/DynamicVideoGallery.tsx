// sections/aufnahmen-sections/DynamicVideoGallery.tsx
'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  HStack,
  Badge,
  AspectRatio,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CustomYouTubePlayer from '@/components/CustomYouTubePlayer';
import { extractYouTubeId } from '@/lib/utils';
import { PageSection } from '../../types/page-section';

const MotionBox = motion(Box);

// Main Component
interface DynamicVideoGalleryProps {
  data?: PageSection;
}

const DynamicVideoGallery: React.FC<DynamicVideoGalleryProps> = ({ data }) => {
  if (!data || !data.featured_video) return null;

  // Parse featured_video if it's a string
  const featuredVideo = typeof data.featured_video === 'string' 
    ? JSON.parse(data.featured_video) 
    : data.featured_video;

  // Use gallery section fields or fallback to defaults
  const sectionTitle = data.gallery_section_title || 'Video Showcase';
  const sectionSubtitle = data.gallery_section_subtitle || 'Erleben Sie unsere Arbeit';
  const sectionDescription = data.gallery_section_description || 'Hochauflösende Luftaufnahmen in Bewegung';

  return (
    <Box
      width="100%"
      py={{ base: 12, md: 16, lg: 20 }}
      position="relative"
      bg="transparent"
    >
      {/* Background Effect */}
      <Box 
        position="absolute" 
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="radial-gradient(circle at 70% 30%, rgba(0,198,255,0.03) 0%, transparent 60%)"
        pointerEvents="none"
      />

      <Container 
        maxW="1100px"
        px={{ base: 4, md: 6 }}
        position="relative" 
        zIndex={2}
      >
        <VStack spacing={{ base: 8, md: 12 }}>
          
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            w="100%"
          >
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="4px"
              textTransform="uppercase"
              bgGradient="linear(to-r, cyan.300, cyan.500)"
              bgClip="text"
              mb={4}
            >
              {sectionTitle}
            </Text>

            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={4}
            >
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                {sectionSubtitle}
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="600px"
              mx="auto"
              lineHeight="1.7"
              mb={6}
            >
              {sectionDescription}
            </Text>

            {/* Video Specs */}
            <HStack spacing={3} justify="center" flexWrap="wrap">
              <Badge
                bg="rgba(0,198,255,0.08)"
                color="cyan.300"
                border="1px solid rgba(0,198,255,0.2)"
                borderRadius="md"
                px={3}
                py={1.5}
                fontSize="xs"
                fontWeight="700"
              >
                📹 6K Ultra-HD
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
              >
                ⚡ 60FPS
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
              >
                ⏱️ {featuredVideo.duration || '02:34'}
              </Badge>
            </HStack>
          </MotionBox>

          {/* Video Player - 16:9 Aspect Ratio */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            w="100%"
            maxW="1100px"
          >
            <AspectRatio ratio={16 / 9} w="100%">
              {(() => {
                const videoId = extractYouTubeId(featuredVideo.video_url);
                if (videoId) {
                  return (
                    <CustomYouTubePlayer
                      videoId={videoId}
                      autoplay={false}
                      muted={false}
                      showControls={true}
                      colorGlow="#00C6FF"
                      className="w-full h-full"
                    />
                  );
                }
                return (
                  <Box
                    w="100%"
                    h="100%"
                    bg="rgba(0,0,0,0.5)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="whiteAlpha.600"
                  >
                    Ungültige Video-URL
                  </Box>
                );
              })()}
            </AspectRatio>

            {/* Video Info */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              mt={6}
              p={6}
              bg="rgba(0,0,0,0.3)"
              backdropFilter="blur(20px)"
              borderRadius="xl"
              border="1px solid rgba(0,198,255,0.15)"
            >
              <VStack spacing={3} align="flex-start">
                <VStack spacing={1} align="flex-start" w="100%">
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="700"
                    color="white"
                  >
                    {featuredVideo.title}
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="whiteAlpha.700"
                  >
                    {featuredVideo.description}
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default DynamicVideoGallery;