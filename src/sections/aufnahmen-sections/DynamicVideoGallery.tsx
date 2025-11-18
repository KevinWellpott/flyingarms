// sections/aufnahmen-sections/DynamicVideoGallery.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  HStack,
  Badge,
  AspectRatio,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Video Player direkt in der Datei
const CustomVideoPlayer: React.FC<{
  src: string;
  poster?: string;
  title?: string;
}> = ({ src, poster, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      setIsLoaded(true);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value / 100;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Box
      position="relative"
      w="100%"
      bg="rgba(0,0,0,0.9)"
      borderRadius="2xl"
      overflow="hidden"
      border="2px solid rgba(0,198,255,0.15)"
      backdropFilter="blur(20px)"
      boxShadow="0 20px 60px rgba(0,198,255,0.12)"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
      _hover={{
        borderColor: "rgba(0,198,255,0.3)",
        boxShadow: "0 25px 70px rgba(0,198,255,0.2)"
      }}
      transition="all 0.3s ease"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        onClick={togglePlay}
      />

      {/* Loading State */}
      {!isLoaded && (
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0,0,0,0.8)"
        >
          <VStack spacing={3}>
            <Box
              w="60px"
              h="60px"
              border="3px solid rgba(0,198,255,0.3)"
              borderTop="3px solid cyan.400"
              borderRadius="full"
              animation="spin 1s linear infinite"
            />
            <Text fontSize="sm" color="cyan.400" fontWeight="600">
              Video wird geladen...
            </Text>
          </VStack>
        </Box>
      )}

      {/* Custom Controls */}
      <MotionBox
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={4}
        bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showControls ? 1 : 0,
          y: showControls ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
      >
        <VStack spacing={3}>
          {/* Progress Bar */}
          <Box w="100%">
            <Slider
              value={progress}
              onChange={handleSeek}
              min={0}
              max={100}
              step={0.1}
              focusThumbOnChange={false}
            >
              <SliderTrack bg="rgba(255,255,255,0.2)" h="6px">
                <SliderFilledTrack bg="cyan.400" />
              </SliderTrack>
              <SliderThumb 
                bg="cyan.400" 
                border="2px solid white"
                _focus={{ boxShadow: "0 0 0 3px rgba(0,198,255,0.3)" }}
              />
            </Slider>
          </Box>

          {/* Controls Row */}
          <HStack w="100%" justify="space-between" align="center">
            {/* Left Controls */}
            <HStack spacing={3}>
              {/* Play/Pause */}
              <IconButton
                aria-label={isPlaying ? 'Pause' : 'Play'}
                icon={
                  <Box w="24px" h="24px">
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6,4H10V20H6V4M14,4H18V20H14V4Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                      </svg>
                    )}
                  </Box>
                }
                onClick={togglePlay}
                size="lg"
                bg="rgba(0,198,255,0.1)"
                color="cyan.400"
                border="1px solid rgba(0,198,255,0.3)"
                borderRadius="xl"
                _hover={{
                  bg: "rgba(0,198,255,0.2)",
                  transform: "scale(1.05)"
                }}
                _active={{ transform: "scale(0.95)" }}
              />

              {/* Time Display */}
              <Text 
                fontSize="sm" 
                color="white" 
                fontFamily="mono"
                fontWeight="600"
                minW="80px"
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </HStack>

            {/* Right Controls */}
            <HStack spacing={3}>
              {/* Volume Control */}
              <HStack spacing={2} minW="120px">
                <Box w="20px" h="20px" color="cyan.400">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18.01,19.86 21,16.28 21,12C21,7.72 18.01,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                  </svg>
                </Box>
                <Slider
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  min={0}
                  max={100}
                  w="80px"
                >
                  <SliderTrack bg="rgba(255,255,255,0.2)" h="4px">
                    <SliderFilledTrack bg="cyan.400" />
                  </SliderTrack>
                  <SliderThumb 
                    bg="cyan.400" 
                    w="12px" 
                    h="12px"
                    _focus={{ boxShadow: "0 0 0 3px rgba(0,198,255,0.3)" }}
                  />
                </Slider>
              </HStack>
            </HStack>
          </HStack>
        </VStack>
      </MotionBox>

      {/* Video Info Badge */}
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
        <Text fontSize="xs" color="cyan.400" fontWeight="bold">
          6K • 60FPS
        </Text>
      </Box>

      {/* Title Overlay */}
      {title && (
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
          maxW="200px"
        >
          <Text fontSize="xs" color="white" fontWeight="600" noOfLines={1}>
            {title}
          </Text>
        </Box>
      )}
    </Box>
  );
};

// Main Component
interface DynamicVideoGalleryProps {
  data?: any; // Temporarily any to avoid type issues
}

const DynamicVideoGallery: React.FC<DynamicVideoGalleryProps> = ({ data }) => {
  if (!data || !data.featured_video) return null;

  const {
    video_section_title = 'Video Showcase',
    video_section_subtitle = 'Erleben Sie unsere Arbeit',
    video_section_description = 'Hochauflösende Luftaufnahmen in Bewegung',
    featured_video
  } = data;

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
              {video_section_title}
            </Text>

            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={4}
            >
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                {video_section_subtitle}
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
              {video_section_description}
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
                ⏱️ {featured_video.duration || '02:34'}
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
              <CustomVideoPlayer
                src={featured_video.video_url}
                poster={featured_video.thumbnail_url}
                title={featured_video.title}
              />
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
                    {featured_video.title}
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="whiteAlpha.700"
                  >
                    {featured_video.description}
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